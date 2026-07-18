# Cloudflare Direct Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Cloudflare Workers Builds the sole remote build/deploy system, with npm as the only package manager and repository-owned normalization of Vinext's generated Wrangler configuration.

**Architecture:** GitHub stores the approved branch source, then Cloudflare's native Git integration installs from `package-lock.json`, runs `npm test`, and invokes Wrangler for either a branch version or production deployment. A repository test enforces the single-lockfile and no-GitHub-deployment contract, while a small Node script removes only the obsolete `legacy_env` property from Vinext's generated config before artifact validation.

**Tech Stack:** Node.js 22.13+, npm/package-lock v3, Node test runner, Bash, Vinext, Wrangler 4, Cloudflare Workers Builds.

## Global Constraints

- Use npm as the only package manager; keep `package-lock.json` and remove `bun.lock`.
- Cloudflare Workers Builds is the only remote build and deployment system.
- Production build command is `npm test`; production deploy command is `npx wrangler deploy`.
- Preview build command is `npm test`; preview deploy command is `npx wrangler versions upload`.
- Do not push, merge, or deploy `main` during this migration.
- Verify the migration on `codex/ui-audit-fixes` before considering GitHub secrets for deletion.

---

## File Structure

- Create `tests/cloudflare-direct-build.test.mjs`: repository policy tests and generated Wrangler normalization behavior.
- Create `scripts/normalize-wrangler-config.mjs`: narrowly removes the top-level `legacy_env` property from a specified JSON file.
- Modify `scripts/build-verified.sh`: normalize the generated config after Vinext build and before artifact validation.
- Modify `package.json`: execute all Node test files after the verified build.
- Delete `bun.lock`: remove conflicting Bun package-manager selection.
- Delete `.github/workflows/preview.yml`: remove redundant remote build/deploy pipeline.
- Modify `README.md`: document Cloudflare native Git builds and branch previews.
- Modify `docs/ui-audit-report.md`: record the deployment architecture and verification result.

### Task 1: Enforce the Cloudflare-only repository contract

**Files:**
- Create: `tests/cloudflare-direct-build.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: repository root located by `new URL("..", import.meta.url)`.
- Produces: Node tests that require exactly `package-lock.json`, forbid `bun.lock`, forbid `.github/workflows/preview.yml`, and require the build helper to invoke the normalizer before artifact validation.

- [ ] **Step 1: Write the failing repository policy tests**

```js
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

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
  const script = await readFile(new URL("scripts/build-verified.sh", root), "utf8");
  const normalize = script.indexOf('normalize-wrangler-config.mjs');
  const validate = script.indexOf('validate-artifact.sh');
  assert.ok(normalize >= 0, "build must invoke the Wrangler config normalizer");
  assert.ok(validate > normalize, "normalization must happen before validation");
});
```

- [ ] **Step 2: Run the policy test and verify RED**

Run: `node --test tests/cloudflare-direct-build.test.mjs`

Expected: FAIL because `bun.lock` and `.github/workflows/preview.yml` exist and the normalizer is not called.

- [ ] **Step 3: Make the test discoverable by the main test command**

Change `package.json` test script to:

```json
"test": "npm run build && node --test tests/*.test.mjs"
```

Do not run the full suite yet because the production contract remains intentionally red until Tasks 2 and 3.

### Task 2: Normalize generated Wrangler configuration in the repository build

**Files:**
- Create: `scripts/normalize-wrangler-config.mjs`
- Modify: `tests/cloudflare-direct-build.test.mjs`
- Modify: `scripts/build-verified.sh`

**Interfaces:**
- Produces: CLI `node scripts/normalize-wrangler-config.mjs <json-path>`; exits non-zero for missing/invalid input and rewrites valid JSON with only top-level `legacy_env` removed.
- Consumes: generated `dist/server/wrangler.json` from Vinext.

- [ ] **Step 1: Add a failing behavior test for the normalizer**

Add a test that creates a temporary JSON file with `legacy_env`, invokes the script through `execFile(process.execPath, [...])`, and asserts that `legacy_env` is absent while `name`, `main`, and nested properties remain unchanged.

- [ ] **Step 2: Run the behavior test and verify RED**

Run: `node --test --test-name-pattern="removes only" tests/cloudflare-direct-build.test.mjs`

Expected: FAIL because `scripts/normalize-wrangler-config.mjs` does not exist.

- [ ] **Step 3: Implement the minimal normalizer**

```js
#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";

const configPath = process.argv[2];
if (!configPath) {
  throw new Error("usage: normalize-wrangler-config.mjs <wrangler-json-path>");
}

const config = JSON.parse(await readFile(configPath, "utf8"));
delete config.legacy_env;
await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
```

- [ ] **Step 4: Invoke it from the verified build**

Insert after the bounded Vinext build and before validation:

```bash
node \
  "${script_dir}/normalize-wrangler-config.mjs" \
  "${SITES_PROJECT_ROOT}/dist/server/wrangler.json"
