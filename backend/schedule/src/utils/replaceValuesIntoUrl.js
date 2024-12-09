import { findDataDocument } from './findDataDocument';

const formatValueUrl = (data, formats, resources) => {
  if (data && formats?.length) {
    let newData = data;
    for (const format of formats) {
      const inCaseError = newData;
      const { moreValues, properties, functionString } = format;
      const functionParameters = [];

      const _function = new Function(...[...properties, functionString]);
      functionParameters.push(data);

      if (moreValues?.length) {
        for (const value of moreValues) {
          const dataFound = foundResource(value.split('.'), resources);

          if (dataFound) {
            functionParameters.push(dataFound);
          }
        }
      }

      try {
        newData = _function(...functionParameters);
      } catch (error) {
        newData = inCaseError;
      }
    }

    return newData;
  }

  return data;
};

export const replaceValuesIntoUrl = (url, urlProperties, resources) => {
  const regExp = /\[\[[0-1]+\]\]/gi;
  let newUrl = url;

  if (url.match(regExp) && urlProperties?.length) {
    urlProperties.forEach((item, index) => {
      const { resource, property, formats } = item;
      let dataFound = findDataDocument(property.split('.'), resources);

      if (dataFound) {
        if (formats.length) {
          dataFound = formatValueUrl(dataFound, formats, resources);
        }
        newUrl = newUrl.replace(`[[${index + 1}]]`, dataFound);
      }
    });
  }

  return newUrl;
};
