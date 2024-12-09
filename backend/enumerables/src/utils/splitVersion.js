import { AVAILABLE_VERSIONS } from '../config/constants';

const splitVersion = (requestVersion) => {
  let versionSplited = null;
  const validVersion = AVAILABLE_VERSIONS.some((version) => {
    return version === requestVersion;
  });

  if (!requestVersion && requestVersion !== '') {
    versionSplited = '1.0.0';
  }

  if (validVersion) {
    versionSplited = requestVersion.split('v')[1];
  }
  return versionSplited;
};

export default splitVersion;
