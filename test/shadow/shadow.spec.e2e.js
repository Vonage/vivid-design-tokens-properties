import elevationParser from "../../scripts/figma-parsers/parsers/elevation-figma-data-parser";
import {rawData} from "../test-data";
import StyleDictionaryPackage from "style-dictionary";
import {getStyleDictionaryConfig} from "../utils";

StyleDictionaryPackage.registerFilter({
    name: 'filter-alias',
    matcher: function(prop) {
        return prop.attributes.category !== 'alias';
    }
});

describe(`Elevation E2E`, function () {
    it(`should transpile in styledDictionary`, function () {
        const {log} = console;
        console.log = jest.fn();
        elevationParser.parse(rawData);
        for (const scheme of ['dark', 'light']) {
            for (const alt of ['alternate', 'main']) {
                const config = getStyleDictionaryConfig([
                    `./dist/elevations/values/${scheme}/${alt}.json`,
                    `./dist/elevations/elevation.json`,
                ], 'elevations.scss');
                config.platforms.web.files[0].filter = 'filter-alias';
                // config.tokens = elevationTokens;
                expect(() => StyleDictionaryPackage.extend(config).buildPlatform('web')).not.toThrow();
            }
        }
        console.log = log;
    });
});
