'use strict';

import React, { useMemo } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { version as livrVersion } from 'livr/package.json';
import { version as livrExtraRulesVersion } from 'livr-extra-rules/package.json';

function HeadMenu(props) {
  const { presets = [], onPresetClick } = props;

  const presetsItems = useMemo(function() {
    return presets.map(function(preset) {
      return (
        <NavDropdown.Item
          key={preset.id}
          onClick={function(event) {
            event.preventDefault();
            onPresetClick(preset.payload);
          }}
        >
          {preset.id}
        </NavDropdown.Item>
      );
    });
  }, [presets, onPresetClick]);

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand className="text-success fw-bold">LIVR PLAYGROUND</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Examples" id="examples-dropdown">
              {presetsItems}
            </NavDropdown>
            <Nav.Link href="http://livr-spec.org/" target="_blank" rel="noopener noreferrer">
              livr-spec.org
            </Nav.Link>
            <Nav.Link href="https://github.com/WebbyLab/livr-playground" target="_blank" rel="noopener noreferrer">
              github
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Text className="text-muted small">
              LIVR {livrVersion} | Extra Rules {livrExtraRulesVersion}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default React.memo(HeadMenu);
