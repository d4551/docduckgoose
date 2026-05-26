export const rootDir = Bun.fileURLToPath(new URL("../", import.meta.url));

export function rootPath(relativePath: string): string {
  return `${rootDir}/${relativePath}`;
}

export function writeStdout(message: string): void {
  process.stdout.write(`${message}\n`);
}

export function writeStderr(message: string): void {
  process.stderr.write(`${message}\n`);
}

export function fail(message: string): never {
  writeStderr(message);
  process.exit(1);
}

export async function runCommand(
  command: readonly string[],
  cwd = rootDir,
): Promise<{ exitCode: number; stdoutText: string; stderrText: string }> {
  const subprocess = Bun.spawn({
    cmd: [...command],
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });

  const [stdoutText, stderrText, exitCode] = await Promise.all([
    subprocess.stdout ? new Response(subprocess.stdout).text() : Promise.resolve(""),
    subprocess.stderr ? new Response(subprocess.stderr).text() : Promise.resolve(""),
    subprocess.exited,
  ]);

  return { exitCode, stdoutText, stderrText };
}
