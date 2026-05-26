#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import {
  createAndroidGradleJvmEnvironment,
  createAndroidSdkEnvironment,
  ensureAndroidGradleJvmAvailable,
  ensureAndroidLocalProperties,
  formatProvisioningDiagnostics,
  type HostToolingEnvironment,
  resolveAndroidSdkRoot,
} from "../shared/host-tooling";

const REPO_ROOT = resolve(import.meta.dir, "..");
const ANDROID_PROJECT_DIRECTORY = resolve(REPO_ROOT, "Android", "src");
const GRADLE_WRAPPER_JAR_PATH = resolve(
  ANDROID_PROJECT_DIRECTORY,
  "gradle",
  "wrapper",
  "gradle-wrapper.jar",
);
const BAO_EDGE_LOCAL_PROPERTIES_PATH = resolve(
  ANDROID_PROJECT_DIRECTORY,
  "bao-edge.local.properties",
);
const ANDROID_LOCAL_PROPERTIES_PATH = resolve(ANDROID_PROJECT_DIRECTORY, "local.properties");
const GRADLE_WRAPPER_MAIN_CLASS = "org.gradle.wrapper.GradleWrapperMain" as const;
const GRADLE_DEFAULT_JVM_OPTIONS = ["-Xmx64m", "-Xms64m"] as const;

const writeLine = (message = ""): Promise<number> => Bun.write(Bun.stdout, `${message}\n`);

const usage = (): Promise<number> =>
  writeLine(
    [
      "Usage: bun run android:gradle -- [gradle arguments]",
      "",
      "Runs the Android Gradle wrapper through Bun + TypeScript using the checked-in wrapper jar.",
      "Examples:",
      "  bun run android:gradle -- :app:assembleDebug",
      "  bun run android:gradle -- :app:testDebugUnitTest",
      "  bun run android:gradle -- --version",
    ].join("\n"),
  );

const isExecutableFile = (path: string): boolean =>
  existsSync(path) && statSync(path).isFile() && (statSync(path).mode & 0o111) !== 0;

const resolveJavaExecutableFromHome = (javaHome: string): string | null => {
  const candidates =
    process.platform === "win32"
      ? [resolve(javaHome, "bin", "java.exe")]
      : [resolve(javaHome, "bin", "java"), resolve(javaHome, "jre", "sh", "java")];

  for (const candidate of candidates) {
    if (isExecutableFile(candidate)) {
      return candidate;
    }
  }

  return null;
};

const readPropertyValue = (filePath: string, propertyName: string): string | null => {
  if (!existsSync(filePath)) {
    return null;
  }

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/u);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex < 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    if (key !== propertyName) {
      continue;
    }

    return trimmed.slice(separatorIndex + 1).trim();
  }

  return null;
};

