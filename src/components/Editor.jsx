'use strict';

import React from 'react';
import { Form } from 'react-bootstrap';

function Editor(props) {
  function handleChange(event) {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">{props.label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={props.rows || 12}
        value={props.value}
        onChange={handleChange}
        className="font-monospace"
        style={{ resize: 'none' }}
        placeholder={props.placeholder}
      />
    </Form.Group>
  );
}

export default Editor;
