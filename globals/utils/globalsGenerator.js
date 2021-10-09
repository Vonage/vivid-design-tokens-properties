export default function generateTokens({
                                           category,
                                           name,
                                           flavours,
                                           properties,
                                           tokensSkeleton = {[category]: {[name]: {}}}
                                       }) {
    return flavours.reduce((tokensSkeletonOutput, level) => {
        tokensSkeletonOutput[category][name][level] = properties.reduce((levelProps, property) => {
            levelProps[property] = {
                value: `{alias.${category}.${name}.${level}.${property}.value}`
            }

            return levelProps;
        }, {});
        return tokensSkeletonOutput;
    }, tokensSkeleton);
}
