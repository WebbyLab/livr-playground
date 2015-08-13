'use strict';

import React          from 'react';

import NavItem        from 'react-bootstrap/lib/NavItem';
import Navbar         from 'react-bootstrap/lib/Navbar';
import Nav            from 'react-bootstrap/lib/Nav';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem       from 'react-bootstrap/lib/MenuItem';

import './HeadMenu.less';

const HeadMenu = React.createClass({
    getDefaultProps() {
        return {
            presets: []
        };
    },

    handlePresetClick(preset, event) {
        this.props.onPresetClick(preset);
        event.preventDefault();
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
                    <NavItem key={1} className='sitename'>
                        LIVR PLAYGROUND
                    </NavItem>

                    <DropdownButton key={4} title="Examples">
                        {this.renderPresetsItems()}
                    </DropdownButton>

                    <NavItem key={2} href="http://livr-spec.org/" target="_blank">
                        livr-spec.org
                    </NavItem>

                    <NavItem key={5} href="https://github.com/WebbyLab/livr-playground" target="_blank">
                        github
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
});

export default HeadMenu;
