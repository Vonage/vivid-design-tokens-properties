import { copySorted } from '../utils.js';

const
	COLOR_FRAME_NAME = 'design.tokens.color',
	COLOR_PREFIX = 'palette.',
	COLOR_KEY_SPLITTER = '.';

export default function extractPalette(data) {
	const result = {
		alias: {
			color: {
				palette: {}
			}
		}
	};

	const colorsMap = {};
	const paletteData = data.document.children.find(c => c.name === COLOR_FRAME_NAME);
	paletteData.children
		.filter(c => c.name.startsWith(COLOR_PREFIX))
		.forEach(color => {
			const colorKey = color.name.replace(COLOR_PREFIX, '').split(COLOR_KEY_SPLITTER);
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
		});

	copySorted(colorsMap, result.alias.color.palette);

	return result;
}