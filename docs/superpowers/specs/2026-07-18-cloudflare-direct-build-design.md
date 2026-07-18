# Cloudflare Direct Build Migration Design

## Objective

Make Cloudflare Workers Builds the only remote build and deployment system for
`taufec/kedah-digital`. Keep GitHub as the source repository, keep the VPS as the
local review environment, and remove Cloudflare deployment responsibility from
GitHub Actions.

## Confirmed Current State

- Cloudflare Worker `kedah-digital` is connected directly to the GitHub
  repository `taufec/kedah-digital`.
- Cloudflare has a production trigger for `main` using `wrangler deploy`.
- Cloudflare has a non-production trigger for every branch except `main` using
  `wrangler versions upload`.
- Cloudflare has successfully built and deployed this project directly before.
- Current direct builds fail during dependency installation because Cloudflare
  detects `bun.lock` and runs `bun install --frozen-lockfile`, while `bun.lock`
  no longer matches `package.json`.
- The repository's maintained CI scripts and lockfile already use npm and
  `package-lock.json`.
- The GitHub Actions workflow currently duplicates Cloudflare deployment and
  can upload the same branch twice when both push and pull-request events run.

## Selected Architecture

Use npm as the only package manager:

```text
VPS local review
  -> approved branch push to GitHub
  -> Cloudflare Workers Builds installs from package-lock.json
  -> Cloudflare runs build and rendered-output tests
  -> Cloudflare deploys a branch preview or main production Worker
```

GitHub Actions will not install dependencies, build deployment artifacts,
receive Cloudflare credentials, call Wrangler, or deploy Worker versions.

## Repository Changes

1. Remove `bun.lock` so Cloudflare selects npm from `package-lock.json`.
2. Add a repository validation test that fails when multiple JavaScript
   package-manager lockfiles are present or Cloudflare deployment is re-added
   to GitHub Actions.
3. Move removal of Vinext's obsolete generated `legacy_env` field from the
   GitHub workflow into the repository build pipeline, immediately after
   `vinext build` and before artifact validation/deployment.
4. Keep `npm test` as the build command because it builds, validates the
   artifact, and executes rendered-output tests.
5. Remove `.github/workflows/preview.yml` after the Cloudflare-only contract is
   covered by repository tests.
6. Update README and the UI audit report to describe Cloudflare as the sole
   remote build/deploy system.

## Cloudflare Configuration

- Production branch: `main`.
- Production build command: `npm test`.
- Production deploy command: `npx wrangler deploy`.
- Non-production branches: every branch except `main`.
- Preview build command: `npm test`.
- Preview deploy command: `npx wrangler versions upload`.
- Root directory: `/`.
- Build caching remains enabled.

Cloudflare configuration changes will be applied only after the branch source
changes are committed. The first remote verification will use
`codex/ui-audit-fixes`; production `main` will not be pushed, merged, or
deployed during this migration.

## Verification

The migration is complete only when all of the following are directly observed:

1. Local/VPS lint passes with no errors.
2. Local/VPS `npm test` completes the production build and all tests.
3. The generated `dist/server/wrangler.json` does not contain `legacy_env`.
4. A push to `codex/ui-audit-fixes` creates one successful Cloudflare build.
5. The successful build reports npm dependency installation, not Bun.
6. Cloudflare creates or updates the branch preview URL.
7. The preview URL returns HTTP 200 and renders the current branch content.
8. No GitHub Actions Cloudflare deployment runs for that commit.
9. No production deployment is created or modified.

## Rollback

If the branch build fails, keep `main` unchanged, inspect the Cloudflare build
log, and fix the repository or branch build configuration at the documented
failure point. Do not restore the GitHub deployment workflow unless Cloudflare
Workers Builds is proven incapable of satisfying a concrete requirement that
cannot be implemented in the repository build scripts.

## Out of Scope

- Merging the branch into `main`.
- Deploying or changing production traffic.
- Changing application UI or business behavior.
- Rotating or deleting GitHub secrets before the Cloudflare-only branch build
  has been verified.
