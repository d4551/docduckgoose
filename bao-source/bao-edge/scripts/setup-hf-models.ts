import { fail, writeStdout } from "./runtime";

const clientId = Bun.env.BAO_EDGE_HF_CLIENT_ID ?? "";
const redirectUri = Bun.env.BAO_EDGE_HF_REDIRECT_URI ?? "";

if (!clientId) {
  fail("BAO_EDGE_HF_CLIENT_ID is not set");
}

if (!redirectUri) {
  fail("BAO_EDGE_HF_REDIRECT_URI is not set");
}

writeStdout("Hugging Face OAuth environment looks configured for Bao Edge");
writeStdout(`BAO_EDGE_HF_CLIENT_ID=${clientId}`);
writeStdout(`BAO_EDGE_HF_REDIRECT_URI=${redirectUri}`);
