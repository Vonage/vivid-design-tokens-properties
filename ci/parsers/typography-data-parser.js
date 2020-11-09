import { copySorted } from '../utils.js';

const
	TYPOGRAPHY_FRAME_NAME = 'design.tokens.typography',
	TYPOGRAPHY_PREFIX = 'typography.',
	TYPOGRAPHY_KEY_SPLITTER = '.',
	FONT_FAMILY_MAP = Object.freeze({
		'Spezia-SemiMonoRegular': {
			fontFamily: 'SpeziaMonoWebVariable',
			fontStretch: '50%',
			fontWeight: 400
		},
		'Spezia-Regular': {
			fontFamily: 'SpeziaWebVariable',
			fontStretch: '50%',
			fontWeight: 400
		},
		'Spezia-SemiBold': {
			fontFamily: 'SpeziaWebVariable',
			fontStretch: '50%',
			fontWeight: 600
		},
		'Spezia-WideMedium': {
			fontFamily: 'SpeziaWebVariable',
			fontStretch: '75%',
			fontWeight: 500
		}
	}),
	TEXT_CASE_MAP = Object.freeze({
		'ORIGINAL': 'none',
		'UPPER': 'uppercase',
		'LOWER': 'lowercase',
		'TITLE': 'capitalize'
	});

export default Object.freeze({
	name: 'Typography parser',
	parse: extractTypography,
	target: './globals/font/typography.json'
});

function extractTypography(data) {
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
				fontSize: styleData.fontSize + 'px',
				letterSpacing: styleData.letterSpacing + 'px',
				lineHeight: styleData.lineHeightUnit.toLowerCase() === 'pixels'
					? `${styleData.lineHeightPx}px`
					: `${styleData.lineHeightPercentFontSize}%`
			};
			translateFontVariant(styleData, typographyMap[categoryKey]);
			if (styleData.textDecoration) {
				typographyMap[categoryKey].textDecoration = styleData.textDecoration.toLowerCase();
			}
			translateTextCase(styleData, typographyMap[categoryKey]);
		});

	copySorted(typographyMap, result.alias.font.typography);

	return result;
}

function translateFontVariant(source, target) {
	if (source.fontPostScriptName in FONT_FAMILY_MAP) {
		Object.assign(target, FONT_FAMILY_MAP[source.fontPostScriptName]);
	} else {
		console.warn(source.fontPostScriptName);
	}
}

function translateTextCase(source, target) {
	let tt = 'none';
	if (source.textCase in TEXT_CASE_MAP) {
		tt = TEXT_CASE_MAP[source.textCase];
	}
	target.textTransform = tt;
}