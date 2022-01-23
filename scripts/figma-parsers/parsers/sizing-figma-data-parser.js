import { writeJson } from '../../utils.js';
import {getDocumentFragment} from "../commons.js";

const
    CANVAS_NAME = 'design.tokens.sizing',
    SCALES_NAMES = ['4px-scale', '8px-scale'],
    CHILD_TYPE = 'FRAME',
    LEVELS = {
        '3xs': '3xs',
        '2xs': '2xs',
        'xs': 'xs',
        'sm': 'sm',
        'md': 'md',
        'lg': 'lg',
        'xl': 'xl',
        '2xl': '2xl',
        '3xl': '3xl',
    };

export default Object.freeze({
    name: 'Sizing parser',
    parse: extractSizings
});

function filterByScalesNameAndType(sizingChild) {
    return filterByType(sizingChild) && SCALES_NAMES.includes(sizingChild.name);
}

const filterByType = data => CHILD_TYPE === data.type;

function convertToCssValues(output, settings) {
    const sizing = `${LEVELS[settings.name.trim()]}`;
    const sizeValue = settings.absoluteBoundingBox.width;
    output[`${sizing}`] = { value: `${sizeValue}px` };
    return output;
}

function reduceSizingArray(scaleData) {
    const reducedArray = [];
    scaleData.forEach(scale => {
        const { name, children } = scale;
        reducedArray[name] = children
            .filter(alterationChild => Object.keys(LEVELS).includes(alterationChild.name.trim()))
            .reduce(convertToCssValues, {});
    });
    return reducedArray;
}

function writeSizingDataToFile(writeResult) {
    return scaleData => {
        writeResult({ alias: { sizing: { ...scaleData } } }, `./tokens/sizing/sizing.values.json`);
    }
}

function extractSizings(data, writeResult = writeJson) {
    const combinedData = data.document.children
        .find(getDocumentFragment(CANVAS_NAME))
        .children
        .filter(filterByScalesNameAndType);

    const reducedData = reduceSizingArray(combinedData);
    writeSizingDataToFile(writeResult)(reducedData);
}
