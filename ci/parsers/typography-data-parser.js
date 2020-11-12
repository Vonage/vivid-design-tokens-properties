import { clearFolder, copySorted, writeJson } from '../utils.js';

const
	TYPOGRAPHY_OUTPUT_FOLDER = './globals/typography',
	TYPOGRAPHY_FRAME_NAME = 'design.tokens.typography',
	TYPOGRAPHY_PREFIX = 'typography.',
	TYPOGRAPHY_KEY_SPLITTER = '.',
	FONT_FAMILY_MAP = Object.freeze({
		'Spezia-SemiMonoRegular': {
			fontFamily: { value: 'SpeziaMonoWebVariable' },
			fontStretch: { value: '50%' },
			fontWeight: { value: 400 }
		},
		'Spezia-Regular': {
			fontFamily: { value: 'SpeziaWebVariable' },
			fontStretch: { value: '50%' },
			fontWeight: { value: 400 }
		},
		'Spezia-SemiBold': {
			fontFamily: { value: 'SpeziaWebVariable' },
			fontStretch: { value: '50%' },
			fontWeight: { value: 600 }
		},
		'Spezia-WideMedium': {
			fontFamily: { value: 'SpeziaWebVariable' },
			fontStretch: { value: '75%' },
			fontWeight: { value: 500 }
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
				fontSize: {
					value: `${styleData.fontSize}px`
				},
				letterSpacing: {
					value: `${styleData.letterSpacing}px`
				},
				lineHeight: {
					value: styleData.lineHeightUnit.toLowerCase() === 'pixels'
						? `${styleData.lineHeightPx}px`
						: `${styleData.lineHeightPercentFontSize}%`
				}
			};
			translateFontVariant(styleData, categoryData);
			translateTextCase(styleData, categoryData);
			translateTextDecoration(styleData, categoryData);

			const result = { typography: {} };
			copySorted(categoryData, result.typography);
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
	target.textTransform = {
		value: tt
	};
}

function translateTextDecoration(source, target) {
	if (source.textDecoration) {
		target.textDecoration = {
			value: source.textDecoration.toLowerCase()
		};
	}
}