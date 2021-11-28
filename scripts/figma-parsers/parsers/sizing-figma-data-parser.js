import { writeJson } from '../../utils.js';

const
    CANVAS_NAME = 'design.tokens.sizing',
    SCALES_NAMES = ['4px scale', '8px scale'],
    CHILD_TYPE = 'FRAME',
    LEVELS = {
        'xxxs': 'xxxs',
        'xxs': 'xxs',
        'xs': 'xs',
        's': 'sm',
        'm': 'md',
        'l': 'lg',
        'xl': 'xl',
        'xxl': 'xxl',
        'xxxl': 'xxxl',
    };

export default Object.freeze({
    name: 'Sizing parser',
    parse: extractScales
});

function filterByScalesNameAndType(sizingChild) {
    return filterByType(sizingChild) && SCALES_NAMES.includes(sizingChild.name);
}

const filterByType = data => CHILD_TYPE === data.type;

const getDocumentFragment = documentChild => documentChild.name.includes(CANVAS_NAME);

function convertToCssValues(output, settings) {
    const sizing = `${LEVELS[settings.name.trim()]}`;
    const sizeValue = settings.absoluteBoundingBox.width;
    output.sizing[`${sizing}`] = {value: sizeValue};
    return output;
}

function mapScaleAlterationsToValues(sizingScaleAlterationData) {
    const { name, children } = sizingScaleAlterationData;
    const sizingData = children
        .filter(alterationChild => Object.keys(LEVELS).includes(alterationChild.name.trim()))
        .reduce(convertToCssValues, {
            sizing: {}
        });
    return {
        name,
        sizingData
    }
}

function writeSizingScaleDataToFile(writeResult) {
    return sizingScaleData => {
        const scaleName = sizingScaleData.name;
        const sizingData = sizingScaleData.sizingData;
        writeResult({ alias: { sizing: { ...sizingData.sizing } } },
            `./dist/sizing/${scaleName}/sizing.json`)
    }
}

function extractScales(data, writeResult = writeJson) {
    data.document.children
        .find(getDocumentFragment)
        .children
        .filter(filterByScalesNameAndType)
        .map(mapScaleAlterationsToValues)
        .forEach(writeSizingScaleDataToFile(writeResult));
}
