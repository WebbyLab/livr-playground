'use strict';
import 'relaxed-json';

export default {
    parse: json => JSON.parse( window.RJSON.transform(json) ),
    stringify: data => JSON.stringify(data, null, '    ')
};
