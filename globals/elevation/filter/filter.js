import generateTokens from "../../utils/globalsGenerator.js";

function aliasFunction(category, type, level, property) {
    return `{alias.${category}.${type}.${level}.${property}.value}`;
}

const category = "elevation";
const type = "shadow";

export const levels = [2,4,8,12,16,24].map(val => `dp-${val}`);
export const properties = [`filter`];

export default generateTokens({
    category, type, flavours: levels, properties, aliasFunction
});
