import generateTokens from "../utils/globalsGenerator";

const category = "shadow";
const name = "elevation";

export const levels = [2,4,8,12,16,24].map(val => `dp-${val}`);
export const properties = [`filter`];

module.exports = generateTokens({
    category, name, flavours: levels, properties
});
