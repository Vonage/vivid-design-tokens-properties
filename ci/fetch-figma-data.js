import fs from 'fs';
import https from 'https';
import process from 'process';
import { RAW_DATA_PATH } from './commons.js';

const
	FILE_TOKEN_KEY = 'FIGMA_FILE_TOKEN',
	AUTH_TOKEN_KEY = 'FIGMA_AUTH_TOKEN';
const fileToken = process.env[FILE_TOKEN_KEY];
const authToken = process.env[AUTH_TOKEN_KEY];

if (!fileToken) {
	console.error(`environment variable ${FILE_TOKEN_KEY} missing`);
	process.exit(1);
}
if (!authToken) {
	console.error(`environment variable ${AUTH_TOKEN_KEY} missing`);
	process.exit(1);
}

//	main flow
console.info('fetching data...');
fetchData()
	.catch(e => {
		console.error(e);
		process.exitCode = 1;
	})
	.finally(() => {
		console.info('... data fetch done');
	});

async function fetchData() {
	return new Promise((resolve, reject) => {
		const request = https.get({
			hostname: 'api.figma.com',
			path: `/v1/files/${fileToken}`,
			headers: { 'X-Figma-Token': authToken },
			agent: false
		}, response => {
			if (response.statusCode !== 200) {
				reject(`data retrieval failed with ${response.statusCode}: ${response.statusMessage}`);
			}

			let receiver = '';
			response.on('data', chunk => receiver += chunk);
			response.on('end', () => {
				if (response.complete) {
					fs.writeFileSync(RAW_DATA_PATH, receiver, { encoding: 'utf-8' });
					resolve(receiver);
				} else {
					reject('data retrieval prematurely terminated');
				}
			});
		});

		request.on('error', e => reject(`data retrieval failed with ${e}`));
		request.end();
	});
}