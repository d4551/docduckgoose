import { runManifestParityGate } from "../src/gates/manifest-parity.ts";

const packageId = Bun.argv.at(2);
const exitCode = await runManifestParityGate(packageId);
process.exit(exitCode);
