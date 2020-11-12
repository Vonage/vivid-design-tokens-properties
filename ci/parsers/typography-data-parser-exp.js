import { clearFolder, copySorted, writeJson } from '../utils.js';

const
	TYPOGRAPHY_OUTPUT_FOLDER = './globals/typography',
	TYPOGRAPHY_FRAME_NAME = 'design.tokens.typography',
	TYPOGRAPHY_PREFIX = 'typography.',
	TYPOGRAPHY_KEY_SPLITTER = '.',
	FONT_VARIANTS_MAP = Object.freeze({
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
	parse: extractTypography
});

function extractTypography(data) {
	const tDefinitions = {
		alias: {}
	};
	const tCategories = { typography: {} };

	const tmpCategories = {};
	const typographyData = data.document.children.find(c => c.name === TYPOGRAPHY_FRAME_NAME);
	typographyData.children
		.filter(c => c.name.startsWith(TYPOGRAPHY_PREFIX))
		.forEach(typography => {
			const categoryKey = typography.name.replace(TYPOGRAPHY_PREFIX, '');
			const styleData = typography.style;

			//	extract category values and translate
			const { fontFamily, fontStretch, fontWeight } = translateFontVariant(styleData);
			const fontSize = `${styleData.fontSize}px`;
			const letterSpacing = `${styleData.letterSpacing}px`;
			const lineHeight = styleData.lineHeightUnit.toLowerCase() === 'pixels'
				? `${styleData.lineHeightPx}px`
				: `${styleData.lineHeightPercentFontSize}%`;
			const textDecoration = translateTextDecoration(styleData);
			const textTransform = translateTextTransform(styleData);

			//	create category with values
			const categoryValues = {
				font: {
					family: { value: fontFamily },
					size: { value: fontSize },
					stretch: { value: fontStretch },
					weight: { value: fontWeight }
				},
				letter: {
					spacing: { value: letterSpacing }
				},
				line: {
					height: { value: lineHeight }
				},
				text: {
					decoration: { value: textDecoration },
					transform: { value: textTransform }
				}
			}

			//	merge values and replace with aliases
			mergeReplace(tDefinitions.alias, categoryValues);
			tmpCategories[categoryKey] = categoryValues;
		});

	copySorted(tmpCategories, tCategories.typography);

	writeJson(tDefinitions, `${TYPOGRAPHY_OUTPUT_FOLDER}/definitions.json`);
	writeJson(tCategories, `${TYPOGRAPHY_OUTPUT_FOLDER}/categories.json`);
}

function translateFontVariant(source) {
	if (source.fontPostScriptName in FONT_VARIANTS_MAP) {
		return FONT_VARIANTS_MAP[source.fontPostScriptName];
	} else {
		throw new Error(`unexpected font variant '${source.fontPostScriptName}'`);
	}
}

function translateTextDecoration(source) {
	if (source.textDecoration) {
		return source.textDecoration.toLowerCase();
	} else {
		return 'none';
	}
}

function translateTextTransform(source) {
	if (source.textCase in TEXT_CASE_MAP) {
		return TEXT_CASE_MAP[source.textCase];
	} else {
		return 'none';
	}
}

function mergeReplace(aliases, values, path = []) {
	Object.keys(values).forEach(key => {
		if (!aliases[key]) {
			aliases[key] = {};
		}
		const ownPath = [...path, key];
		if ('value' in values[key]) {
			values[key].value = ['alias', ...ownPath, mergeValueToSet(aliases, values, key)].join('.');
		} else {
			mergeReplace(aliases[key], values[key], ownPath);
		}
	});
}

function mergeValueToSet(aliases, values, key) {
	const ks = Object.keys(aliases[key]);
	for (const k in ks) {
		if (aliases[key][k].value === values[key].value) {
			return k;
		}
	}
	const nk = ks.length;
	aliases[key][nk] = { value: values[key].value };
	return nk;
}