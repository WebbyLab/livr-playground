'use strict';
import './assets';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const container = document.getElementById('content');
const root = createRoot(container);
root.render(<App />);
