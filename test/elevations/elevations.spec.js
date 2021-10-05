import elevationTokens from './skeleton';
import StyleDictionaryPackage from 'style-dictionary';
import {getStyleDictionaryConfig} from "../utils";

import elevationParser from '../../ci/parsers/elevation-data-parser.js';
import { rawData } from "./elevation-test-data.js";

describe(`Elevation Tokens`, function () {
    it(`should create the tokens`, function () {
        expect(JSON.stringify(elevationTokens, null, 2)).toMatchSnapshot();
    });

    it(`should transpile in styledDictionary`, function () {
        for (const scheme of ['dark', 'light']) {
            for (const alt of ['alternate', 'main']) {
                const config = getStyleDictionaryConfig([
                    `./globals/elevations/tokens.js`,
                    `./elevations/${scheme}/${alt}.json`
                ], 'elevations.scss');
                expect(() => StyleDictionaryPackage.extend(config).buildPlatform('web')).not.toThrow();
            }
        }
    });

    it(`should generate the correct elevations json`, function () {
        function mockWriteJson(data, path) {
            results.push({
                data, path
            });
        }

        const results = [];
        elevationParser.parse(rawData, mockWriteJson);

        expect(JSON.stringify(results, null, 2)).toMatchSnapshot();
    });
});