```

- [ ] **Step 5: Run the normalizer tests and verify GREEN**

Run: `node --test --test-name-pattern="removes only|normalizes generated" tests/cloudflare-direct-build.test.mjs`

Expected: PASS for both tests.

### Task 3: Remove competing package manager and GitHub deployment

**Files:**
- Delete: `bun.lock`
- Delete: `.github/workflows/preview.yml`
- Test: `tests/cloudflare-direct-build.test.mjs`

**Interfaces:**
- Consumes: repository policy tests from Task 1.
- Produces: a repository in which Cloudflare auto-selects npm and GitHub Actions cannot deploy Workers.

- [ ] **Step 1: Confirm the policy test remains RED**

Run: `node --test tests/cloudflare-direct-build.test.mjs`

Expected: FAIL only for the two existing forbidden files.

- [ ] **Step 2: Delete the two forbidden files**

Delete `bun.lock` and `.github/workflows/preview.yml` without changing `package-lock.json`.

- [ ] **Step 3: Run the complete policy test and verify GREEN**

Run: `node --test tests/cloudflare-direct-build.test.mjs`

Expected: all policy and normalizer tests PASS.

### Task 4: Document the simplified deployment flow

**Files:**
- Modify: `README.md`
- Modify: `docs/ui-audit-report.md`

**Interfaces:**
- Produces: operator instructions that identify Cloudflare native Git integration as the sole remote builder/deployer and distinguish branch preview from `main` production.

- [ ] **Step 1: Replace the GitHub Actions preview section in README**

Document this exact flow:

```text
local/VPS review -> push approved branch -> Cloudflare Workers Builds -> branch preview
main push -> Cloudflare Workers Builds -> production Worker
```

State that builds use `npm test`, npm is selected by `package-lock.json`, branch deploys use `wrangler versions upload`, and production uses `wrangler deploy`.

- [ ] **Step 2: Update the audit report**

Add a dated deployment architecture note stating that GitHub Actions deployment was removed, `main` was not modified or deployed, and remote verification is pending until the audit branch push completes.

- [ ] **Step 3: Scan documentation for stale workflow instructions**

Run: `rg -n "GitHub Actions|CLOUDFLARE_API_TOKEN|preview.yml|bun install" README.md docs/ui-audit-report.md`

Expected: no active setup instruction telling users to deploy through GitHub Actions or provide Cloudflare secrets there.

### Task 5: Verify and commit the repository migration

**Files:** All files from Tasks 1–4.

- [ ] **Step 1: Run static and focused tests**

Run: `git diff --check`

Run: `node --test tests/cloudflare-direct-build.test.mjs`

Expected: both commands pass.

- [ ] **Step 2: Run full validation on the supported Linux/VPS environment**

Run: `npm run lint`

Run: `npm test`

Expected: lint has no errors; build and every Node test pass; generated `dist/server/wrangler.json` contains no `legacy_env`.

- [ ] **Step 3: Review scope and commit**

Run: `git status --short && git diff --stat && git diff --check`

Commit message: `Use Cloudflare native builds for deployment`

### Task 6: Configure and verify Cloudflare native branch deployment

**External configuration:** Cloudflare Workers Builds for Worker `kedah-digital`.

**Interfaces:**
- Consumes: committed branch source and Cloudflare Git integration.
- Produces: one Cloudflare-managed branch build/version and a working branch preview without GitHub Actions deployment.

- [ ] **Step 1: Update Cloudflare build commands**

Set both production and non-production build commands to `npm test`. Preserve production deploy `npx wrangler deploy`, preview deploy `npx wrangler versions upload`, production branch `main`, and preview branches excluding `main`.

- [ ] **Step 2: Push only the audit branch**

Run: `git push origin codex/ui-audit-fixes`

Expected: remote audit branch advances; `main` remains unchanged.

- [ ] **Step 3: Observe the Cloudflare build**

Poll the Cloudflare build associated with the pushed commit until terminal status. Inspect its log and verify npm installation, `npm test`, and one successful branch version upload.

- [ ] **Step 4: Verify preview and isolation**

Request the branch preview URL and require HTTP 200 plus current branch content. Confirm no GitHub Actions Cloudflare deployment ran for the commit and no production deployment/version/traffic change occurred.

- [ ] **Step 5: Update report with direct evidence**

Replace the pending note with build ID, commit SHA, preview URL, command results, and explicit confirmation that `main` and production were not changed.

- [ ] **Step 6: Commit and push verification report only after evidence exists**

Commit message: `Document Cloudflare direct build verification`

Push only `codex/ui-audit-fixes` and verify the documentation-only follow-up also uses the Cloudflare native branch pipeline.
