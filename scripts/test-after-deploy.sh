#!/usr/bin/env bash
# Post-deploy checks for routing, redirects, sitemap/robots and 404s. Read-only (HTTP GET only).
#
# Usage:
#   scripts/test-after-deploy.sh                                   # production (https://www.staticsavvymedia.com)
#   BASE=https://<preview>.vercel.app scripts/test-after-deploy.sh # a Vercel preview deployment
#   VERCEL_BYPASS=<token> BASE=... scripts/test-after-deploy.sh    # preview behind Deployment Protection
#                                                                  # (Project > Settings > Deployment Protection >
#                                                                  #  Protection Bypass for Automation)
# Expects: every sitemap URL 200; static files 200; /path -> 308 /path/; alias + legacy URLs -> 301 to
# their target; unknown URLs -> 404 with the noindex 404 page.
set -u
BASE="${BASE:-https://www.staticsavvymedia.com}"
BASE="${BASE%/}"
DIR="$(cd "$(dirname "$0")/.." && pwd)"
SITEMAP_FILE="$DIR/public/sitemap.xml"
LEGACY_CSV="$DIR/scripts/seo/legacy-redirects.csv"
CURL=(curl -s --max-time 20)
[[ -n "${VERCEL_BYPASS:-}" ]] && CURL+=(-H "x-vercel-protection-bypass: $VERCEL_BYPASS")
pass=0; fail=0
check() { # url expected_status [expected_location]
  local url="$1" want="$2" loc="${3:-}" got code redir
  got=$("${CURL[@]}" -o /dev/null -w '%{http_code} %{redirect_url}' "$url")
  code="${got%% *}"; redir="${got#* }"
  if [[ "$code" == "$want" && ( -z "$loc" || "$redir" == "$loc" ) ]]; then pass=$((pass+1)); else
    fail=$((fail+1)); echo "FAIL $url -> $code $redir (want $want ${loc})"; fi
}

echo "== 1. Every sitemap URL returns 200 on $BASE"
mapfile -t urls < <(grep -o '<loc>[^<]*' "$SITEMAP_FILE" | sed 's#<loc>##; s#https://www.staticsavvymedia.com#'"$BASE"'#')
for u in "${urls[@]}"; do check "$u" 200; done
echo "   checked ${#urls[@]} URLs"

echo "== 2. Static files still served as files"
check "$BASE/sitemap.xml" 200; check "$BASE/robots.txt" 200; check "$BASE/favicon.ico" 200; check "$BASE/favicon.svg" 200
for a in $("${CURL[@]}" "$BASE/" | grep -oE '/assets/index-[^"]+\.(js|css)' | sort -u); do check "$BASE$a" 200; done

echo "== 3. No-slash -> slash (308)"
check "$BASE/about" 308 "$BASE/about/"
check "$BASE/services/seo/madurai" 308 "$BASE/services/seo/madurai/"
check "$BASE/blog/how-to-rank-in-ai-search" 308 "$BASE/blog/how-to-rank-in-ai-search/"

echo "== 4. Duplicate/alias URLs (301)"
check "$BASE/pricing/" 301 "$BASE/pricing/india/"
check "$BASE/pricing" 301 "$BASE/pricing/india/"
check "$BASE/pricing/india/social-media-marketing/" 301 "$BASE/pricing/india/social-media/"
check "$BASE/pricing/malaysia/website-design-development/" 301 "$BASE/pricing/malaysia/website/"
check "$BASE/blog/seo/" 301 "$BASE/blog/seo-agency-madurai-complete-guide/"
check "$BASE/blog/geo-aeo/" 301 "$BASE/blog/what-is-generative-engine-optimization/"

echo "== 5. Legacy URLs with Search Console impressions (301 -> target)"
n=0
while IFS=, read -r path target; do
  check "$BASE$path" 301 "$BASE$target"; n=$((n+1))
done < <(python3 - "$LEGACY_CSV" <<'PY'
import csv, sys
for r in csv.DictReader(open(sys.argv[1])):
    if r["action"] == "redirect" and int(r["gsc_impressions_90d"] or 0) > 0:
        print(f'{r["legacy_path"]},{r["target"]}')
PY
)
echo "   checked $n legacy URLs"
check "$BASE/seo-services-in-madurai/" 301 "$BASE/services/seo/madurai/"   # old WordPress form (trailing slash)

echo "== 6. Unknown URLs return a real 404 (noindex page)"
check "$BASE/this-page-does-not-exist-$RANDOM/" 404
check "$BASE/this-page-does-not-exist-$RANDOM" 404
check "$BASE/services/seo/unknown-city/" 404
check "$BASE/post/top-10-best-affiliate-programs-to-make-money-online-in-2026" 404
"${CURL[@]}" "$BASE/no-such-page-$RANDOM/" | grep -q 'noindex' && pass=$((pass+1)) || { fail=$((fail+1)); echo "FAIL 404 page has no noindex"; }

echo "== 7. robots.txt / sitemap.xml use the www host"
"${CURL[@]}" "$BASE/robots.txt" | grep -q "Sitemap: https://www.staticsavvymedia.com/sitemap.xml" && pass=$((pass+1)) || { fail=$((fail+1)); echo "FAIL robots.txt Sitemap line"; }
"${CURL[@]}" "$BASE/sitemap.xml" | grep -q "<loc>https://staticsavvymedia.com" && { fail=$((fail+1)); echo "FAIL sitemap still has non-www locs"; } || pass=$((pass+1))

if [[ "$BASE" == "https://www.staticsavvymedia.com" ]]; then
  echo "== 8. Host redirects unchanged (production only)"
  check "https://staticsavvymedia.com/about/" 308 "https://www.staticsavvymedia.com/about/"
  check "http://www.staticsavvymedia.com/about/" 308 "https://www.staticsavvymedia.com/about/"
fi

echo; echo "PASS $pass  FAIL $fail"
echo "Canonical check (needs JS): open a few pages, DevTools > Elements > <link rel=canonical>; expect https://www.staticsavvymedia.com/<path>/"
[[ $fail -eq 0 ]]
