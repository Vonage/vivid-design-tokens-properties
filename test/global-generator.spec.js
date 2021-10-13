import generateTokens from "../globals/utils/globalsGenerator";

describe(`Global Generator`, function () {
    it(`should return an empty object of not sent parameters`, function () {
        expect(generateTokens()).toEqual({});
    });

    it(`should return an object with a type property`, function () {
        const type = "someType";
        expect(generateTokens({type})).toEqual({[type]: {}});
    });

    it(`should return an object with subItems`, function () {
        const subItems = ["subItem1", "subItem2"];
        expect(generateTokens({subItems})).toEqual({
            [subItems[0]]: {},
            [subItems[1]]: {}
        });
    });

    it(`should return an object with type and subItems`, function () {
        const type = "someType";
        const subItems = ["subItem1", "subItem2"];
        expect(generateTokens({type, subItems})).toEqual({
            [type]: {
                [subItems[0]]: {},
                [subItems[1]]: {}
            }
        });
    });

    it(`should return an object with properties`, function () {
        const properties = ["property1", "property2"];
        expect(generateTokens({properties})).toEqual({
            [properties[0]]: {},
            [properties[1]]: {}
        });
    });

    it(`should return properties with type and sub items`, function () {
        const type = "someType";
        const subItems = ["subItem1", "subItem2"];
        const properties = ["property1", "property2"];
        expect(generateTokens({type, subItems, properties})).toEqual({
            [type]: {
                [subItems[0]]: {
                    [properties[0]]: {},
                    [properties[1]]: {}
                },
                [subItems[1]]: {
                    [properties[0]]: {},
                    [properties[1]]: {}
                }
            }
        });
    });

    it(`should set a property's aliased value using cb`, function () {
        const aliasCallback = jest.fn((property, subItem) => `${property} - ${subItem}`);
        const properties = ["property1", "property2"];
        expect(generateTokens({properties, aliasCallback})).toEqual({
            [properties[0]]: {
                value: 'property1 - undefined'
            },
            [properties[1]]: {
                value: 'property2 - undefined'
            }
        });
    });

    it(`should set a property's aliased value using cb inside subItems`, function () {
        const aliasCallback = jest.fn((property, subItem) => `${property} - ${subItem}`);
        const subItems = ["subItem1", "subItem2"];
        const properties = ["property1", "property2"];
        expect(generateTokens({properties, subItems, aliasCallback})).toEqual({
            [subItems[0]]: {
                [properties[0]]: {
                    value: 'property1 - subItem1'
                },
                [properties[1]]: {
                    value: 'property2 - subItem1'
                }
            },
            [subItems[1]]: {
                [properties[0]]: {
                    value: 'property1 - subItem2'
                },
                [properties[1]]: {
                    value: 'property2 - subItem2'
                }
            }
        });
    });

    it(`should set a subItems aliased balue using cb`, function () {
        const aliasCallback = jest.fn((subItem) => `${subItem}`);
        const subItems = ["subItem1", "subItem2"];
        expect(generateTokens({subItems, aliasCallback})).toEqual({
            [subItems[0]]: {
                value: 'subItem1'
            },
            [subItems[1]]: {
                value: 'subItem2'
            }
        });
    });
});
