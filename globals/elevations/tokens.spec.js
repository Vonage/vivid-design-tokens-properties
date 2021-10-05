import elevationTokens from './tokens';
import StyleDictionaryPackage from 'style-dictionary';
import {getStyleDictionaryConfig} from "../../test/test-dictionary-coherent";

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
});
