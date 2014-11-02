/**
 * @jsx React.DOM
 */
'use strict';

let React = require('react/addons');
let cx    = React.addons.classSet;

let Well  = require('react-bootstrap/Well');

require('./Output.less');

let stringifyJSON = data => JSON.stringify(data, null, '    ');

let Output = React.createClass({

    render() {
        let output = this.props.value;

        let outputClasses = cx({
            "Output": true,
            valid: output.result,
            error: output.errors
        });

        return (
            <Well className={outputClasses}>
                <pre>
                    { stringifyJSON(output.result ? output.result : output.errors) }
                </pre>
            </Well>
        );
    }

});

module.exports = Output;