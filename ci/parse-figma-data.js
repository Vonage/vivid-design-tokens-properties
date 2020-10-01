import fs from 'fs';
import { RAW_DATA_PATH } from './commons.js';

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
	walkDFS(data, node => {
		if (!node.name || !/^scheme\s*\/.+/i.test(node.name)) {
			return;
		}
		const schemeName = node.name.match(/\/\s*(?<schemeName>\w*)/).groups.schemeName?.toLowerCase();

		console.log(schemeName);
	});
}

function dumpTypography(data) {
	//	TODO
}

function walkDFS(tree, f) {
	if (!tree || typeof tree !== 'object') {
		throw new Error(`non-null object expected, got ${tree}`);
	}
	if (!f || typeof f !== 'function') {
		throw new Error(`function expected, got ${f}`);
	}
	for (const childKey in tree) {
		if (tree[childKey] && typeof tree[childKey] === 'object') {
			f(tree[childKey]);
			walkDFS(tree[childKey], f);
		}
	}
}