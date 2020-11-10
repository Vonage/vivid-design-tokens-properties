import { clearFolder, copySorted, writeJson } from '../utils.js';

const
	TYPOGRAPHY_OUTPUT_FOLDER = './globals/typography',
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
	}),
	TYPOGRAPHY_OUTPUT_TEMPLATE = {
		alias: {
			typography: {}
		}
	};

export default Object.freeze({
	name: 'Typography parser',
	parse: extractTypography
});

function extractTypography(data) {
	clearFolder(TYPOGRAPHY_OUTPUT_FOLDER);

	const typographyData = data.document.children.find(c => c.name === TYPOGRAPHY_FRAME_NAME);
	typographyData.children
		.filter(c => c.name.startsWith(TYPOGRAPHY_PREFIX))
		.forEach(typography => {
			const categoryKey = typography.name.replace(TYPOGRAPHY_PREFIX, '').split(TYPOGRAPHY_KEY_SPLITTER);
			const styleData = typography.style;
			const categoryData = {
				fontSize: styleData.fontSize + 'px',
				letterSpacing: styleData.letterSpacing + 'px',
				lineHeight: styleData.lineHeightUnit.toLowerCase() === 'pixels'
					? `${styleData.lineHeightPx}px`
					: `${styleData.lineHeightPercentFontSize}%`
			};
			translateFontVariant(styleData, categoryData);
			if (styleData.textDecoration) {
				categoryData.textDecoration = styleData.textDecoration.toLowerCase();
			}
			translateTextCase(styleData, categoryData);

			const result = Object.assign({}, TYPOGRAPHY_OUTPUT_TEMPLATE);
			copySorted(categoryData, result.alias.typography);
			writeJson(result, `${TYPOGRAPHY_OUTPUT_FOLDER}/${categoryKey}.json`);
		});
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