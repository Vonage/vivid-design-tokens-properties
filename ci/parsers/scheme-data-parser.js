import { copySorted, writeJson } from '../utils.js';
import { PALETTE_FRAME_NAME, PALETTE_PRINCIPAL } from './palette-data-parser.js';

const
	SCHEME_FRAME_NAME = 'design.tokens.scheme',
	SCHEME_PRINCIPAL = 'FRAME';

export default Object.freeze({
	name: 'Schemes parser',
	parse: extractSchemes
});

function extractSchemes(data) {
	const paletteData = collectPaletteMap(data);
	const schemeData = data.document.children.find(c => c.name === SCHEME_FRAME_NAME);
	for (const scheme of schemeData.children) {
		if (scheme.type !== SCHEME_PRINCIPAL) {
			continue;
		}

		const schemeName = scheme.name;
		for (const alteration of scheme.children) {
			if (alteration.type !== SCHEME_PRINCIPAL) {
				continue;
			}

			const altName = alteration.name;
			console.info(`\t\tcollecting '${schemeName}:${altName}' scheme...`);
			const values = exctractValues(alteration, paletteData)[altName];

			const result = { alias: { color: {} } };
			copySorted(values, result.alias.color);
			writeJson(result, `./schemes/${schemeName}/${altName}.json`);
			console.info(`\t\t...'${schemeName}:${altName}' scheme DONE`);
		}
	}
}

function collectPaletteMap(data) {
	const paletteData = data.document.children.find(c => c.name === PALETTE_FRAME_NAME);
	return paletteData.children
		.filter(child => child.type === PALETTE_PRINCIPAL)
		.reduce((acc, val) => {
			acc[val.styles.fill] = `{alias.color.${val.name}.value}`;
			return acc;
		}, {});
}

function exctractValues(figmaEntry, paletteData, result = {}) {
	if (figmaEntry.children && figmaEntry.children.length) {
		const next = result[figmaEntry.name.trim()] = {};
		for (const child of figmaEntry.children) {
			if (child.type === SCHEME_PRINCIPAL) {
				exctractValues(child, paletteData, next);
			}
		}
	} else {
		if (!figmaEntry.styles || !figmaEntry.styles.fills || Object.keys(figmaEntry.styles) > 1) {
			throw new Error(`unexpected figma entry ${JSON.stringify(figmaEntry)}`);
		}
		const paletteReference = paletteData[figmaEntry.styles.fills];
		if (!paletteReference) {
			//throw new Error(`failed to find palette reference to '${figmaEntry.styles.fills}' (for '${figmaEntry.name}')`);
			console.error(`failed to find palette reference to '${figmaEntry.styles.fills}' (for '${figmaEntry.name}')`);
		}
		result[figmaEntry.name.trim()] = {
			value: paletteReference
		};
	}
	return result;
}