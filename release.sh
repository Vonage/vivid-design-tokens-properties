git add --all
git commit -m 'release design tokens'
git push
git tag vRelease
git push --tags
git push --delete origin vRelease
git fetch -p -P