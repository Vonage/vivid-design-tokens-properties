import { copySorted, writeJson } from '../utils.js';
import { PALETTE_FRAME_NAME, PALETTE_PRINCIPAL } from './palette-data-parser.js';

const
	SCHEME_FRAME_NAME = 'design.tokens.scheme',
	SCHEMES_EXPECTED = ['light', 'dark'],
	SCHEME_PRINCIPAL = 'FRAME';

export default Object.freeze({
	name: 'Schemes parser',
	parse: extractSchemes
});

function extractSchemes(data) {
	const paletteData = collectPaletteMap(data);
	const schemeData = data.document.children.find(c => c.name.includes(SCHEME_FRAME_NAME));
	if (!schemeData || !Array.isArray(schemeData.children)) {
		throw new Error(`input data is invalid, '${SCHEME_FRAME_NAME}' frame is missing`);
	}

	const unprocessedSchemes = SCHEMES_EXPECTED.slice(0);
	for (const scheme of schemeData.children) {
		if (scheme.type !== SCHEME_PRINCIPAL) {
			continue;
		}
		if (!unprocessedSchemes.includes(scheme.name)) {
			continue;
		} else {
			unprocessedSchemes.splice(unprocessedSchemes.indexOf(scheme.name), 1);
		}

		const schemeName = scheme.name;
		for (const alteration of scheme.children) {
			if (alteration.type !== SCHEME_PRINCIPAL) {
				continue;
			}

			const altName = alteration.name;
			console.info(`\t\tcollecting '${schemeName}:${altName}' scheme...`);
			const values = exctractValues(alteration, paletteData, `${schemeName}:${altName}`)[altName];

			const result = { alias: { color: {} } };
			copySorted(values, result.alias.color);
			writeJson(result, `./schemes/${schemeName}/${altName}.json`);
			console.info(`\t\t...'${schemeName}:${altName}' scheme DONE`);
		}
	}
	if (unprocessedSchemes.length) {
		throw new Error(`some of the expected schemes left unprocessed / not found: [${unprocessedSchemes.join(', ')}]`)
	}
}

function collectPaletteMap(data) {
	const paletteData = data.document.children.find(c => c.name.includes(PALETTE_FRAME_NAME));
	if (!paletteData || !Array.isArray(paletteData.children)) {
		throw new Error(`input data is invalid, '${PALETTE_FRAME_NAME}' frame is missing`);
	}

	return paletteData.children
		.filter(child => child.type === PALETTE_PRINCIPAL)
		.reduce((acc, val) => {
			acc[val.styles.fill] = `{alias.color.${val.name}.value}`;
			return acc;
		}, {});
}

function exctractValues(figmaEntry, paletteData, schemeAltName, result = {}) {
	if (figmaEntry.children && figmaEntry.children.length) {
		const next = result[figmaEntry.name.trim()] = {};
		for (const child of figmaEntry.children) {
			if (child.type === SCHEME_PRINCIPAL) {
				exctractValues(child, paletteData, schemeAltName, next);
			}
		}
	} else {
		if (!figmaEntry.styles || !figmaEntry.styles.fills || Object.keys(figmaEntry.styles) > 1) {
			throw new Error(`unexpected figma entry ${JSON.stringify(figmaEntry)}`);
		}
		const paletteReference = paletteData[figmaEntry.styles.fills];
		if (!paletteReference) {
			throw new Error(`failed to find palette reference to '${figmaEntry.styles.fills}' (for '${figmaEntry.name}' of '${schemeAltName}')`);
		}
		result[figmaEntry.name.trim()] = {
			value: paletteReference
		};
	}
	return result;
}