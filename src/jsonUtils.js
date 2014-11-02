'use strict';
require('relaxed-json');

module.exports = {
    parse: json => JSON.parse( window.RJSON.transform(json) ),
    stringify: data => JSON.stringify(data, null, '    ')
};