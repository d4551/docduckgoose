import { runPackageReposParityGate } from "../src/gates/package-repos-parity.ts";

process.exitCode = await runPackageReposParityGate();
