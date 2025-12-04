'use strict';

import React, { useState, useCallback, useMemo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import Editor from './components/Editor.jsx';
import Output from './components/Output.jsx';
import HeadMenu from './components/HeadMenu.jsx';
import Footer from './components/Footer.jsx';

import LIVR from 'livr';
import extraRules from 'livr-extra-rules';
import jsonUtils from './jsonUtils';

import presets from './presets/';

LIVR.Validator.defaultAutoTrim(true);
LIVR.Validator.registerDefaultRules(extraRules);

const assetsCache = {};
function getAsset(url) {
  if (assetsCache[url]) return assetsCache[url];

  return fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      assetsCache[url] = text;
      return assetsCache[url];
    });
}

function parseURL() {
  try {
    let decoded = decodeURIComponent(window.location.hash);
    decoded = decoded.replace(/^#/, '');
    if (!decoded) {
      return { rules: '{}', data: '{}' };
    }
    return jsonUtils.parse(decoded);
  } catch (e) {
    console.error(e);
    return {
      rules: '{}',
      data: '{}'
    };
  }
}

function App() {
  const initialState = parseURL();
  const [rules, setRules] = useState(initialState.rules);
  const [data, setData] = useState(initialState.data);

  const updateURL = useCallback(function(newRules, newData) {
    window.location.hash = encodeURIComponent(JSON.stringify({
      rules: newRules,
      data: newData
    }));
  }, []);

  const handleRulesChange = useCallback(function(text) {
    setRules(text);
    updateURL(text, data);
  }, [data, updateURL]);

  const handleDataChange = useCallback(function(text) {
    setData(text);
    updateURL(rules, text);
  }, [rules, updateURL]);

  const handlePresetSelect = useCallback(function(preset) {
    Promise.all([
      getAsset(preset.rules),
      getAsset(preset.data)
    ]).then(function([newRules, newData]) {
      setRules(newRules);
      setData(newData);
      updateURL(newRules, newData);
    });
  }, [updateURL]);

  const validationResult = useMemo(function() {
    try {
      const parsedRules = jsonUtils.parse(rules);
      const parsedData = jsonUtils.parse(data);

      const validator = new LIVR.Validator(parsedRules);
      const result = validator.validate(parsedData);

      return {
        result,
        errors: validator.getErrors()
      };
    } catch (e) {
      return { errors: e.message || e };
    }
  }, [rules, data]);

  return (
    <Container className="py-3">
      <HeadMenu presets={presets} onPresetClick={handlePresetSelect} />

      <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
          <Editor
            label="LIVR Rules"
            value={rules}
            onChange={handleRulesChange}
          />
        </Col>

        <Col xs={12} md={6}>
          <Editor
            label="Data for validation"
            value={data}
            onChange={handleDataChange}
          />
        </Col>
      </Row>

      <Output value={validationResult} />

      <Footer />
    </Container>
  );
}

export default App;
