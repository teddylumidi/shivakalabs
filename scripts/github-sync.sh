#!/usr/bin/env bash
# One-shot script: push to GitHub, close open PRs, enable Pages
set -e

OWNER="teddylumidi"
REPO="shivakalabs"
BRANCH="main"
API="https://api.github.com"
AUTH="Authorization: token ${GITHUB_PAT}"

echo "=== Testing token ==="
USER=$(curl -sf -H "$AUTH" "$API/user" | grep -o '"login":"[^"]*"' | head -1)
echo "Authenticated as: $USER"

echo "=== Pushing to GitHub ==="
GIT_TERMINAL_PROMPT=0 git push "https://${OWNER}:${GITHUB_PAT}@github.com/${OWNER}/${REPO}.git" "$BRANCH"
echo "Push done."

echo "=== Closing open PRs ==="
PRS=$(curl -sf -H "$AUTH" "$API/repos/$OWNER/$REPO/pulls?state=open&per_page=100")
echo "$PRS" | grep -o '"number":[0-9]*' | grep -o '[0-9]*' | while read -r num; do
  echo "Closing PR #$num"
  curl -sf -X PATCH -H "$AUTH" -H "Content-Type: application/json" \
    "$API/repos/$OWNER/$REPO/pulls/$num" \
    -d '{"state":"closed"}' > /dev/null
done
echo "PRs done."

echo "=== Enabling GitHub Pages (GitHub Actions source) ==="
# Try PATCH first (already exists), then POST (new)
PAGES=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH \
  -H "$AUTH" -H "Accept: application/vnd.github+json" \
  "$API/repos/$OWNER/$REPO/pages" \
  -d '{"build_type":"workflow"}')
if [ "$PAGES" = "404" ]; then
  curl -sf -X POST \
    -H "$AUTH" -H "Accept: application/vnd.github+json" \
    "$API/repos/$OWNER/$REPO/pages" \
    -d '{"build_type":"workflow"}' > /dev/null
  echo "Pages enabled (created)."
else
  echo "Pages updated (status $PAGES)."
fi

echo "=== All done! ==="
echo "Site will be live at: https://${OWNER}.github.io/${REPO}/"
