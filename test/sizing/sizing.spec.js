import sizingTokens from '../../globals/sizing/index.js';
import { rawData, expectedResult } from './test-data.js';
import sizingParser from '../../scripts/figma-parsers/parsers/sizing-figma-data-parser.js';

describe(`Sizing Tokens`, function () {
    it(`should create the sizing tokens`, function () {
        expect(JSON.stringify(sizingTokens, null, 2)).toMatchSnapshot();
    });

    describe(`Figma Parser`, function () {
        let results = [];
        let mockWriteJson;

        beforeEach(function () {
            results.length = 0;
            mockWriteJson = jest.fn(function (data, path) {
                results.push({
                    data, path
                });
            });
        });

        describe(`Sizing`, function () {
            it(`should write to JSON only once`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect(mockWriteJson.mock.calls).toHaveLength(1);
            });

            it(`should generate the correct sizing values json from Figma`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect({ ...expectedResult }).toEqual(results[0].data);
            });

            it(`should save to correct files paths`, function () {
                sizingParser.parse(rawData, mockWriteJson);
                expect(results[0].path).toEqual(`./dist/sizing/sizing.values.json`);
            });
        });
    });
});
