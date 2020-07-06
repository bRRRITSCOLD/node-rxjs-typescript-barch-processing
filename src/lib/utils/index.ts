// node_modules
import * as _ from 'lodash';
const jsonStringifySafe = require('json-stringify-safe');

export const anyy = {
  stringify(item: any, options: any = {}) {
    let stringified: any;
    if (_.get(options, 'native')) stringified = JSON.stringify(item);
    else stringified = jsonStringifySafe(item);
    return stringified;
  },
};
