'use strict';

var constants = require('./constants');

module.exports = {
    receiveAllComments(comments) {
        console.log('in action receiveAllComments');
        this.dispatch( constants.RECEIVE_ALL_COMMENTS, comments );
    }
};
