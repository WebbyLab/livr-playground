'use strict';

export default [
    {
        id: 'Registration form',
        payload: {
            rules: require('raw!./registration-form/rules.raw'),
            data: require('raw!./registration-form/input.raw')
        }
    },
    {
        id: 'Validation of nested object',
        payload: {
            rules: require('raw!./nested-object/rules.raw'),
            data: require('raw!./nested-object/input.raw')
        }
    },
    {
        id: 'Validation of simple order list',
        payload: {
            rules: require('raw!./simple-list/rules.raw'),
            data: require('raw!./simple-list/input.raw')
        }
    },
    {
        id: 'Validation of order list with products objects',
        payload: {
            rules: require('raw!./list-of-objects/rules.raw'),
            data: require('raw!./list-of-objects/input.raw')
        }
    },
    {
        id: 'Validation of order list with different product objects',
        payload: {
            rules: require('raw!./different-objects/rules.raw'),
            data: require('raw!./different-objects/input.raw')
        }
    }
];
