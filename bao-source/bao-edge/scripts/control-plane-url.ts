import { resolveControlPlanePort } from "../command-bao/src/config";
import { writeStdout } from "./runtime";

const port = Bun.env.CONTROL_PLANE_PORT ? Number.parseInt(Bun.env.CONTROL_PLANE_PORT, 10) : null;
const resolvedPort = Number.isInteger(port) ? port : resolveControlPlanePort();

writeStdout(`http://localhost:${resolvedPort}`);
