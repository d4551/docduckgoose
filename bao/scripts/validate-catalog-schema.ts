import { runCatalogSchemaGate } from "../src/gates/catalog-schema.ts";

process.exitCode = await runCatalogSchemaGate();
