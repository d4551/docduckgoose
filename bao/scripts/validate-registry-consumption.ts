import { runRegistryConsumptionGate } from "../src/gates/registry-consumption.ts";

process.exitCode = await runRegistryConsumptionGate();
