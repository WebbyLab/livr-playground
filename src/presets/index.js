'use strict';

// Examples in the "Example" menu, grouped. Rules, data and aliases are relaxed JSON files.
export default [
  {
    group: 'LIVR 2.0',
    items: [
      {
        id: 'registration-form',
        title: 'Registration form',
        rules: require('url:./registration-form/rules.raw'),
        data: require('url:./registration-form/input.raw')
      },
      {
        id: 'nested-object',
        title: 'Nested object',
        rules: require('url:./nested-object/rules.raw'),
        data: require('url:./nested-object/input.raw')
      },
      {
        id: 'simple-list',
        title: 'List of IDs',
        rules: require('url:./simple-list/rules.raw'),
        data: require('url:./simple-list/input.raw')
      },
      {
        id: 'list-of-objects',
        title: 'List of objects',
        rules: require('url:./list-of-objects/rules.raw'),
        data: require('url:./list-of-objects/input.raw')
      },
      {
        id: 'different-objects',
        title: 'List of different objects',
        rules: require('url:./different-objects/rules.raw'),
        data: require('url:./different-objects/input.raw')
      }
    ]
  },
  {
    group: 'LIVR 2.5',
    items: [
      {
        id: 'checkout',
        title: 'Checkout: when, uuid, iban, unique',
        rules: require('url:./checkout-2-5/rules.raw'),
        data: require('url:./checkout-2-5/input.raw')
      },
      {
        id: 'api-filters',
        title: 'Query filters: split, ip, keys, values',
        rules: require('url:./api-filters-2-5/rules.raw'),
        data: require('url:./api-filters-2-5/input.raw')
      }
    ]
  },
  {
    group: 'Aliases',
    items: [
      {
        id: 'aliases-registration',
        title: 'User registration',
        rules: require('url:./aliases-registration/rules.raw'),
        data: require('url:./aliases-registration/input.raw'),
        aliases: require('url:./aliases-registration/aliases.raw')
      },
      {
        id: 'aliases-ecommerce',
        title: 'E-commerce',
        rules: require('url:./aliases-ecommerce/rules.raw'),
        data: require('url:./aliases-ecommerce/input.raw'),
        aliases: require('url:./aliases-ecommerce/aliases.raw')
      }
    ]
  }
];
