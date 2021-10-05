const tokensSkeleton = {
    "test": {
        "elevation": {

        }
    }
}
export const levels = [2,4,8,12,16,24].map(val => `dp-${val}`);
export const properties = [`canvas`, `filter`];

module.exports = levels.reduce((tokensSkeletonOutput, level) => {
    tokensSkeletonOutput.test.elevation[level] = properties.reduce((levelProps, property) => {
        levelProps[property] = {
            value: `{scheme.elevation.${level}.${property}.value}`
        }

        return levelProps;
    }, {});
    return tokensSkeletonOutput;
}, tokensSkeleton);
