import generateTokens from "../utils/globalsGenerator";

const category = "color";
const name = "elevation";
export const levels = [2,4,8,12,16,24].map(val => `dp-${val}`);
export const properties = [`canvas`];

module.exports = generateTokens({
    category,
    name,
    flavours: levels,
    properties
});
