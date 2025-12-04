'use strict';

export default [
  {
    id: 'Registration form',
    payload: {
      rules: require('url:./registration-form/rules.raw'),
      data: require('url:./registration-form/input.raw')
    }
  },
  {
    id: 'Validation of nested object',
    payload: {
      rules: require('url:./nested-object/rules.raw'),
      data: require('url:./nested-object/input.raw')
    }
  },
  {
    id: 'Validation of simple order list',
    payload: {
      rules: require('url:./simple-list/rules.raw'),
      data: require('url:./simple-list/input.raw')
    }
  },
  {
    id: 'Validation of order list with products objects',
    payload: {
      rules: require('url:./list-of-objects/rules.raw'),
      data: require('url:./list-of-objects/input.raw')
    }
  },
  {
    id: 'Validation of order list with different product objects',
    payload: {
      rules: require('url:./different-objects/rules.raw'),
      data: require('url:./different-objects/input.raw')
    }
  }
];
