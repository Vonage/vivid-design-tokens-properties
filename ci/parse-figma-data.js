import fs from 'fs';
import { RAW_DATA_PATH } from './commons.js';
import extractPalette from './extractors/palette-data-extractor.js';
import extractTypography from './extractors/typography-data-extractor.js';

//	main flow start
//
console.info('parsing data...');
const data = loadData();
dumpPalette(data);
dumpTypography(data);
console.info('... parse done');

//	private functions
//
function loadData() {
	const data = fs.readFileSync(RAW_DATA_PATH, { encoding: 'utf-8' });
	if (!data) {
		throw ('no raw data found');
	} else {
		const result = JSON.parse(data);
		return result;
	}
}

function dumpPalette(data) {
	console.log('\textracting palette...');
	const palette = extractPalette(data);
	const output = JSON.stringify(palette);
	fs.writeFileSync('./globals/color/palette.gen.json', output, { encoding: 'utf-8' });
	console.log('\t... palette done');
}

function dumpTypography(data) {
	console.log('\textracting typography...');
	const typography = extractTypography(data);
	const output = JSON.stringify(typography);
	fs.writeFileSync('./globals/font/typography.json', output, { encoding: 'utf-8' });
	console.log('\t... typography done');
}