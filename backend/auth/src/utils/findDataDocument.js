export const findDataDocument = (properties, document) => {
  if (document && Array.isArray(properties) && properties.length) {
    const newProperties = [...properties];
    const property = newProperties.shift();
    if (
      typeof property === 'string' &&
      (typeof document[property] === 'string' || typeof document[property] === 'number')
    ) {
      return document[property];
    } else {
      return findDataDocument(newProperties, document[property]);
    }
  }

  return null;
};
