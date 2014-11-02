/**
 * @jsx React.DOM
 */

'use strict';

let React          = require('react');

let NavItem        = require('react-bootstrap/NavItem');
let Navbar         = require('react-bootstrap/Navbar');
let Nav            = require('react-bootstrap/Nav');
let DropdownButton = require('react-bootstrap/DropdownButton');
let MenuItem       = require('react-bootstrap/MenuItem');

require('./HeadMenu.less');

let HeadMenu = React.createClass({
    getDefaultProps() {
        return {
            presets: []
        };
    },

    handlePresetClick(preset) {
        this.props.onPresetClick(preset);
    },

    renderPresetsItems() {
        return this.props.presets.map( preset =>
            <MenuItem key={preset.id} onClick={this.handlePresetClick.bind(this, preset.payload)}>
                {preset.id}
            </MenuItem>
        );
    },

    render() {
        return (
              <Navbar className='HeadMenu'>
                <Nav>
                  <NavItem key={1} className='sitename'> LIVR PLAYGROUND</NavItem>

                  <DropdownButton key={4} title="Examples">
                        {this.renderPresetsItems()}
                  </DropdownButton>

                  <NavItem key={2} href="http://livr-spec.org/" target="_blank">livr-spec.org</NavItem>
                </Nav>
              </Navbar>
            );
        }

});

module.exports = HeadMenu;