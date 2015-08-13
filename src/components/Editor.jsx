'use strict';

import React from 'react';
import Input from 'react-bootstrap/lib/Input';

import './Editor.less';

const Editor = React.createClass({
    handleChange() {
        if (this.props.onChange) {
            this.props.onChange( this.refs.input.getValue() );
        }
    },

    render() {
        return (
           <Input type="textarea"
                  value={this.props.value}
                  label={this.props.label}
                  ref="input"
                  wrapperClassName="Editor wrapper-class"
                  labelClassName="label-class"
                  onChange={this.handleChange} />
        );
    }
});

export default Editor;
