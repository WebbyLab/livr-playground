'use strict';
import RJSON from 'relaxed-json';

// Relaxed JSON: unquoted keys, single quotes and trailing commas are allowed.
// A syntax error carries the line number, so the editor can mark the line.
export default {
  parse(text) {
    return RJSON.parse(text, { relaxed: true });
  },
  stringify(data) {
    return JSON.stringify(data, null, 2);
  }
};
