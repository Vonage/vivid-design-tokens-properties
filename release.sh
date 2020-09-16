npm install
git add --all
git commit -m 'release design tokens'
git push
git tag vRelease
git push origin vRelease
sleep 3
git push --delete origin vRelease