import os from 'os';
import StyleDictionaryPackage from 'style-dictionary';
import {getStyleDictionaryConfig} from "./utils";

testSchemes();
testTypography();

function testSchemes() {
	for (const scheme of ['dark', 'light']) {
		for (const alt of ['alternate', 'main']) {
			console.log(`${os.EOL}testing scheme '${scheme}:${alt}'...`);
			try {
				const config = getStyleDictionaryConfig([
					`./globals/color/**/*.json`,
					`./schemes/${scheme}/${alt}.json`
				], 'schemes.scss');
				StyleDictionaryPackage.extend(config).buildPlatform('web');
				console.log('... PASSED');
			} catch (e) {
				console.log('... FAILED');
				console.error(e);
				process.exit(-1);
			}
		}
	}
}

function testTypography() {
	try {
		console.log(`${os.EOL}testing typography...`);
		const config = getStyleDictionaryConfig([
			'./globals/typography/**/*.json',
			'./typography/**/*.json'
		], 'typography.scss');
		StyleDictionaryPackage.extend(config).buildPlatform('web');
		console.log('... PASSED');
	} catch (e) {
		console.log('... FAILED');
		console.error(e);
		process.exit(-1);
	}
}
