'use strict';

import React from 'react';
import { version as extraRulesVersion } from 'livr-extra-rules/package.json';
import { extraRuleNames } from '../validate';

function Footer() {
  return (
    <footer className="footer">
      <p>
        Validation runs in your browser with every rule of LIVR 2.0 and 2.5, plus{' '}
        <a href="https://github.com/koorchik/js-livr-extra-rules">livr-extra-rules</a> {extraRulesVersion}:{' '}
        {extraRuleNames.map((name, index) => (
          <React.Fragment key={name}>{index ? ', ' : ''}<code>{name}</code></React.Fragment>
        ))}. Keys may be unquoted, strings single-quoted. The link always holds what you typed.
      </p>
      <p>
        Made by <a href="https://webbylab.com">WebbyLab</a>
      </p>
    </footer>
  );
}

export default Footer;
