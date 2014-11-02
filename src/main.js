'use strict';
require('./assets');

var React = window.React = require('react');
var App   = require('./App.jsx');

React.renderComponent( App(), document.getElementById('content') );