#!/usr/bin/env bun

import { buildBaoArchive } from "./lib/build-bao-archive.ts";

const result = await buildBaoArchive({ includeSourceTree: true });
Bun.stdout.write(`${result.archive}\n`);
