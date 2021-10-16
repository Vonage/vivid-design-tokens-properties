import {writeJson} from '../../utils.js';

const
    CANVAS_NAME = 'design.tokens.elevation',
    SCHEMES_NAMES = ['light', 'dark'],
    CHILD_TYPE = 'FRAME',
    LEVELS = {
        30: 2,
        40: 4,
        50: 8,
        60: 12,
        70: 16,
        80: 24,
    };

export default Object.freeze({
    name: 'Elevations parser',
    parse: extractSchemes
});

function filterBySchemeNameAndType(elevationChild) {
    return filterByType(elevationChild) && SCHEMES_NAMES.includes(elevationChild.name);
}

const filterByType = data => CHILD_TYPE === data.type;

const getDocumentFragment = documentChild => documentChild.name.includes(CANVAS_NAME);

function getDropShadowsFromFigmaConfig(dpSettings) {
    return `${dpSettings.effects.reduce((str, value) => {
        str += `drop-shadow(${!value.offset.x ? value.offset.x : value.offset.x + 'px'} ${!value.offset.y ? value.offset.y : value.offset.y + 'px'} ${!value.radius ? value.radius : value.radius + 'px'} rgba(${value.color.r * 255}, ${value.color.g * 255}, ${value.color.b * 255}, ${value.color.a})) `
        return str;
    }, '')}`;
}

function getBackgroundFromFigmaConfig(dpSettings) {
    return `rgba(${dpSettings.backgroundColor.r * 255}, ${dpSettings.backgroundColor.g * 255}, ${dpSettings.backgroundColor.b * 255}, ${dpSettings.backgroundColor.a})`;
}

function convertToCssValues(output, dpSettings) {
    const dp = `${LEVELS[dpSettings.name.trim()]}dp`;
    const background = getBackgroundFromFigmaConfig(dpSettings);
    output.color[`surface-${dp}`] = {value: background};

    const dropShadows = getDropShadowsFromFigmaConfig(dpSettings);
    output.shadow[`surface-${dp}`] = {value: dropShadows.trim()};

    return output;
}

function mapSchemeAlterationsToValues(elevationSchemeAlterationData) {
    const {name, children} = elevationSchemeAlterationData;
    const dpsData = children
        .filter(alterationChild => Object.keys(LEVELS).includes(alterationChild.name.trim()))
        .reduce(convertToCssValues, {
            color: {}, shadow: {}
        });
    return {
        name,
        dpsData
    }
}

function mapSchemesToValues(elevationSchemeData) {
    const {name, children} = elevationSchemeData;
    const schemeData = children
        .filter(filterByType)
        .map(mapSchemeAlterationsToValues)
    return {
        name,
        schemeData
    }
}

function writeElevationSchemeDataToFile(writeResult) {
    return elevationSchemeData => {
        const schemeName = elevationSchemeData.name;
        elevationSchemeData.schemeData.forEach(alternativeData => {
            const alternativeName = alternativeData.name;
            writeResult({alias: {shadow: {...alternativeData.dpsData.shadow}}},
                `./dist/themes/${schemeName}/shadow/${alternativeName}.json`)
            writeResult({alias: {color: {...alternativeData.dpsData.color}}},
                `./dist/themes/${schemeName}/color/surface-dp/${alternativeName}.json`)
        });
    }
}

function extractSchemes(data, writeResult = writeJson) {
    data.document.children
        .find(getDocumentFragment)
        .children
        .filter(filterBySchemeNameAndType)
        .map(mapSchemesToValues)
        .forEach(writeElevationSchemeDataToFile(writeResult));
}
