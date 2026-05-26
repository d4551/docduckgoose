import { runRuntimeConsumptionGate } from "../src/gates/runtime-consumption.ts";

process.exitCode = await runRuntimeConsumptionGate();
