/**
 * @jsx React.DOM
 */

 'use strict';

var React = require('react');
var Input = require('react-bootstrap').Input;
require('./Input.less');

var Input2 = React.createClass({
    getInitialState() {
        return {
            value: this.props.value || ''
        };
    },

    handleChange() {
        var value = this.refs.input.getValue();
        this.setState({
            value: this.refs.input.getValue()
        });

        if (this.props.onChange) {
            var objToSend = {};
            objToSend[this.props.type] = value;
            this.props.onChange(objToSend);
        }
    },

    render() {
      return (
          <Input type="textarea"
            value={this.props.value}
            label={this.props.label}
            ref="input"
            groupClassName="group-class col-md-6"
            wrapperClassName="Input wrapper-class"
            labelClassName="label-class"
            onChange={this.handleChange} />
      );
    }
});

module.exports = Input2;