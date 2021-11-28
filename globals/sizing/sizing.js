import generateTokens from "../utils/globalsGenerator.js";
import {properties, subItems} from "./consts.js";

function aliasCallback(property, subItem) {
    return `{alias.sizing.${subItem}.${property}.value}`;
}

const type = "sizing";

export default generateTokens({
    subItems, type, properties, aliasCallback
});
