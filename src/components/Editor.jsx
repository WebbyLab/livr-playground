/**
 * @jsx React.DOM
 */

'use strict';

let React = require('react');
let Input = require('react-bootstrap/Input');
require('./Editor.less');

let Editor = React.createClass({
    handleChange() {
        let value = this.refs.input.getValue();

        this.setState({
            value: this.refs.input.getValue()
        });

        if (this.props.onChange) {
            this.props.onChange({
                [this.props.type]: value
            });
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

module.exports = Editor;