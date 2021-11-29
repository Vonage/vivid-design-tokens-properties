import sizingTokens from '../../globals/sizing/index.js';
import { rawData, expectedResult } from './test-data.js';
import sizingParser from '../../scripts/figma-parsers/parsers/sizing-figma-data-parser.js';

describe(`Sizing Tokens`, function () {
    it(`should create the sizing tokens`, function () {
        expect(JSON.stringify(sizingTokens, null, 2)).toMatchSnapshot();
    });

    describe(`Figma Parser`, function () {
        let results = {};

        function mockWriteJson(data, path) {
            results.path = path;
            results.data = data;
        }

        beforeEach(function () {
            results = {};
        });

        describe(`Sizing`, function () {
            it(`should write to JSON`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect(Object.keys(results.data).length).toEqual(1);
            });

            it(`should generate the correct sizing values json from Figma`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect({...expectedResult}).toEqual(results.data);
            });

            it(`should save to correct files paths`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect(results.path).toEqual(`./dist/sizing/sizing.values.json`);
            });
        });
    });
});
