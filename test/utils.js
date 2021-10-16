export function getStyleDictionaryConfig(sources, output = 'tmp.scss', format = 'scss/variables') {
    return {
        source: sources,
        platforms: {
            web: {
                transformGroup: 'css',
                files: [
                    {
                        destination: `tmp/${output}`,
                        format: format
                    }
                ]
            }
        }
    };
}
