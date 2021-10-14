import colorTokens from '../../globals/color/index.js';
import schemesFigmaParser from '../../scripts/figma-parsers/parsers/scheme-figma-data-parser.js';
import colorPaletteFigmaParser from '../../scripts/figma-parsers/parsers/palette-data-parser.js';
import {rawData} from "../test-data";

describe(`Color`, function () {
    it(`should create the color tokens`, function () {
        expect(colorTokens).toMatchSnapshot();
    });

    describe(`parsers`, function () {
        let mockJsonWrite;
        let originalInfo;

        beforeEach(function () {
            mockJsonWrite = jest.fn();
        });

        describe(`Scheme figma parser`, function () {
            function getArePathsCorrect(expectedPaths) {
                return mockJsonWrite.mock.calls.reduce((arePathsCorrect, call, index) => {
                    return arePathsCorrect && call[1] === expectedPaths[index];
                }, true);
            }

            beforeAll(function() {
                originalInfo = console.info;
                console.info = jest.fn();
            });
            afterAll(function() {
                console.info = originalInfo;
            });
            
            it(`should write to files schemes count times alternatives`, function () {
                schemesFigmaParser.parse(rawData, mockJsonWrite);
                expect(mockJsonWrite.mock.calls).toHaveLength(4);
            });

            it(`should write to files according to scheme and alternatives`, function () {
                schemesFigmaParser.parse(rawData, mockJsonWrite);
                const expectedPaths = [
                    `./dist/themes/dark/color/alternate.json`,
                    `./dist/themes/dark/color/main.json`,
                    `./dist/themes/light/color/alternate.json`,
                    `./dist/themes/light/color/main.json`,
                ];

                const arePathsCorrect = getArePathsCorrect(expectedPaths);
                expect(arePathsCorrect).toBeTruthy();
            });
        });

        describe(`Color figma parser`, function () {
            it(`should write 1 file`, function () {
                colorPaletteFigmaParser.parse(rawData, mockJsonWrite);
                expect(mockJsonWrite.mock.calls).toHaveLength(1);
            });

            it(`should write to files according to scheme and alternatives`, function () {
                colorPaletteFigmaParser.parse(rawData, mockJsonWrite);
                const expectedPath = './dist/themes/palette.json';

                const calledPath = mockJsonWrite.mock.calls[0][1];
                expect(calledPath).toEqual(expectedPath);
            });
        });
    });

});
