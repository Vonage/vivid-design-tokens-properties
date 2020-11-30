import { copySorted, writeJson } from '../utils.js';

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

function extractPalette(data) {
	const result = {
		alias: {
			color: {
				palette: {}
			}
		}
	};

	const colorsMap = {};
	const paletteData = data.document.children.find(c => c.name === PALETTE_FRAME_NAME);
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
	writeJson(result, './globals/color/palette.json');
}