import generateTokens from "../../utils/globalsGenerator.js";
import {subItems} from "../consts.js";

function aliasCallback(subItem) {
    return `{alias.shadow.${subItem}.value}`;
}

const type = "surface";

export default generateTokens({
    subItems: subItems.map(subItem => `${type}-${subItem}`), aliasCallback
});
