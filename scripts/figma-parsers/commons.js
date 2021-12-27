export const RAW_DATA_PATH = './tmp/raw-data.json';

export const getDocumentFragment = (canvasName) => (documentChild) => documentChild.name.includes(canvasName) && !documentChild.name.includes('draft');
