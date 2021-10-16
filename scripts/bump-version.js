import fs from 'fs';

try {
	console.info('starting package version update...');

	const targetVersion = getVersionFromArgs();
	console.info(`\ttarget version resolved to '${targetVersion}'`);

	const newSemVer = parseAndValidate(targetVersion);
	console.info(`\ttarget version successfully parsed as [${newSemVer}]`);

	const oldSemVer = getCurrentPackageVersion();
	console.info(`\tcurrent version is found to be [${oldSemVer}]`);

	validateAgainstExisting(newSemVer, oldSemVer);
	console.info('\tverification against an existing version PASSED');

	updatePackageVersion(newSemVer, oldSemVer);
	console.info('\tpackage.json updated');
} catch (e) {
	console.info('version update failed', e);
	process.exitCode = 1;
} finally {
	console.info('... package version update DONE');
}


function getVersionFromArgs() {
	return process.argv[2];
}

function parseAndValidate(targetVersion) {
	if (!targetVersion) {
		throw new Error(`target version unspecified`);
	}
	const parts = targetVersion.split('.');
	if (parts.length !== 3) {
		throw new Error(`expected tripartite sem-ver format, but got '${parts}'`);
	}
	const semVers = parts.map((p, i) => {
		const sv = parseInt(p);
		if (isNaN(sv)) {
			throw new Error(`part number ${i} (zero based index) of the target version is NaN ('${p}')`);
		}
		return sv;
	});

	return semVers;
}

function getCurrentPackageVersion() {
	const packageJson = readPackageJson();
	const packageVersion = JSON.parse(packageJson).version;
	return packageVersion.split('.').map(v => parseInt(v));
}

function validateAgainstExisting(newVer, oldVer) {
	const compareMark = newVer.reduce((mark, nv, i) => {
		if (mark === 0) {
			mark = nv > oldVer[i] ? 1 : (nv < oldVer[i] ? -1 : 0);
		}
		return mark;
	}, 0);

	if (compareMark === 0) {
		throw new Error(`new version (${newVer}) and old version (${oldVer}) are equal`);
	} else if (compareMark < 0) {
		throw new Error(`new version (${newVer}) is lower than old version (${oldVer})`);
	}
}

function updatePackageVersion(newVer, oldVer) {
	const packageJson = readPackageJson();
	const updatedContent = packageJson.replace(oldVer.join('.'), newVer.join('.'));
	writePackageJson(updatedContent);
}

function readPackageJson() {
	return fs.readFileSync('package.json', { encoding: 'utf-8' });
}

function writePackageJson(content) {
	return fs.writeFileSync('package.json', content, { encoding: 'utf-8' });
}