'use strict';

import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function HeadMenu(props) {
  const { presets = [], onPresetClick } = props;

  function handlePresetClick(preset, event) {
    event.preventDefault();
    onPresetClick(preset);
  }

  function renderPresetsItems() {
    return presets.map(function(preset) {
      return (
        <NavDropdown.Item
          key={preset.id}
          onClick={function(event) {
            handlePresetClick(preset.payload, event);
          }}
        >
          {preset.id}
        </NavDropdown.Item>
      );
    });
  }

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand className="text-success fw-bold">LIVR PLAYGROUND</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Examples" id="examples-dropdown">
              {renderPresetsItems()}
            </NavDropdown>
            <Nav.Link href="http://livr-spec.org/" target="_blank" rel="noopener noreferrer">
              livr-spec.org
            </Nav.Link>
            <Nav.Link href="https://github.com/WebbyLab/livr-playground" target="_blank" rel="noopener noreferrer">
              github
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeadMenu;
