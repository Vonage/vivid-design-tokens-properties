import {writeJson} from '../utils.js';

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

function extractSchemes(data, writeResult = writeJson) {
    const elevationSchemesData = data.document.children
        .find(getDocumentFragment)
        .children
        .filter(filterBySchemeNameAndType)
        .map(elevationSchemeData => {
            const schemeName = elevationSchemeData.name;
            const schemeData = elevationSchemeData.children
                .filter(filterByType)
                .map(elevationSchemeAlterationData => {
                    const alterationName = elevationSchemeAlterationData.name;
                    const dpsData = elevationSchemeAlterationData.children
                        .filter(alterationChild => Object.keys(LEVELS).includes(alterationChild.name.trim()))
                        .reduce((output, dpSettings) => {
                            const dp = `dp-${LEVELS[dpSettings.name.trim()]}`;
                            const background = `rgba(${dpSettings.backgroundColor.r * 255}, ${dpSettings.backgroundColor.g * 255}, ${dpSettings.backgroundColor.b * 255}, ${dpSettings.backgroundColor.a})`;
                            const dropShadows = `${dpSettings.effects.reduce((str, value) => {
                                str += `drop-shadow(${!value.offset.x ? value.offset.x : value.offset.x + 'px'} ${!value.offset.y ? value.offset.y : value.offset.y + 'px'} ${!value.radius ? value.radius : value.radius + 'px'} rgba(${value.color.r * 255}, ${value.color.g * 255}, ${value.color.b * 255}, ${value.color.a})) `
                                return str;
                            }, '')}`;
                            output.scheme.elevation[dp] = {
                                canvas: {value: background},
                                filter: {value: dropShadows.trim()}
                            };
                            return output;
                        }, {
                            scheme: {elevation: {}}
                        });
                    return {
                        name: alterationName,
                        dpsData
                    }
                })
            return {
                name: schemeName,
                schemeData
            }
        });

    elevationSchemesData.forEach(elevationSchemeData => {
        const schemeName = elevationSchemeData.name;
        elevationSchemeData.schemeData.forEach(alternativeData => {
            const alternativeName = alternativeData.name;
            writeResult(alternativeData.dpsData, `./elevations/${schemeName}/${alternativeName}.json`)
        })
    });

}
