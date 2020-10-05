import { copySorted } from '../utils.js';

const
	TYPOGRAPHY_FRAME_NAME = 'design.tokens.typography',
	TYPOGRAPHY_PREFIX = 'typography.',
	TYPOGRAPHY_KEY_SPLITTER = '.',
	WEIGHT_STRETCH_MAP = Object.freeze({
		400: 50,
		500: 75,
		600: 50
	});

export default function extractTypography(data) {
	const result = {
		alias: {
			font: {
				typography: {}
			}
		}
	};

	const typographyMap = {};
	const typographyData = data.document.children.find(c => c.name === TYPOGRAPHY_FRAME_NAME);
	typographyData.children
		.filter(c => c.name.startsWith(TYPOGRAPHY_PREFIX))
		.forEach(typography => {
			const categoryKey = typography.name.replace(TYPOGRAPHY_PREFIX, '').split(TYPOGRAPHY_KEY_SPLITTER);
			const styleData = typography.style;
			typographyMap[categoryKey] = {
				fontWeight: styleData.fontWeight,
				fontStretch: WEIGHT_STRETCH_MAP[styleData.fontWeight] + '%',
				fontSize: styleData.fontSize + 'px',
				lineHeight: styleData.lineHeightPx + 'px',
				letterSpacing: styleData.letterSpacing + 'px',
				textTransform: 'none',
			};
		});

	copySorted(typographyMap, result.alias.font.typography);

	return result;
}