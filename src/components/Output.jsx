'use strict';

import React from 'react';
import { Alert } from 'react-bootstrap';
import jsonUtils from '../jsonUtils';

function Output(props) {
  const output = props.value;
  const isValid = output.result && !output.errors;
  const variant = isValid ? 'success' : 'danger';

  return (
    <Alert variant={variant} className="mt-4">
      <pre className="mb-0 font-monospace" style={{ whiteSpace: 'pre-wrap' }}>
        {jsonUtils.stringify(isValid ? output.result : output.errors)}
      </pre>
    </Alert>
  );
}

export default Output;
