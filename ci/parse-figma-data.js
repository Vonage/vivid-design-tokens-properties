/**
 * this module
 * - ASSUMES that raw-data.json is already found and up to date in the tmp folder
 * - READS the raw data
 * - LOADS the parsers from ci/parsers folder
 * - RUNS all of the parsers with the data and dumps their output as per config
 */
import fs from 'fs';
import { RAW_DATA_PATH } from './commons.js';

const PARSERS_DIR = './parsers/';

//	main flow start
//
console.info('parsing data...');
Promise
	.all([
		loadData(),
		loadParsers()
	])
	.then(([data, parsers]) => {
		for (const parser of parsers) {
			parseAndWrite(data, parser);
		}
		console.info('... parse done');
	})
	.catch(e => {
		console.error('Figma parse failed with:');
		console.error(e);
		process.exit(1);
	});

//	private functions
//
async function loadData() {
	return new Promise((resolve, reject) => {
		fs.readFile(RAW_DATA_PATH, { encoding: 'utf-8' }, (error, data) => {
			if (error || !data) {
				reject(error ? error : 'no raw data found');
			} else {
				const result = JSON.parse(data);
				resolve(result);
			}
		});
	});
}

async function loadParsers() {
	const parserPaths = fs.readdirSync('./ci/' + PARSERS_DIR).filter(parserPath => parserPath.endsWith('.js'));
	console.info(`\tfound ${parserPaths.length} parser/s, loading...`)
	const parserReadyPromises = parserPaths.map(pp => import(PARSERS_DIR + pp));
	return Promise
		.all(parserReadyPromises)
		.then(modules => {
			return modules.map((m, i) => {
				if (!m || typeof m.default !== 'object') {
					throw new Error(`parser '${parserPaths[i]}' is invalid, default export of type object expected`);
				}
				if (!m.default.name || typeof m.default.name !== 'string') {
					throw new Error(`parser '${parserPaths[i]}' has no valid name (${m.default.name})`);
				}
				if (!m.default.parse || typeof m.default.parse !== 'function') {
					throw new Error(`parser '${parserPaths[i]}' has no valid parse method (${m.default.parse})`);
				}
				return m.default;
			});
		});
}

function parseAndWrite(data, parser) {
	console.log(`\tparsing with '${parser.name}' ...`);
	parser.parse(data);
	console.log(`\t... '${parser.name}' done`);
}