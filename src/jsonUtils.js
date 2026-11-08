'use strict';
import RJSON from 'relaxed-json';

export default {
  parse(json) {
    return JSON.parse(RJSON.transform(json));
  },
  stringify(data) {
    return JSON.stringify(data, null, '    ');
  }
};
