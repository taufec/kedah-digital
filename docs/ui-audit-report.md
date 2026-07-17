# UI Audit Report

## Status

Baseline and first-pass local audit completed on branch `codex/ui-audit-fixes`.
No production files were changed and no deployment was performed.

## Executive summary

- Routes inspected: 1 reachable route (`/`)
- Main UI sections inspected: hero, navigation, about, model, ecosystem, membership, activity, events, contact, and footer
- Viewports checked: 360×800, 390×844, 430×932, 768×1024, 1280×800, and 1440×900
- Confirmed objective UI defects: 0 in the first pass
- Defects fixed: 0
- Subjective proposals not implemented: 2
- Console errors observed: 0
- Horizontal overflow observed: none at 360px or 390px

## Verification evidence

### Responsive layout

At 360×800 and 390×844, the rendered document width matched the viewport width and no horizontal overflow was detected. The hero content, CTA, status card, and mobile navigation remained usable.

### Desktop layout

At 1280×800 and the default desktop viewport, the header, hero copy, metric cards, CTA, and decorative elements rendered without a confirmed overlap or clipping defect.

### Interaction

The mobile menu opened and closed successfully. Its links were present in the rendered navigation state.

### Console

No browser console errors or warnings were captured during the first-pass inspection.

## Subjective proposals not implemented

1. Replace native `<img>` elements with framework image components to address the existing performance lint warnings. This is a performance/implementation improvement, not a confirmed visual defect.
2. Reconsider the decorative metric-card positioning on very small screens. It is intentionally layered over the hero artwork and was not confirmed to be broken.

## Baseline technical status

| Check | Result | Notes |
|---|---|---|
| `npm run lint` | Pass with 15 warnings | Existing `<img>` performance warnings only |
| `npm run build` | Not runnable in this macOS environment | Repository helper requires GNU `timeout` |
| `npm test` | Not runnable in this macOS environment | Test script stops at the same build helper |
| `npm run dev` | Running locally | `http://127.0.0.1:5173/` |
| `npm run install:ci` | Not runnable in this macOS environment | Repository helper requires Linux `flock` |
| local dependency install | Completed with `npm install --legacy-peer-deps --package-lock=false` | No dependency files changed |

## VPS execution verification

The isolated audit worktree was transferred to the VPS over Tailscale and is
running from `/root/kedah-digital-ui-audit` on branch `codex/ui-audit-fixes`.

| Check | Result | Notes |
|---|---|---|
| VPS dependency install | Completed | Used `npm install --legacy-peer-deps --package-lock=false` after `npm ci` exposed the repository's existing Wrangler peer-dependency conflict; `package-lock.json` was not changed |
| VPS lint | Pass with 15 warnings | Same existing `<img>` performance warnings; 0 errors |
| VPS build | Pass | Sites artifact validation passed |
| VPS test | Pass | 1 test passed, 0 failed |
| VPS preview | Running | `http://100.85.141.16:5173/` over Tailscale |
| Persistence | Running in tmux | Session: `kedah-ui-audit`; laptop disconnect does not stop the preview |

## Git information

- Base: `origin/main` at `42f38a9651e7f857d5adb0a3fc7daeba9c6822be`
- Branch: `codex/ui-audit-fixes`
- Commits created: none
- Main modified: no
- Merged or deployed: no

## Remaining uncertainty

Full state-by-state inspection of every scroll position, hover state, animation
transition, and all intermediate breakpoints is still not exhaustive. Screenshot
capture for the audited viewport sizes was subsequently resolved in Pass 5 by
running Chromium on the VPS and copying the verified PNGs into the evidence
folder below.

## Pass 2 — 16 Jul 2026

Pass 2 was run on `codex/ui-audit-fixes` against `http://127.0.0.1:5173/`
at 390×844, 430×932, 768×1024, 1280×800, and 1440×900. Chromium DOM dumps
returned HTTP-rendered markup with the expected title, development-preview
metadata, and all seven in-page section IDs at every viewport. No reproducible
objective defect was confirmed, so no source changes were made and no new
UI-XXX defect was assigned.

Subjective proposals remain separate: replacing native `<img>` elements to
address the 15 existing lint warnings, and reconsidering intentionally layered
small-screen metric cards.

The requested browser layout metrics (document `scrollWidth`, bounding-box
overflow/overlap, computed sticky/fixed rectangles, and console events) could
not be captured because Chromium remote debugging on port 9222 was unavailable
in the sandbox. Headless screenshots were generated, but the sandbox did not
expose the resulting files for visual inspection. Therefore Pass 2 does not
claim those checks as verified; mobile menu open/close, keyboard focus, and
accordion/tab state remain unresolved screenshot/interaction evidence items.

