import fs from 'fs';
import { RAW_DATA_PATH } from './commons.js';
import extractPalette from './extractors/palette-data-extractor.js';

//	main flow start
//
console.info('parsing data...');
const data = loadData();
dumpGlobalColors(data);
dumpTypography(data);

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

function dumpGlobalColors(data) {
	console.log('\textracting palette...');
	const palette = extractPalette(data);
	const output = JSON.stringify(palette);
	fs.writeFileSync('./globals/color/palette.gen.json', output, { encoding: 'utf-8' });
	console.log('\t... palette done');
}

function dumpTypography(data) {
	//	TODO
}