import {writeJson} from '../../utils.js';
import {getDocumentFragment} from "../commons.js";

const
    CANVAS_NAME = 'design.tokens.elevation',
    SCHEMES_NAMES = ['light', 'dark'],
    CHILD_TYPE = 'FRAME',
    LEVELS = {
        20: 0,
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

function getDropShadowsFromFigmaConfig(dpSettings) {
    return `${dpSettings.effects.reduce((str, value) => {
        str += `drop-shadow(${!value.offset.x ? value.offset.x : value.offset.x + 'px'} ${!value.offset.y ? value.offset.y : value.offset.y + 'px'} ${!value.radius ? value.radius : value.radius + 'px'} rgba(${normalizeRGBValue(value.color.r)}, ${normalizeRGBValue(value.color.g)}, ${normalizeRGBValue(value.color.b)}, ${normalizeRGBValue(value.color.a, 1)})) `
        return str;
    }, '')}`;
}

function normalizeRGBValue(value, normalizeTo = 255) {
    return Number((value * normalizeTo).toFixed(3));
}

function getBackgroundFromFigmaConfig(dpSettings) {
    return `rgba(${normalizeRGBValue(dpSettings.backgroundColor.r)}, ${normalizeRGBValue(dpSettings.backgroundColor.g)}, ${normalizeRGBValue(dpSettings.backgroundColor.b)}, ${normalizeRGBValue(dpSettings.backgroundColor.a, 1)})`;
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
    try {
        data.document.children
            .find(getDocumentFragment(CANVAS_NAME))
            .children
            .filter(filterBySchemeNameAndType)
            .map(mapSchemesToValues)
            .forEach(writeElevationSchemeDataToFile(writeResult));
    } catch(e) {
        if (e.message.includes('children')) throw("Cannot read properties of undefined (reading 'children')");
        else throw(e);
    }
}
