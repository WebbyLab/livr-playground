'use strict';
import './styles.less';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('content')).render(<App />);
