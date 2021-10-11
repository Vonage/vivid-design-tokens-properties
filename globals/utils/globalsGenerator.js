function generateAlias(category, name, level, property) {
    return `{alias.${category}.${name}.${level}.${property}.value}`;
}

export default function generateTokens({
                                           category,
                                           type,
                                           flavours,
                                           properties,
                                           aliasFunction = generateAlias,
                                       }) {
    return flavours.reduce((tokensSkeletonOutput, level) => {
        tokensSkeletonOutput[type][level] = properties.reduce((levelProps, property) => {
            levelProps[property] = {
                value: aliasFunction(category, type, level, property)
            }

            return levelProps;
        }, {});
        return tokensSkeletonOutput;
    }, {
        [type]: {}
    });
}
