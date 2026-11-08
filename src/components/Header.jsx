'use strict';

import React, { useState } from 'react';
import { version as livrVersion } from 'livr/package.json';

function Logo() {
  return (
    <svg className="logo" viewBox="0 0 40 32" aria-hidden="true">
      <path d="M11 3c-3 0-4 1.5-4 4v5c0 2-1 3-3.5 4C6 17 7 18 7 20v5c0 2.5 1 4 4 4"
        fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M29 3c3 0 4 1.5 4 4v5c0 2 1 3 3.5 4-2.5 1-3.5 2-3.5 4v5c0 2.5-1 4-4 4"
        fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path className="logo-check" d="M13.5 16.5l4.5 4.5 8.5-10" fill="none" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Header(props) {
  const { presets, presetId, onPresetSelect } = props;
  const [copied, setCopied] = useState(false);

  function handlePresetChange(event) {
    const id = event.target.value;
    for (const group of presets) {
      const preset = group.items.find(item => item.id === id);
      if (preset) onPresetSelect(preset);
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(function() {
      setCopied(true);
      setTimeout(function() {
        setCopied(false);
      }, 2000);
    });
  }

  return (
    <header className="header">
      <a className="brand" href="https://livr-spec.org/" title="LIVR specification">
        <Logo />
        <span className="brand-name">LIVR <span className="brand-tool">Playground</span></span>
      </a>

      <div className="toolbar">
        <label className="example-picker">
          <span className="visually-hidden">Example</span>
          <select value={presetId} onChange={handlePresetChange}>
            <option value="" disabled>Load an example…</option>
            {presets.map(group => (
              <optgroup key={group.group} label={group.group}>
                {group.items.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
        <button type="button" className="button" onClick={handleCopyLink} aria-live="polite">
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>

      <nav className="links" aria-label="LIVR links">
        <a href="https://livr-spec.org/validation-rules.html">Rules</a>
        <a href="https://github.com/koorchik/LIVR/blob/master/drafts/v2.5.md">Spec</a>
        <a href="https://github.com/WebbyLab/livr-playground">GitHub</a>
        <span className="version" title="The JavaScript reference implementation that runs here">
          livr {livrVersion}
        </span>
      </nav>
    </header>
  );
}

export default Header;
