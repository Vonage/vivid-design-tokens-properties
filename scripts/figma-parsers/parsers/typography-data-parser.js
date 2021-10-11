import { clearFolder, copySorted, writeJson } from '../../utils.js';

const
	TYPOGRAPHY_GLOBAL_OUTPUT_FOLDER = './globals/typography',
	TYPOGRAPHY_VALUES_OUTPUT_FOLDER = './typography',
	TYPOGRAPHY_FRAME_NAME = 'design.tokens.typography',
	TYPOGRAPHY_PREFIX = 'typography.',
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
	}),
	CATEGORY_BLUEPRINT = Object.freeze({
		font: {
			family: {},
			size: {},
			stretch: {},
			weight: {}
		},
		letter: {
			spacing: {}
		},
		line: {
			height: {}
		},
		text: {
			decoration: {},
			transform: {}
		}
	});

export default Object.freeze({
	name: 'Typography parser',
	parse: extractTypography
});

function extractTypography(data) {
	clearFolder(TYPOGRAPHY_GLOBAL_OUTPUT_FOLDER);
	clearFolder(TYPOGRAPHY_VALUES_OUTPUT_FOLDER);

	const tDefinitions = {
		alias: copySorted(CATEGORY_BLUEPRINT, {})
	};
	const tCategories = { typography: {} };

	const tmpCategories = {};
	const typographyData = data.document.children.find(c => c.name.includes(TYPOGRAPHY_FRAME_NAME));
	if (!typographyData || !Array.isArray(typographyData.children)) {
		throw new Error(`input data is invalid, '${TYPOGRAPHY_FRAME_NAME}' frame is missing`);
	}

	const typographies = typographyData.children.filter(c => c.name.startsWith(TYPOGRAPHY_PREFIX));
	for (const typography of typographies) {
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
		const categoryValues = copySorted(CATEGORY_BLUEPRINT, {});
		categoryValues.font.family = { value: fontFamily };
		categoryValues.font.size = { value: fontSize };
		categoryValues.font.stretch = { value: fontStretch };
		categoryValues.font.weight = { value: fontWeight };
		categoryValues.letter.spacing = { value: letterSpacing };
		categoryValues.line.height = { value: lineHeight };
		categoryValues.text.decoration = { value: textDecoration };
		categoryValues.text.transform = { value: textTransform };

		//	merge values and replace with aliases
		mergeReplace(tDefinitions.alias, categoryValues);
		tmpCategories[categoryKey] = categoryValues;
	}

	copySorted(tmpCategories, tCategories.typography);

	writeJson(tDefinitions, `${TYPOGRAPHY_GLOBAL_OUTPUT_FOLDER}/definitions.json`);
	writeJson(tCategories, `${TYPOGRAPHY_VALUES_OUTPUT_FOLDER}/web.json`);
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
	for (const key of Object.keys(values)) {
		const ownPath = [...path, key];
		if (key in aliases) {
			if ('value' in values[key]) {
				const aliasPath = ['alias', ...ownPath, mergeValueToSet(aliases[key], values[key]), 'value'].join('.');
				values[key].value = `{${aliasPath}}`;
			} else {
				mergeReplace(aliases[key], values[key], ownPath);
			}
		} else {
			throw new Error(`path '${ownPath.join('.')}' is invalid`);
		}
	}
}

function mergeValueToSet(aliases, value) {
	const keys = Object.keys(aliases);
	for (const key in keys) {
		if (aliases[key].value === value.value) {
			return key;
		}
	}
	const newKey = keys.length;
	aliases[newKey] = { value: value.value };
	return newKey;
}
