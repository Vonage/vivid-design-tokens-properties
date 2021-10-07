import elevationShadowTokens from '../../globals/shadow/elevation';
import elevationColorTokens from '../../globals/color/elevation';
import StyleDictionaryPackage from 'style-dictionary';
import {getStyleDictionaryConfig} from "../utils";

import elevationParser from '../../ci/parsers/elevation-data-parser.js';
import { rawData } from "./elevation-test-data.js";

describe(`Elevation Tokens`, function () {
    it(`should create the shadow tokens`, function () {
        expect(JSON.stringify(elevationShadowTokens, null, 2)).toMatchSnapshot();
    });

    it(`should create the color tokens`, function () {
        expect(JSON.stringify(elevationColorTokens, null, 2)).toMatchSnapshot();
    });

    // it(`should transpile in styledDictionary`, function () {
    //     const log = console.log;
    //     console.log = jest.fn();
    //     for (const scheme of ['dark', 'light']) {
    //         for (const alt of ['alternate', 'main']) {
    //             const config = getStyleDictionaryConfig([
    //                 `./globals/elevations/tokens.js`,
    //                 `./elevations/${scheme}/${alt}.json`
    //             ], 'elevations.scss');
    //             expect(() => StyleDictionaryPackage.extend(config).buildPlatform('web')).not.toThrow();
    //         }
    //     }
    //     console.log = log;
    // });
    //
    // it(`should generate the correct elevations values json from Figma`, function () {
    //     function mockWriteJson(data, path) {
    //         results.push({
    //             data, path
    //         });
    //     }
    //
    //     const results = [];
    //     elevationParser.parse(rawData, mockWriteJson);
    //
    //     expect(JSON.stringify(results, null, 2)).toMatchSnapshot();
    // });
});
