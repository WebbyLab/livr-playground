'use strict';

import React from 'react';
import CodeEditor from './CodeEditor.jsx';
import jsonUtils from '../jsonUtils';

const SOURCE_NAMES = { rules: 'Rules', aliases: 'Aliases', data: 'Data' };

function Verdict({ result }) {
  if (result.status === 'valid') {
    return (
      <>
        <span className="verdict-title">Valid</span>
        <span className="verdict-note">Output after the rules ran</span>
      </>
    );
  }
  if (result.status === 'invalid') {
    return (
      <>
        <span className="verdict-title">{result.count === 1 ? '1 error' : `${result.count} errors`}</span>
        <span className="verdict-note">Error codes by field</span>
      </>
    );
  }
  const where = result.line ? `, line ${result.line}` : '';
  return (
    <>
      <span className="verdict-title">Can’t run</span>
      <span className="verdict-note">Fix the {SOURCE_NAMES[result.source].toLowerCase()}{where}</span>
    </>
  );
}

function Result({ result }) {
  let body;
  if (result.status === 'error') {
    body = (
      <div className="result-message" role="alert">
        <strong>{SOURCE_NAMES[result.source]}{result.line ? `, line ${result.line}` : ''}:</strong> {result.message}
      </div>
    );
  } else {
    const json = jsonUtils.stringify(result.status === 'valid' ? result.output : result.errors);
    body = <CodeEditor value={json} readOnly label="Result" />;
  }

  return (
    <section className={`pane result result--${result.status}`} aria-label="Result">
      <div className="pane-head verdict" aria-live="polite">
        <span className="verdict-mark" aria-hidden="true" />
        <Verdict result={result} />
      </div>
      <div className="pane-body">{body}</div>
    </section>
  );
}

export default Result;
