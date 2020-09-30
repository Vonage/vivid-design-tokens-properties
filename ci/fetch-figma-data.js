import fs from 'fs';
import https from 'https';

const
	RAW_DATA_PATH = './raw-data/raw.json',
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
fetchData()
	.then(() => parseData())
	.then(data => {
		//	TODO: process the raw data here and spread to the sub objects if needed
		console.log(Object.keys(data));
	})
	.catch(e => {
		console.error(e);
		process.exitCode = 1;
	})
	.finally(() => {
		console.info('data fetch done');
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

			const receiver = fs.createWriteStream(RAW_DATA_PATH, { encoding: 'utf-8' });
			response.on('data', chunk => receiver.write(chunk));
			response.on('end', () => {
				if (response.complete) {
					receiver.end(resolve);
				} else {
					reject('data retrieval prematurely terminated');
				}
			});
		});

		request.on('error', e => reject(`data retrieval failed with ${e}`));
		request.end();
	});
}

async function parseData() {
	return new Promise((resolve, reject) => {
		fs.readFile(RAW_DATA_PATH, { encoding: 'utf-8' }, (error, data) => {
			if (error) {
				reject(error);
			} else if (!data) {
				reject(`expected to get raw data, found ${data}`);
			} else {
				const result = JSON.parse(data);
				resolve(result);
			}
		});
	});
}