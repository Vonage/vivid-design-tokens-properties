import os from 'os';
import StyleDictionaryPackage from 'style-dictionary';
import {getStyleDictionaryConfig} from "./utils.js";

testTypography();

function testTypography() {
    try {
        console.log(`${os.EOL}testing typography...`);
        const config = getStyleDictionaryConfig([
            './globals/typography/**/*.json',
            './typography/**/*.json'
        ], 'typography.scss');
        StyleDictionaryPackage.extend(config).buildPlatform('web');
        console.log('... PASSED');
    } catch (e) {
        console.log('... FAILED');
        console.error(e);
        process.exit(-1);
    }
}
