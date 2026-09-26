#!/usr/bin/env bash
set -euo pipefail
SKILL=/root/.local/share/ajint/skills/motion-video
PROJECT=/root/.local/share/ajint/video-projects/ktv-motion-v4
SOURCE_REF=93e21fbbe2b2700900bd3270a47689bcb5b722f5
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git clone -q --filter=blob:none --no-checkout https://github.com/taufec/kedah-digital "$TMP/repo"
git -C "$TMP/repo" fetch -q --depth 1 origin "$SOURCE_REF"
git -C "$TMP/repo" checkout -q --detach "$SOURCE_REF"
cp "$TMP/repo/scripts/video/ktv-motion-v4/direction.md" "$PROJECT/direction.md"
cp "$TMP/repo/scripts/video/ktv-motion-v4/video.json" "$PROJECT/video.json"
rm -rf "$PROJECT/scenes"
cp -a "$TMP/repo/scripts/video/ktv-motion-v4/scenes" "$PROJECT/scenes"

export MOTION_VIDEO_CHROME=/snap/bin/chromium
cd "$PROJECT"
echo '=== SCENE CHECKS ==='
for s in 1 2 3 4 5; do
  echo "--- SCENE $s ---"
  node "$SKILL/scripts/video.mjs" check --scene "$s"
done
echo '=== FULL CHECK ==='
node "$SKILL/scripts/video.mjs" check
echo 'CHECKS_OK'