Commands: `curl`, Chromium `--dump-dom` at all five viewport sizes, source/DOM
anchor and asset inventory. Preview status: HTTP 200 and running locally.

## Pass 3 — 16 Jul 2026

Functional/usability checks were performed from the Pass 2 checkpoint on
`codex/ui-audit-fixes` without source changes. Static DOM/source inspection
covered the mobile menu toggle (`aria-expanded`), ecosystem controls
(`aria-pressed`), keyboard-focus CSS, membership focus states, poster/gallery
links, external link targets, reduced-motion CSS, image loading attributes, and
form availability. No forms or validation states exist on the page.

All 11 locally referenced image/poster assets returned HTTP 200 from the
preview. The page exposes two buttons, one expanded-state control, one
pressed-state control, four `target="_blank"` links with `rel="noreferrer"`,
and no missing local asset was found. No reproducible objective defect was
confirmed; no new UI-XXX finding was assigned. Subjective proposals remain
separate.

Runtime console/error and failed-request capture, true keyboard Tab traversal,
focus-ring screenshots, menu open/close execution, hit-area measurement, and
reduced-motion runtime verification remain limited because Chromium DevTools
remote debugging was unavailable in the sandbox. Chromium DOM rendering
remained available, but it cannot prove those runtime states. No source code
was changed.

## Pass 4 — 16 Jul 2026

Final regression and hand-off verification ran on the VPS after Pass 3:

- `npm run lint`: passed with 0 errors and the existing 15 `<img>` warnings.
- `npm run build`: passed; the Sites artifact was validated.
- `npm test`: passed; 1/1 test passed and 0 failed.
- Preview remained HTTP 200 at `http://127.0.0.1:5173/`.
- Source files remained unchanged; no defect fix was warranted because no
  high-confidence objective defect was confirmed.
- The branch remains isolated at `codex/ui-audit-fixes`; no merge or deploy was
  performed.

## VPS audit checkpoint — 2026-07-16

The audit was continued by Codex CLI in the persistent VPS session
`codex-ui-audit` on the isolated `codex/ui-audit-fixes` branch.

- Preview: `http://127.0.0.1:5173/` returned HTTP 200 and 53,086 bytes during the final check.
- Route/anchor inspection: no missing in-page anchors or duplicate IDs were found.
- Asset inspection: referenced local assets were present.
- Responsive source inspection: mobile navigation, grids, gallery, contact, and footer have breakpoint-specific rules.
- Verification: `npm run lint` passed with the existing 15 `<img>` warnings; `npm run build` passed; `npm test` passed with 1/1 test.
- Confirmed objective defects: 0.
- Code fixes: 0; no tracked source files changed.
- Subjective proposals: existing performance `<img>` warnings and intentionally layered decorative positioning remain proposals, not implemented defects.
- Screenshot evidence: headless Chromium was attempted at 390×844 and 1280×800, but the sandbox did not produce PNG files; visual screenshot evidence remains unresolved.
- Review state: stopped at a human review checkpoint; `main` was not modified, merged, or deployed.

## Pass 5 — 16 Jul 2026

The screenshot limitation was resolved by running the installed Chromium on the
VPS preview and writing output to `/home/kedah-screenshots/`, a path that is
readable outside the Snap sandbox. The generated files were verified as PNGs at
their requested dimensions and copied into `docs/ui-audit-evidence/`:

- `pass5-360.png` — 360×800
- `pass5-390.png` — 390×844
- `pass5-430.png` — 430×932
- `pass5-768.png` — 768×1024
- `pass5-1280.png` — 1280×800
- `pass5-1440.png` — 1440×900

The 360px and 390px captures visibly show the mobile header, hero copy, CTA,
and layered hero artwork without a confirmed overlap or horizontal clipping.
The 1280px capture visibly shows the desktop navigation, hero content, CTA,
and metric cards without a confirmed overlap or clipping defect. No
high-confidence objective defect was confirmed and no source files were
changed.

The in-app browser backend can still close its target when its own screenshot
command is requested, and it kept the page at its default desktop viewport.
That backend limitation is now separate from the resolved VPS screenshot
workflow. True keyboard Tab traversal, hover/animation evidence, and every
intermediate breakpoint remain limited and are not claimed as fully verified.

## User annotation update — 16 Jul 2026

