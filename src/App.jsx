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
      return { rules: '{}', data: '{}', aliases: '[]' };
    }
    const parsed = jsonUtils.parse(decoded);
    return {
      rules: parsed.rules || '{}',
      data: parsed.data || '{}',
      aliases: parsed.aliases || '[]'
    };
  } catch (e) {
    console.error(e);
    return {
      rules: '{}',
      data: '{}',
      aliases: '[]'
    };
  }
}

function App() {
  const initialState = parseURL();
  const [rules, setRules] = useState(initialState.rules);
  const [data, setData] = useState(initialState.data);
  const [aliases, setAliases] = useState(initialState.aliases);

  const updateURL = useCallback(function(newRules, newData, newAliases) {
    const state = { rules: newRules, data: newData };
    if (newAliases && newAliases !== '[]') {
      state.aliases = newAliases;
    }
    window.location.hash = encodeURIComponent(JSON.stringify(state));
  }, []);

  const handleAliasesChange = useCallback(function(text) {
    setAliases(text);
    updateURL(rules, data, text);
  }, [rules, data, updateURL]);

  const handleRulesChange = useCallback(function(text) {
    setRules(text);
    updateURL(text, data, aliases);
  }, [data, aliases, updateURL]);

  const handleDataChange = useCallback(function(text) {
    setData(text);
    updateURL(rules, text, aliases);
  }, [rules, aliases, updateURL]);

  const handlePresetSelect = useCallback(function(preset) {
    const aliasesPromise = preset.aliases
      ? getAsset(preset.aliases)
      : Promise.resolve('[]');

    Promise.all([
      getAsset(preset.rules),
      getAsset(preset.data),
      aliasesPromise
    ]).then(function([newRules, newData, newAliases]) {
      setRules(newRules);
      setData(newData);
      setAliases(newAliases);
      updateURL(newRules, newData, newAliases);
    });
  }, [updateURL]);

  const validationResult = useMemo(function() {
    try {
      const parsedAliases = jsonUtils.parse(aliases);
      const parsedRules = jsonUtils.parse(rules);
      const parsedData = jsonUtils.parse(data);

      const validator = new LIVR.Validator(parsedRules);

      if (Array.isArray(parsedAliases) && parsedAliases.length > 0) {
        parsedAliases.forEach(function(alias) {
          validator.registerAliasedRule(alias);
        });
      }

      const result = validator.validate(parsedData);

      return {
        result,
        errors: validator.getErrors()
      };
    } catch (e) {
      return { errors: e.message || e };
    }
  }, [aliases, rules, data]);

  return (
    <Container className="py-3">
      <HeadMenu presets={presets} onPresetClick={handlePresetSelect} />

      <Row className="g-3 mb-3">
        <Col xs={12} md={6}>
          <Editor
            label="LIVR Rules"
            value={rules}
            onChange={handleRulesChange}
            rows={8}
          />
        </Col>

        <Col xs={12} md={6}>
          <Editor
            label="Aliases (optional)"
            value={aliases}
            onChange={handleAliasesChange}
            rows={8}
            placeholder="[]"
          />
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col xs={12} md={6}>
          <Editor
            label="Data for validation"
            value={data}
            onChange={handleDataChange}
            rows={10}
          />
        </Col>

        <Col xs={12} md={6}>
          <Output label="Result" value={validationResult} />
        </Col>
      </Row>

      <Footer />
    </Container>
  );
}

export default App;