const resolveGradleJdkCandidates = (): readonly string[] => {
  const gradleJdksDirectory = resolve(homedir(), ".gradle", "jdks");
  if (!existsSync(gradleJdksDirectory)) {
    return [];
  }

  const candidates: string[] = [];
  for (const entry of readdirSync(gradleJdksDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const basePath = resolve(gradleJdksDirectory, entry.name);
    candidates.push(basePath);
    candidates.push(resolve(basePath, "Contents", "Home"));
  }

  return candidates;
};

const resolveConfiguredGradleJavaHome = (): string | null => {
  const configuredCandidates = [
    Bun.env.BAO_EDGE_GRADLE_JAVA_HOME,
    readPropertyValue(BAO_EDGE_LOCAL_PROPERTIES_PATH, "BAO_EDGE_GRADLE_JAVA_HOME"),
    readPropertyValue(ANDROID_LOCAL_PROPERTIES_PATH, "bao-edge.gradle.java.home"),
    ...resolveGradleJdkCandidates(),
    ...(process.platform === "darwin"
      ? [
          "/Applications/Android Studio.app/Contents/jbr/Contents/Home",
          "/Applications/Android Studio.app/Contents/jre/Contents/Home",
          "/Applications/IntelliJ IDEA.app/Contents/jbr/Contents/Home",
        ]
      : []),
    ...(process.platform === "win32" && Bun.env.ProgramFiles
      ? [
          join(Bun.env.ProgramFiles, "Android", "Android Studio", "jbr"),
          join(Bun.env.ProgramFiles, "JetBrains", "IntelliJ IDEA", "jbr"),
        ]
      : []),
  ];

  for (const candidate of configuredCandidates) {
    if (typeof candidate !== "string" || candidate.trim().length === 0) {
      continue;
    }

    const normalizedCandidate = candidate.trim();
    if (resolveJavaExecutableFromHome(normalizedCandidate) !== null) {
      return normalizedCandidate;
    }
  }

  return null;
};

const buildMergedEnv = (env: HostToolingEnvironment): Record<string, string> => {
  const merged: Record<string, string> = {};

  for (const [key, value] of Object.entries(Bun.env)) {
    if (typeof value === "string") {
      merged[key] = value;
    }
  }

  for (const [key, value] of Object.entries(env)) {
    if (typeof value === "string") {
      merged[key] = value;
    }
  }

  return merged;
};

const resolveAndroidGradleEnvironment = async (): Promise<HostToolingEnvironment> => {
  const configuredJavaHome = resolveConfiguredGradleJavaHome();
  const baseEnvironment =
    configuredJavaHome === null
      ? Bun.env
      : createAndroidGradleJvmEnvironment(Bun.env, configuredJavaHome);

  const gradleJvmAvailability =
    configuredJavaHome === null
      ? await ensureAndroidGradleJvmAvailable(baseEnvironment)
      : {
          ok: true as const,
          data: {
            javaHome: configuredJavaHome,
            source: "env" as const,
            major: 17 as const,
          },
        };

  if (!gradleJvmAvailability.ok) {
    throw new Error(
      [
        gradleJvmAvailability.message,
        formatProvisioningDiagnostics(gradleJvmAvailability.stdout, gradleJvmAvailability.stderr),
      ]
        .filter((segment) => segment.length > 0)
        .join("\n"),
    );
  }

  const javaEnvironment = createAndroidGradleJvmEnvironment(
    baseEnvironment,
    gradleJvmAvailability.data.javaHome,
  );
  const resolvedAndroidSdkRoot = resolveAndroidSdkRoot(javaEnvironment);
  if (resolvedAndroidSdkRoot !== null) {
    ensureAndroidLocalProperties(REPO_ROOT, resolvedAndroidSdkRoot.sdkRoot);
    return createAndroidSdkEnvironment(javaEnvironment, resolvedAndroidSdkRoot.sdkRoot);
  }

  return javaEnvironment;
};

const resolveJavaExecutable = (env: HostToolingEnvironment): string => {
  const javaHomeCandidate = env.JAVA_HOME?.trim();
  if (javaHomeCandidate && javaHomeCandidate.length > 0) {
    const executable = resolveJavaExecutableFromHome(javaHomeCandidate);
    if (executable !== null) {
      return executable;
    }
  }

  const fallback = Bun.which("java");
  if (fallback !== null) {
    return fallback;
  }

  throw new Error("Unable to resolve a Java executable for the Android Gradle wrapper.");
};

const parseGradleArgs = (argv: readonly string[]): readonly string[] =>
  argv.filter((argument) => argument !== "--");

const main = async (): Promise<void> => {
  const gradleArgs = parseGradleArgs(Bun.argv.slice(2));

  if (gradleArgs.length === 1 && (gradleArgs[0] === "--help" || gradleArgs[0] === "-h")) {
    await usage();
    return;
  }

  if (!existsSync(GRADLE_WRAPPER_JAR_PATH)) {
    throw new Error(`Gradle wrapper jar not found: ${GRADLE_WRAPPER_JAR_PATH}`);
  }

  const gradleEnvironment = await resolveAndroidGradleEnvironment();
  const javaExecutable = resolveJavaExecutable(gradleEnvironment);
  const command = [
    javaExecutable,
    ...GRADLE_DEFAULT_JVM_OPTIONS,
    "-Dorg.gradle.appname=gradlew",
    "-classpath",
    GRADLE_WRAPPER_JAR_PATH,
    GRADLE_WRAPPER_MAIN_CLASS,
    ...gradleArgs,
  ];

  const processHandle = Bun.spawn(command, {
    cwd: ANDROID_PROJECT_DIRECTORY,
    env: buildMergedEnv(gradleEnvironment),
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });

  process.exit(await processHandle.exited);
};

await main();
