#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const configPath = process.argv[2];
if (!configPath) {
  throw new Error("usage: normalize-wrangler-config.mjs <wrangler-json-path>");
}

const config = JSON.parse(await readFile(configPath, "utf8"));
delete config.legacy_env;
await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
