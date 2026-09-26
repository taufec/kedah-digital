#!/usr/bin/env bash
set -euo pipefail
SKILL=/root/.local/share/ajint/skills/motion-video
PROJECT=/root/.local/share/ajint/video-projects/ktv-motion-v4
cd "$SKILL/scripts"
npx playwright install chromium-headless-shell
BIN="$(find /root/.cache/ms-playwright -type f -name headless_shell -perm -111 2>/dev/null | head -n1)"
test -n "$BIN" && test -x "$BIN"
printf '%s\n' "$BIN" > "$PROJECT/browser-path.txt"
echo "MOTION_BROWSER=$BIN"
MOTION_VIDEO_CHROME="$BIN" node video.mjs doctor "$PROJECT"
cd "$PROJECT"
MOTION_VIDEO_CHROME="$BIN" node "$SKILL/scripts/video.mjs" check --scene 1
echo BROWSER_SETUP_OK
