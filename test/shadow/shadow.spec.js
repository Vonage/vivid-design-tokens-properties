import shadowTokens from '../../globals/shadow/index.js';

import elevationParser from '../../scripts/figma-parsers/parsers/elevation-figma-data-parser.js';

describe(`Elevation Tokens`, function () {
    it(`should create the elevation tokens`, function () {
        expect(JSON.stringify(shadowTokens, null, 2)).toMatchSnapshot();
    });

    describe(`Figma Parser`, function () {
        const results = [];

        function createRawData(children = []) {
            return {
                document: {
                    children
                }
            }
        }

        function createElevationFigmaDefinitions(children = []) {
            return {
                name: '🟡 design.tokens.elevation',
                type: "FRAME",
                children
            };
        }

        function createASchemeDefinition(name, children = []) {
            return {
                name,
                children,
                type: 'FRAME'
            }
        }

        function mockWriteJson(data, path) {
            results.push({
                data, path
            });
        }

        beforeEach(function () {
            results.length = 0;
        });

        describe(`One alternative and One Scheme`, function () {

            const schemeWithOneAlternative = [
                {
                    name: 'main',
                    type: 'FRAME',
                    children: [
                        {
                            name: '30',
                            type: 'FRAME',
                            "backgroundColor": {
                                "r": 1.0,
                                "g": 1.0,
                                "b": 1.0,
                                "a": 1.0
                            },
                            "styles": {
                                "fills": "1:4",
                                "effect": "1:502"
                            },
                            "effects": [
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.4,
                                        "g": 0.8,
                                        "b": 0.0,
                                        "a": 0.10000000149011612
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 1.0
                                    },
                                    "radius": 4.0,
                                    "showShadowBehindNode": true
                                },
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.0,
                                        "g": 0.0,
                                        "b": 0.0,
                                        "a": 0.050000000745058060
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 1.0
                                    },
                                    "radius": 2.0,
                                    "showShadowBehindNode": true
                                },
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.0,
                                        "g": 0.0,
                                        "b": 0.0,
                                        "a": 0.050000000745058060
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 2.0
                                    },
                                    "radius": 1.0,
                                    "showShadowBehindNode": true
                                }
                            ]
                        }
                    ]
                }
            ];

            const lightSchemeDataWithOneAlternatives = createASchemeDefinition('light', schemeWithOneAlternative);

            const elevationTokensFigmaData = createElevationFigmaDefinitions([lightSchemeDataWithOneAlternatives]);

            it(`should write to JSON for each category`, function () {

                const figmaRawData = createRawData([elevationTokensFigmaData]);

                elevationParser.parse(figmaRawData, mockWriteJson);

                expect(results.length).toEqual(2);
            });

            it(`should generate the correct shadow values json from Figma`, function () {

                const figmaRawData = createRawData([elevationTokensFigmaData]);

                const expectedShadow = {
                    "shadow": {
                        "surface-2dp": {
                                value: "drop-shadow(0 1px 4px rgba(102, 204, 0, 0.10000000149011612)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05000000074505806)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05000000074505806))"
                        }
                    }
                };

                const expectedColor = {
                    color: {
                        "surface-2dp": {
                                value: "rgba(255, 255, 255, 1)"
                        }
                    }
                };

                elevationParser.parse(figmaRawData, mockWriteJson);

                expect({alias: {...expectedShadow}}).toEqual(results[0].data);
                expect({alias: {...expectedColor}}).toEqual(results[1].data);
            });

            it(`should save to correct files paths`, function () {

                const figmaRawData = createRawData([elevationTokensFigmaData]);

                elevationParser.parse(figmaRawData, mockWriteJson);

                expect(results[0].path).toEqual(`./dist/themes/light/shadow/main.json`);
                expect(results[1].path).toEqual(`./dist/themes/light/color/surface-dp/main.json`);
            });
        });

        describe(`Two Alternatives and Schemes`, function () {
            const schemeWithTwoAlternatives = [
                {
                    name: 'main',
                    type: 'FRAME',
                    children: [
                        {
                            name: '30',
                            type: 'FRAME',
                            "backgroundColor": {
                                "r": 1.0,
                                "g": 1.0,
                                "b": 1.0,
                                "a": 1.0
                            },
                            "styles": {
                                "fills": "1:4",
                                "effect": "1:502"
                            },
                            "effects": [
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.4,
                                        "g": 0.8,
                                        "b": 0.0,
                                        "a": 0.10000000149011612
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 1.0
                                    },
                                    "radius": 4.0,
                                    "showShadowBehindNode": true
                                },
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.0,
                                        "g": 0.0,
                                        "b": 0.0,
                                        "a": 0.050000000745058060
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 1.0
                                    },
                                    "radius": 2.0,
                                    "showShadowBehindNode": true
                                },
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.0,
                                        "g": 0.0,
                                        "b": 0.0,
                                        "a": 0.050000000745058060
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 2.0
                                    },
                                    "radius": 1.0,
                                    "showShadowBehindNode": true
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'alternate',
                    type: 'FRAME',
                    children: [
                        {
                            name: '30',
                            type: 'FRAME',
                            "backgroundColor": {
                                "r": 1.0,
                                "g": 1.0,
                                "b": 1.0,
                                "a": 1.0
                            },
                            "styles": {
                                "fills": "1:4",
                                "effect": "1:502"
                            },
                            "effects": [
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.4,
                                        "g": 0.8,
                                        "b": 0.0,
                                        "a": 0.10000000149011612
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 1.0
                                    },
                                    "radius": 4.0,
                                    "showShadowBehindNode": true
                                },
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.0,
                                        "g": 0.0,
                                        "b": 0.0,
                                        "a": 0.050000000745058060
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 1.0
                                    },
                                    "radius": 2.0,
                                    "showShadowBehindNode": true
                                },
                                {
                                    "type": "DROP_SHADOW",
                                    "visible": true,
                                    "color": {
                                        "r": 0.0,
                                        "g": 0.0,
                                        "b": 0.0,
                                        "a": 0.050000000745058060
                                    },
                                    "blendMode": "NORMAL",
                                    "offset": {
                                        "x": 0.0,
                                        "y": 2.0
                                    },
                                    "radius": 1.0,
                                    "showShadowBehindNode": true
                                }
                            ]
                        }
                    ]
                }
            ];

            const lightSchemeData = createASchemeDefinition('light', schemeWithTwoAlternatives);

            const darkSchemeData = createASchemeDefinition('dark', schemeWithTwoAlternatives);

            const elevationFigmaDataWithFourAlternatives = createElevationFigmaDefinitions([lightSchemeData, darkSchemeData]);

            const figmaRawData = createRawData([elevationFigmaDataWithFourAlternatives]);

            it(`should generate a file per scheme and alternative`, function () {
                elevationParser.parse(figmaRawData, mockWriteJson);

                expect(results.length).toEqual(8);
            });

            it(`should generate the correct shadow values json from Figma`, function () {
                const expectedLightShadow = {
                    shadow: {
                            "surface-2dp": {
                                    value: "drop-shadow(0 1px 4px rgba(102, 204, 0, 0.10000000149011612)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05000000074505806)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05000000074505806))"
                            }
                    }
                };

                const expectedLightColor = {
                    color: {
                        "surface-2dp": {
                                value: "rgba(255, 255, 255, 1)"
                        }
                    }
                };

                const expectedDarkShadow = {
                    shadow: {
                        "surface-2dp": {
                                value: "drop-shadow(0 1px 4px rgba(102, 204, 0, 0.10000000149011612)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05000000074505806)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05000000074505806))"
                        }
                    }
                };

                const expectedDarkColor = {
                    color: {
                        "surface-2dp": {
                                value: "rgba(255, 255, 255, 1)"
                        }
                    }
                };

                const expectedMergedWithAlias = [
                    expectedLightShadow, expectedLightColor,
                    expectedLightShadow, expectedLightColor,
                    expectedDarkShadow, expectedDarkColor,
                    expectedDarkShadow, expectedDarkColor,
                ].map(val => {
                    const alias = { alias: {} };
                    const aliasProp = alias.alias;
                    Object.assign(aliasProp, val);
                    return alias;
                });

                elevationParser.parse(figmaRawData, mockWriteJson);
                const resultsWithoutDataProp = results.map(val => val.data);

                expect(resultsWithoutDataProp).toEqual(expectedMergedWithAlias);
            });

            it(`should generate the correct shadow values json from Figma`, function () {

                const expectedAddresses = [
                    './dist/themes/light/shadow/main.json',
                    './dist/themes/light/color/surface-dp/main.json',
                    './dist/themes/light/shadow/alternate.json',
                    './dist/themes/light/color/surface-dp/alternate.json',
                    "./dist/themes/dark/shadow/main.json",
                    "./dist/themes/dark/color/surface-dp/main.json",
                    "./dist/themes/dark/shadow/alternate.json",
                    "./dist/themes/dark/color/surface-dp/alternate.json",
                ]

                elevationParser.parse(figmaRawData, mockWriteJson);
                const resultsPaths = results.map(val => val.path);

                expect(resultsPaths).toEqual(expectedAddresses);
            });
        });

    });
});
