import elevationParser from "../../ci/parsers/elevation-figma-data-parser";
import {rawData} from "./elevation-test-data";
import {getStyleDictionaryConfig} from "../utils";
import StyleDictionaryPackage from "style-dictionary";


describe(`Elevation E2E`, function () {
    it(`should transpile in styledDictionary`, function () {
        const {log} = console;
        console.log = jest.fn();
        elevationParser.parse(rawData);
        for (const scheme of ['dark', 'light']) {
            for (const alt of ['alternate', 'main']) {
                const config = getStyleDictionaryConfig([
                    `./globals/shadow/elevations.js`,
                    `./globals/color/elevations.js`,
                    `./elevations/${scheme}/${alt}.json`
                ], 'elevations.scss');
                expect(() => StyleDictionaryPackage.extend(config).buildPlatform('web')).not.toThrow();
            }
        }
        console.log = log;
    });
});
