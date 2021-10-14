import StyleDictionaryPackage from "style-dictionary";
import {getStyleDictionaryConfig} from "../utils.js";

const {log} = console;
console.log = () => {};

import fetchPromise from '../../scripts/figma-parsers/fetch-figma-data.js';
fetchPromise.then(async () => {
    await import('../../scripts/figma-parsers/parse-figma-data.js');
    await import('../../scripts/build-globals.js');
    testDictionary();

    console.log = log;
})

function testDictionary() {
    StyleDictionaryPackage.registerFilter({
        name: 'filter-alias',
        matcher: function(prop) {
            return prop.attributes.category !== 'alias';
        }
    });

    for (const scheme of ['dark', 'light']) {
        for (const alt of ['alternate', 'main']) {
            const config = getStyleDictionaryConfig([
                `./dist/color/**/*.json`,
                `./dist/shadow/**/*.json`,
                `./dist//themes/${scheme}/**/${alt}.json`,
            ], `${scheme}-${alt}.scss`);
            config.platforms.web.files[0].filter = 'filter-alias';
            try {
                StyleDictionaryPackage.extend(config).buildPlatform('web');
            } catch(e) {
                process.exitCode = 1;
                console.error(`Failed to build dictionary for ${alt} ${scheme} scheme`);
            }
        }
    }
}


