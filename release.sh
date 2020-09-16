git add --all
git commit -m 'release design tokens'
git push
git push -f origin vRelease
sleep 3
git push --delete origin vRelease