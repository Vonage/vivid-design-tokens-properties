import generateTokens from "../../utils/globalsGenerator.js";
import {subItems} from "../consts.js";

function aliasCallback(subItem) {
    return `{alias.shadow.${subItem}.value}`;
}

// Resulting variables - "category-type-subitem" (note the change of the dp)
// --color-surface-2dp

/**
 * Remove the `filter` from the figma parsed data
 * Use as `filter` using scss in vivid
 */

const type = "surface";

export default generateTokens({
    subItems: subItems.map(subItem => `${type}-${subItem}`), aliasCallback
});
