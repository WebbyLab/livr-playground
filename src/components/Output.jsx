/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var Well = require('react-bootstrap').Well;
var cx = require('react-classset');

require('./Output.less');

var Output = React.createClass({

    render() {
        var output = this.props.value;

        var outputClasses = cx({
            "Output": true,
            "col-md-12": true,
            valid: output.result,
            error: output.errors
        });
        return (
            <Well className={outputClasses}>{output.result ? JSON.stringify(output.result) : JSON.stringify(output.errors)}</Well>
        );
    }

});

module.exports = Output;