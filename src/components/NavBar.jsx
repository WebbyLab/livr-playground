/**
 * @jsx React.DOM
 */

 'use strict';

var React          = require('react');

var NavItem        = require('react-bootstrap/NavItem');
var Navbar         = require('react-bootstrap/Navbar');
var Nav            = require('react-bootstrap/Nav');
var DropdownButton = require('react-bootstrap/DropdownButton');
var MenuItem       = require('react-bootstrap/MenuItem');
var Label          = require('react-bootstrap/Label');

var presets = [{
    id: "Simple registration data",
    payload: require('../simple-registration-data.json')
}, {
    id: "Simple validation of nested object",
    payload: require('../nested-object.json')
}];

var NavBar2 = React.createClass({

    handlePresetClick(preset) {
        this.props.onPresetClick(preset);
    },

    makePresetsItems() {
        return presets.map( (preset) => <MenuItem key={preset.id}
                                                  onClick={this.handlePresetClick.bind(this, preset.payload)}>
                                                  {preset.id}
                                         </MenuItem>);
    },

    render() {
        return (
              <Navbar>
                <Nav>
                  <NavItem key={1}><Label bsStyle="success">LIVR PLAYGROUND</Label></NavItem>
                  <NavItem key={2} href="http://livr-spec.org/" target="_blank">livr-spec.org</NavItem>
                  <NavItem key={3} href="https://github.com/koorchik/LIVR" target="_blank">Github</NavItem>
                  <DropdownButton key={4} title="Presets">
                        {this.makePresetsItems()}
                  </DropdownButton>
                </Nav>
              </Navbar>
            );
        }

});

module.exports = NavBar2;