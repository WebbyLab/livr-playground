'use strict';
require('./assets');

var React = window.React = require('react');
var App   = require('./App.jsx');
var $     = require('jquery');

$(document).ready(function() {
    var app = React.createElement(App);
    app = App();
    app = React.renderComponent(app, document.getElementById('content'));
});

