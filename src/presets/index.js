'use strict';

module.exports = [
    {
        id: 'Registration form',
        payload: {
            rules: require("raw!./registration-form/rules.raw"),
            data: require("raw!./registration-form/input.raw")
        }
    },

    {
        id: 'Validation of nested object',
        payload: {
            rules: require("raw!./nested-object/rules.raw"),
            data: require("raw!./nested-object/input.raw")
        }
    }
];