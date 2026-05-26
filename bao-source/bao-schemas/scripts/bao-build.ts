#!/usr/bin/env bun

import { buildBaoArchive } from "../../../bao/scripts/lib/build-bao-archive.ts";

const result = await buildBaoArchive();
Bun.stdout.write(`${result.archive}\n`);