Applied the requested copy change from the browser annotation:

- `01 / CONNECT` → `01 / JALINAN`
- `Community Platform` → `Platform Komuniti`
- `LIVE ECOSYSTEM` → `EKOSISTEM DINAMIK`
- `CONNECTION DENSITY` → `TAHAP KETERHUBUNGAN`
- `02 / CATALYSE` → `02 / LONJAKKAN`
- `Digital Economy Catalyst` → `Memacu Ekonomi Digital`
- `03 / BRIDGE` → `03 / HUBUNGKAN`
- `Industry × Academia × Government` → `Industri × Akademia × Agensi`
- `04 / ORCHESTRATE` → `04 / SELARASKAN`
- `Strategic Technology Ecosystem` → `Ekosistem Teknologi Strategik`
- `7+` → `Sejak 2020`
- `Bulan gerakan konsisten` → `Gerakan yang konsisten`
- `Laluan keahlian dicadang` → `Jenis keahlian dicadang`
- Impact metric values use 40px and impact labels use 23px with a wider
  responsive label width and normalized letter spacing.
- Source: `app/page.tsx` (`stories[0].kicker`, `stories[0].title`, and the two
  `StoryDocumentary` signal/data-card labels)
- Scope: the selected story copy labels only; no responsive styling or design
  token changes were necessary.
- Verification: refreshed live DOM contains the translated story labels and
  impact copy; computed impact typography is 40px for values and 23px for
  labels; `npm run lint` passed with the existing 15 warnings; VPS build
  passed; `npm test` passed with 1/1 test.

Applied the next three requested browser annotations:

- `Bukan sekadar acara. Sebuah sistem sambungan.` → `Bukan sekadar acara. Tapi jaringan yang menggerakkan ekosistem.`
- `mengorkestrasi hubungan` → `menyelaraskan hubungan`
- `Bakat wujud. Ekonomi digital boleh dibesarkan.` → `Kedah bukan kurang bakat. Kedah perlukan momentum.`
- Source: `app/page.tsx` (Model Gerakan heading, section lead, and opportunity
  heading).
- Scope: selected Model Gerakan copy only; no layout, responsive styling, or
  design-token changes.
- Verification: live VPS HTML and refreshed browser DOM contain all three exact
  requested values; local `npm run lint` passed with the existing 15 warnings;
  VPS `npm test` passed, including the production build and 1/1 rendered-HTML
  test.

Applied the following ecosystem-network browser annotations:

- `Banyak pemain penting.` → `Satu gelombang kebangkitan.`
- `Komuniti Terkemuka` → `Komuniti Terjalin`
- `Tech Industri` → `Industri Teknologi`
- `Strategic Organizations` → `Organisasi Strategik`
- `ECOSYSTEM CORE` → `TERAS EKOSISTEM` (direct Malay translation inferred
  from the incomplete annotation `ecosystem core =`).
- Source: `app/page.tsx` (`EcosystemNetwork` heading, `ecosystemGroups`, and
  network center label).
- Scope: ecosystem-network copy only; no layout or responsive styling changes.

Applied the final two requested browser annotations:

- `Banyak titik sambungan.` → `Menghubungi seluruh ekosistem.`
- `Ada ruang untuk setiap penyumbang.` → `Bawa kepakaran anda. Kita bina impak bersama.`
- Source: `app/page.tsx` section intro and membership heading.
- Scope: selected copy only; no layout or design-token changes.
- Verification: live VPS HTML contains all three final copy values; local
  `npm run lint` passed with 0 errors and the existing 15 warnings; VPS
  `npm test` passed, including the production build and 1/1 rendered-HTML test.

Applied the impact-strip browser annotations:

- `4` → `4 Teras`
- `6` → `6 Jenis`
- `Jenis keahlian dicadang` → `Keahlian dicadang`
- `2026` → `Tahun 2026`
- The nested CountUp values now explicitly use the green token (`#b9f05d`),
  avoiding the muted label color inherited by the nested spans.
- `Sejak 2020` is now 23px through the dedicated `impact-item--since` class.
- Source: `app/page.tsx` (`CountUp` and `ImpactStrip`) and `app/globals.css`
  (impact value color and compact value typography).
- Scope: impact-strip copy and typography/color only; no layout changes.
- Verification: source synced to VPS; live HTML contains `Sejak 2020` and
  `Keahlian dicadang`; local lint passed with 0 errors and 15 existing
  warnings; VPS build and 1/1 rendered-HTML test passed.
