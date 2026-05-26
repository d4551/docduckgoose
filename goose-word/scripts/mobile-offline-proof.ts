import { parseJsonObjectFromText, readStringField } from "@baohaus/bao-json-safe";
import { GOOSE_WORD_PROOF_BASE } from "../src/config/paths.ts";
import { cliLog } from "./cli-log.ts";

export const runMobileOfflineProof = async (base: string): Promise<string> => {
  const healthUrl = `${base}/api/health`;
  const health = await fetch(healthUrl, { method: "GET" });
  if (health.status !== 200) {
    throw new Error(`health failed: ${health.status}`);
  }

  const create = await fetch(`${base}/api/docs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title: "Offline proof", body: "created without network" }),
  });
  if (create.status !== 200) {
    throw new Error(`create failed: ${create.status}`);
  }
  const parsed = await parseJsonObjectFromText(await create.text());
  if (parsed === undefined) {
    throw new Error("create response not json object");
  }
  const id = readStringField(parsed, "id");
  if (id === undefined || id.length === 0) {
    throw new Error("create response missing id");
  }
  return id;
};

const id = await runMobileOfflineProof(GOOSE_WORD_PROOF_BASE);
cliLog(`mobile-offline-proof ok id=${id} base=${GOOSE_WORD_PROOF_BASE}`);
