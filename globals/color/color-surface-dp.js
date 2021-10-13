import {subItems} from '../shadow/index.js';
import generateTokens from '../utils/globalsGenerator.js';

function aliasCallback(subItem) {
    return `{alias.color.surface.${subItem}.value}`;
}

const type = "surface";

export default generateTokens({
    subItems: subItems.map(subItem => `${type}-${subItem}`),
    aliasCallback});
