'use strict';
import './assets';

import React from 'react';
import App   from './App.jsx';

window.React = React;

React.render( React.createElement(App), document.getElementById('content') );
