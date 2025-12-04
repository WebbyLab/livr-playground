'use strict';
import 'relaxed-json';

export default {
  parse(json) {
    return JSON.parse(window.RJSON.transform(json));
  },
  stringify(data) {
    return JSON.stringify(data, null, '    ');
  }
};
