'use strict';

export default [
    {
        id: 'Registration form',
        payload: {
            rules: require('./registration-form/rules.raw'),
            data: require('./registration-form/input.raw')
        }
    },
    {
        id: 'Validation of nested object',
        payload: {
            rules: require('./nested-object/rules.raw'),
            data: require('./nested-object/input.raw')
        }
    },
    {
        id: 'Validation of simple order list',
        payload: {
            rules: require('./simple-list/rules.raw'),
            data: require('./simple-list/input.raw')
        }
    },
    {
        id: 'Validation of order list with products objects',
        payload: {
            rules: require('./list-of-objects/rules.raw'),
            data: require('./list-of-objects/input.raw')
        }
    },
    {
        id: 'Validation of order list with different product objects',
        payload: {
            rules: require('./different-objects/rules.raw'),
            data: require('./different-objects/input.raw')
        }
    }
];
