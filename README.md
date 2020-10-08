# vivid-design-tokens-properties

Vivid design tokens are the prime dependency of the Vonage's design system driven components library.
Based on the content of this package, a SCSS/CSS values are dynamically created at Vivid's build time, those are injected into the web application at run time and are providing a consistent look and feel across the whole system.

# Release - workflow process

We invest lots of effort to make the flow as automated as possible.
Below is a description of the whole lifecycle end to end.

### Manual phase:
- designer/s are working in Figma and do thier awesome stuff there
- when release cut point arrived, one of the team opens this repository UI and creates a new tag/release
	- see how to create tag/release in GitHub [here](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/managing-releases-in-a-repository)
	- our convention MUST have a tag version in the following format: `release-x.y.z`, where `x`, `y` and `z` are version numbers or your choice
	- the version MUST be higher than the existing one
	- do not change any other field, do `publish release`
- automated phase will pick up from here and do as below

### Automated phase:
- automation will first:
	- fetch a data from Figma
	- parse it and spread to the relevant JSON files
	- update the package version according to the `x.y.z` as above
- automation will commit and push those changes to the repository
- the manual trigger tag, `release-x.y.z`, will be removed and new release tag will be added with the specified version
- finally, the package will be published and ready to use by Vivid or other consumers
