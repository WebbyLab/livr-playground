'use strict';

import React, { useState, useMemo, useEffect } from 'react';

import CodeEditor from './components/CodeEditor.jsx';
import Header from './components/Header.jsx';
import Result from './components/Result.jsx';
import Footer from './components/Footer.jsx';
import jsonUtils from './jsonUtils';
import { validate } from './validate';
import presets from './presets/';

const EMPTY_STATE = { rules: '{}', data: '{}', aliases: '[]' };

const assetsCache = {};
function getAsset(url) {
  if (!assetsCache[url]) {
    assetsCache[url] = fetch(url).then(response => response.text());
  }
  return assetsCache[url];
}

// The state lives in the URL hash, so a link restores the playground
function parseURL() {
  try {
    const decoded = decodeURIComponent(window.location.hash).replace(/^#/, '');
    if (!decoded) return EMPTY_STATE;
    const parsed = jsonUtils.parse(decoded);
    return {
      rules: parsed.rules || EMPTY_STATE.rules,
      data: parsed.data || EMPTY_STATE.data,
      aliases: parsed.aliases || EMPTY_STATE.aliases
    };
  } catch (e) {
    console.error(e);
    return EMPTY_STATE;
  }
}

function writeURL(state) {
  const saved = { rules: state.rules, data: state.data };
  if (state.aliases.trim() && state.aliases.trim() !== '[]') saved.aliases = state.aliases;
  window.history.replaceState(null, '', '#' + encodeURIComponent(JSON.stringify(saved)));
}

function countAliases(text) {
  try {
    const aliases = jsonUtils.parse(text);
    return Array.isArray(aliases) ? aliases.length : 0;
  } catch {
    return 0;
  }
}

function App() {
  const [state, setState] = useState(parseURL);
  const [presetId, setPresetId] = useState('');
  const [tab, setTab] = useState('rules');

  useEffect(function() {
    writeURL(state);
  }, [state]);

  // A link pasted into the address bar of an open playground
  useEffect(function() {
    function handleHashChange() {
      setState(parseURL());
      setPresetId('');
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const result = useMemo(function() {
    return validate(state.rules, state.data, state.aliases);
  }, [state]);

  function update(field) {
    return function(text) {
      setState(previous => ({ ...previous, [field]: text }));
    };
  }

  function handlePresetSelect(preset) {
    setPresetId(preset.id);
    Promise.all([
      getAsset(preset.rules),
      getAsset(preset.data),
      preset.aliases ? getAsset(preset.aliases) : Promise.resolve('[]')
    ]).then(function([rules, data, aliases]) {
      setState({ rules, data, aliases });
      setTab('rules');
    });
  }

  const aliasCount = countAliases(state.aliases);
  const errorIn = result.status === 'error' ? result.source : null;
  const errorLine = result.status === 'error' ? result.line : null;

  return (
    <div className="app">
      <Header presets={presets} presetId={presetId} onPresetSelect={handlePresetSelect} />

      <main className="workspace">
        <section className="pane pane-rules" aria-label="Rules and aliases">
          <div className="pane-head tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'rules'}
              className={'tab' + (errorIn === 'rules' ? ' tab--error' : '')} onClick={() => setTab('rules')}>
              Rules
            </button>
            <button type="button" role="tab" aria-selected={tab === 'aliases'}
              className={'tab' + (errorIn === 'aliases' ? ' tab--error' : '')} onClick={() => setTab('aliases')}>
              Aliases{aliasCount ? <span className="tab-count">{aliasCount}</span> : null}
            </button>
          </div>
          <div className="pane-body" role="tabpanel">
            {tab === 'rules'
              ? <CodeEditor key="rules" label="Rules" value={state.rules} onChange={update('rules')}
                errorLine={errorIn === 'rules' ? errorLine : null} />
              : <CodeEditor key="aliases" label="Aliases" value={state.aliases} onChange={update('aliases')}
                errorLine={errorIn === 'aliases' ? errorLine : null} />}
          </div>
        </section>

        <section className="pane pane-data" aria-label="Data">
          <div className={'pane-head' + (errorIn === 'data' ? ' pane-head--error' : '')}>
            <span className="pane-title">Data</span>
          </div>
          <div className="pane-body">
            <CodeEditor label="Data" value={state.data} onChange={update('data')}
              errorLine={errorIn === 'data' ? errorLine : null} />
          </div>
        </section>

        <Result result={result} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
