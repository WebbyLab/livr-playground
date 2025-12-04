'use strict';

import React from 'react';
import { Alert, Form } from 'react-bootstrap';
import jsonUtils from '../jsonUtils';

function Output(props) {
  const output = props.value;
  const isValid = output.result && !output.errors;
  const variant = isValid ? 'success' : 'danger';

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">{props.label || 'Result'}</Form.Label>
      <Alert variant={variant} className="mb-0" style={{ height: '252px', overflowY: 'auto' }}>
        <pre className="mb-0 font-monospace" style={{ whiteSpace: 'pre-wrap' }}>
          {jsonUtils.stringify(isValid ? output.result : output.errors)}
        </pre>
      </Alert>
    </Form.Group>
  );
}

export default Output;
