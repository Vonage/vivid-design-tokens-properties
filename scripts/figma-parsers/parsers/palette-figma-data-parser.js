import { copySorted, writeJson } from '../../utils.js';

const
	PALETTE_FRAME_NAME = 'design.tokens.color',
	PALETTE_PRINCIPAL = 'RECTANGLE',
	PALETTE_PREFIX = 'palette.',
	PALETTE_KEY_SPLITTER = '.';

export default Object.freeze({
	name: 'Palette parser',
	parse: extractPalette
});
export {
	PALETTE_FRAME_NAME,
	PALETTE_PRINCIPAL
}

function extractPalette(data, writeToFile = writeJson) {
	const result = {
		alias: {
			color: {
				palette: {}
			}
		}
	};

	const colorsMap = {};
	const paletteData = data.document.children.find(c => c.name.includes(PALETTE_FRAME_NAME));
	if (!paletteData || !Array.isArray(paletteData.children)) {
		throw new Error(`input data is invalid, '${PALETTE_FRAME_NAME}' frame is missing`);
	}

	for (const color of paletteData.children) {
		if (color.type !== PALETTE_PRINCIPAL || !color.name.startsWith(PALETTE_PREFIX)) {
			continue;
		}
		const colorKey = color.name.replace(PALETTE_PREFIX, '').split(PALETTE_KEY_SPLITTER);
		const { r, g, b } = color.fills[0].color;
		let colorData = colorKey.reduce((pv, cv) => {
			if (cv in pv) {
				return pv[cv];
			} else {
				return pv[cv] = {};
			}
		}, colorsMap);

		Object.assign(colorData, {
			value: `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`
		});
	}

	copySorted(colorsMap, result.alias.color.palette);
	writeToFile(result, './dist/color/palette.json');
}
