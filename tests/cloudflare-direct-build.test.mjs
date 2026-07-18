import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import {
  access,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);
const root = new URL("../", import.meta.url);

async function exists(path) {
  try {
    await access(new URL(path, root));
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

test("uses npm as the only package manager", async () => {
  assert.equal(await exists("package-lock.json"), true);
  assert.equal(await exists("bun.lock"), false);
});

test("does not deploy Cloudflare from GitHub Actions", async () => {
  assert.equal(await exists(".github/workflows/preview.yml"), false);
});

test("normalizes generated Wrangler config before validation", async () => {
  const script = await readFile(
    new URL("scripts/build-verified.sh", root),
    "utf8",
  );
  const normalize = script.indexOf("normalize-wrangler-config.mjs");
  const validate = script.indexOf("validate-artifact.sh");

  assert.ok(normalize >= 0, "build must invoke the Wrangler config normalizer");
  assert.ok(validate > normalize, "normalization must happen before validation");
});

test("removes only legacy_env from generated Wrangler config", async () => {
  const directory = await mkdtemp(join(tmpdir(), "ktv-wrangler-config-"));
  const configPath = join(directory, "wrangler.json");
  const fixture = {
    name: "kedah-digital",
    main: "index.js",
    legacy_env: false,
    assets: {
      directory: "../client",
      legacy_env: "nested-value-must-remain",
    },
  };

  try {
    await writeFile(configPath, `${JSON.stringify(fixture, null, 2)}\n`);
    await execFileAsync(process.execPath, [
      new URL("../scripts/normalize-wrangler-config.mjs", import.meta.url)
        .pathname,
      configPath,
    ]);

    const normalized = JSON.parse(await readFile(configPath, "utf8"));
    assert.deepEqual(normalized, {
      name: "kedah-digital",
      main: "index.js",
      assets: {
        directory: "../client",
        legacy_env: "nested-value-must-remain",
      },
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
