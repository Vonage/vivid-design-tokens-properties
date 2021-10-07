const category = "color";
const tokensSkeleton = {
    [category]: {
        "elevation": {

        }
    }
}
export const levels = [2,4,8,12,16,24].map(val => `dp-${val}`);
export const properties = [`canvas`];

module.exports = levels.reduce((tokensSkeletonOutput, level) => {
    tokensSkeletonOutput.color.elevation[level] = properties.reduce((levelProps, property) => {
        levelProps[property] = {
            value: `{alias.${category}.elevation.${level}.${property}.value}`
        }

        return levelProps;
    }, {});
    return tokensSkeletonOutput;
}, tokensSkeleton);
