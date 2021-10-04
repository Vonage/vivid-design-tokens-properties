import os from 'os';
import StyleDictionaryPackage from 'style-dictionary';
import elevationParser from '../ci/parsers/elevation-data-parser.js';
import { expectedResult, rawData } from "./elevation-test-data.js";

testSchemes();
testTypography();
testElevations();

function testElevations() {
	function mockWriteJson(data, path) {
		results.push({
			data, path
		});
	}

	const results = [];
	elevationParser.parse(rawData, mockWriteJson);

	results.forEach((result, index) => {
		if (result.path !== `./elevations/${expectedResult[index].path}.json` ||
		JSON.stringify(result.data) !== JSON.stringify(expectedResult[index].dpsData)) {
			console.log('... FAILED');
			console.error(`Failed to parse ${result.path}`);
			process.exit(-1);
		}
	});
	console.log('... PASSED');
}

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

function getStyleDictionaryConfig(sources, output = 'tmp.scss', format = 'scss/variables') {
	return {
		source: sources,
		platforms: {
			web: {
				transformGroup: 'css',
				files: [
					{
						destination: `tmp/${output}`,
						format: format
					}
				]
			}
		}
	};
}
