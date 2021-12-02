import generateTokens from "../utils/globalsGenerator.js";
import {properties, subItems} from "./consts.js";

function aliasCallback(property, subItem) {
    return `{alias.sizing.${subItem}.${property}.value}`;
}

export default generateTokens({
    subItems, properties, aliasCallback
});
