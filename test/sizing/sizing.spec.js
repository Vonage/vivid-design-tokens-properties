import sizingTokens from '../../globals/sizing/index.js';
import { rawData, expectedResult } from './test-data.js';
import sizingParser from '../../scripts/figma-parsers/parsers/sizing-figma-data-parser.js';

describe(`Sizing Tokens`, function () {
    it(`should create the sizing tokens`, function () {
        expect(JSON.stringify(sizingTokens, null, 2)).toMatchSnapshot();
    });

    describe(`Figma Parser`, function () {
        let results = [];

        function mockWriteJson(data, path) {
            results.push({
                data, path
            });
        }

        beforeEach(function () {
            results.length = 0;
        });

        describe(`Sizing`, function () {
            it(`should write to JSON once`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect(results.length).toEqual(1);
            });

            it(`should generate the correct sizing values json from Figma`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect({...expectedResult}).toEqual(results[0].data);
            });

            it(`should save to correct files paths`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect(results[0].path).toEqual(`./dist/sizing/sizing.values.json`);
            });
        });
    });
});
