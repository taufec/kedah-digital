#!/usr/bin/env bash
set -euo pipefail
FILM=/tmp/ktv-brand-film-v3/film
cd "$FILM"
test -s visual.html
test -s timeline.json
test -s voice-mix.wav
test -s music.mp3
rm -rf frames
mkdir -p frames qa
python3 - <<'PY'
from pathlib import Path
p=Path('render.mjs')
s=p.read_text()
s=s.replace("await page.goto('file://'+path.join(film,'visual.html'),{waitUntil:'networkidle0'});", "await page.goto('http://127.0.0.1:8765/visual.html',{waitUntil:'networkidle0'});")
p.write_text(s)
PY
python3 -m http.server 8765 --bind 127.0.0.1 --directory "$FILM" >/tmp/ktv-v3-http.log 2>&1 &
HTTP_PID=$!
cleanup(){ kill "$HTTP_PID" 2>/dev/null || true; }
trap cleanup EXIT
for _ in 1 2 3 4 5; do curl -fsS http://127.0.0.1:8765/visual.html >/dev/null && break; sleep 1; done
curl -fsS http://127.0.0.1:8765/visual.html >/dev/null
echo "=== V3 RESUME FRAME RENDER ==="
node render.mjs "$FILM"
DUR="$(python3 -c 'import json; print(json.load(open("timeline.json"))["duration"])')"
echo "duration=$DUR"
echo "=== ENCODE VISUAL ==="
ffmpeg -hide_banner -loglevel error -y -framerate 30 -i frames/%05d.jpg -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -movflags +faststart visual-v3.mp4
echo "=== AUDIO MIX ==="
ffmpeg -hide_banner -loglevel error -y -i visual-v3.mp4 -i voice-mix.wav -stream_loop -1 -i music.mp3 -i sfx/drop.ogg -i sfx/soft.ogg -i sfx/bell.ogg -i sfx/click.ogg -filter_complex '[1:a]highpass=f=70,lowpass=f=14500,acompressor=threshold=0.12:ratio=2.2:attack=5:release=120,volume=1.08[voice];[2:a]volume=0.16[music];[music][voice]sidechaincompress=threshold=0.018:ratio=8:attack=8:release=260[duck];[3:a]volume=0.34,adelay=delays=3600:all=1[s1];[4:a]volume=0.38,adelay=delays=7550:all=1[s2];[5:a]volume=0.28,adelay=delays=12800:all=1[s3];[6:a]volume=0.25,adelay=delays=19100:all=1[s4];[voice][duck][s1][s2][s3][s4]amix=inputs=6:duration=first:normalize=0,loudnorm=I=-16:TP=-1.4:LRA=7[a]' -map 0:v -map '[a]' -c:v copy -c:a aac -b:a 128k -t "$DUR" mixed-v3.mp4
echo "=== FINAL COMPACT ENCODE ==="
ffmpeg -hide_banner -loglevel error -y -i mixed-v3.mp4 -c:v libx264 -preset slow -crf 23 -maxrate 2600k -bufsize 5200k -c:a copy -pix_fmt yuv420p -movflags +faststart ktv-brand-film-v3.mp4
echo "=== QA CONTACT SHEET ==="
ffmpeg -hide_banner -loglevel error -y -i ktv-brand-film-v3.mp4 -vf 'fps=1/3,scale=640:360,tile=3x3:padding=0:margin=0' -frames:v 1 qa/contact.jpg
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate -of json ktv-brand-film-v3.mp4
echo "VIDEO_SHA256=$(sha256sum ktv-brand-film-v3.mp4 | awk '{print $1}')"
echo "VIDEO_BYTES=$(stat -c%s ktv-brand-film-v3.mp4)"
echo VIDEO_B64_BEGIN
base64 -w0 ktv-brand-film-v3.mp4
echo
echo VIDEO_B64_END
echo QA_B64_BEGIN
base64 -w0 qa/contact.jpg
echo
echo QA_B64_END
