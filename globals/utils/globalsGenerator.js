export default function generateTokens({type, subItems = [], properties = [], aliasCallback} = {}) {
    function parseProperties(properties, subItem) {
        if (!properties.length && aliasCallback) {
            return {
                value: aliasCallback(subItem)
            }
        }

        return properties.reduce((propertyObject, property) => {
            propertyObject[property] = {};
            if (aliasCallback) {
                propertyObject[property].value = aliasCallback(property, subItem);
            }
            return propertyObject;
        }, {});
    }

    const tokensJson = {};
    let currentLevel = tokensJson;

    if (type) {
        tokensJson[type] = {};
        currentLevel = tokensJson[type];
    }

    if (subItems.length) {
        Object.assign(currentLevel, subItems.reduce((subItemsObject, subItem) => {
            subItemsObject[subItem] = parseProperties(properties, subItem);
            return subItemsObject;
        }, {}));
    }

    if (!subItems.length && properties.length) {
        Object.assign(currentLevel, parseProperties(properties));
    }

    return tokensJson;
}
