import elevationTokens from '../../globals/elevation';

import elevationParser from '../../ci/parsers/elevation-figma-data-parser.js';

describe(`Elevation Tokens`, function () {
    it(`should create the elevation tokens`, function () {
        expect(JSON.stringify(elevationTokens, null, 2)).toMatchSnapshot();
    });

    describe(`Figma Parser`, function () {
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

        it(`should generate a file per scheme and alternative`, function () {
            function mockWriteJson(data, path) {
                results.push({
                    data, path
                });
            }

            const lightSchemeData = createASchemeDefinition('light', [
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
            ]);

            const darkSchemeData = createASchemeDefinition('dark', [
                {
                    name: 'main',
                    type: 'FRAME',
                    children: [
                        {
                            name: '40',
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
                            name: '40',
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
            ]);

            const elevationFigmaData = createElevationFigmaDefinitions([lightSchemeData, darkSchemeData]);

            const figmaRawData = createRawData([elevationFigmaData]);

            const expectedLightShadow = {

                    shadow: {
                        "dp-2": {
                            filter: {
                                value: "drop-shadow(0 1px 4px rgba(102, 204, 0, 0.10000000149011612)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05000000074505806)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05000000074505806))"
                            }
                        }
                    }
            };

            const expectedLightColor = {

                    color: {
                        "dp-2": {
                            canvas: {
                                value: "rgba(255, 255, 255, 1)"
                            }
                        }
                    }
            };

            const expectedDarkShadow = {
                    shadow: {
                        "dp-4": {
                            filter: {
                                value: "drop-shadow(0 1px 4px rgba(102, 204, 0, 0.10000000149011612)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05000000074505806)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05000000074505806))"
                            }
                        }
                    }
            };

            const expectedDarkColor = {
                    color: {
                        "dp-4": {
                            canvas: {
                                value: "rgba(255, 255, 255, 1)"
                            }
                        }
                    }
            };

            const expectedLightMerged = {
                alias: {
                    elevation: {
                        ...expectedLightShadow, ...expectedLightColor
                    }
                }
            };
            const expectedDarkMerged = {
                alias: {
                    elevation: {
                        ...expectedDarkShadow, ...expectedDarkColor
                    }
                }
            };

            const results = [];
            elevationParser.parse(figmaRawData, mockWriteJson);

            expect(results.length).toEqual(4);
            expect(expectedLightMerged).toEqual(results[0].data);
            expect(results[0].path).toEqual(`./globals/values/elevations/light/main.json`);
            expect(results[1].path).toEqual(`./globals/values/elevations/light/alternate.json`);
            expect(expectedDarkMerged).toEqual(results[2].data);
            expect(results[2].path).toEqual(`./globals/values/elevations/dark/main.json`);
            expect(results[3].path).toEqual(`./globals/values/elevations/dark/alternate.json`);
        });

        it(`should generate the correct elevations values json from Figma`, function () {
            function mockWriteJson(data, path) {
                results.push({
                    data, path
                });
            }

            const lightSchemeData = createASchemeDefinition('light', [
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
            ]);

            const elevationFigmaData = createElevationFigmaDefinitions([lightSchemeData]);

            const figmaRawData = createRawData([elevationFigmaData]);

            const expectedShadow = {
                    shadow: {
                        "dp-2": {
                            filter: {
                                value: "drop-shadow(0 1px 4px rgba(102, 204, 0, 0.10000000149011612)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05000000074505806)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05000000074505806))"
                            }
                        }
                    }
            };

            const expectedColor = {
                    color: {
                        "dp-2": {
                            canvas: {
                                value: "rgba(255, 255, 255, 1)"
                            }
                        }
                    }
            };

            const expectedMerged = {
                alias: {
                    elevation: {
                        ...expectedShadow, ...expectedColor
                    }
                }
            };

            const results = [];
            elevationParser.parse(figmaRawData, mockWriteJson);

            expect(results.length).toEqual(1);
            expect(results[0].path).toEqual(`./globals/values/elevations/light/main.json`);
            expect(expectedMerged).toEqual(results[0].data);

        });
    });
});
