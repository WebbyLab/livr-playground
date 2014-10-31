/**
 * @jsx React.DOM
 */

'use strict';

var React      = require('react');
var Input      = require('./components/Input.jsx');
var Output     = require('./components/Output.jsx');
var Navbar     = require('./components/NavBar.jsx');
var LIVR       = require('livr');
require('./App.less');

LIVR.Validator.defaultAutoTrim(true);

var App = React.createClass({

    getInitialState() {
        var url = window.location.hash.slice(1, window.location.hash.length);
        var rules;
        var data;
        url.replace(/"rules":(\{.*?\}).*"data":(\{.*?\})/, (subsrt, group1, group2) => {
            rules = group1;
            data = group2;
        });

        return {
            output: this.validate({
                rules: rules,
                data: data
            }),
            rules: rules,
            data: data
        };
    },

    validate({rules, data}) {
        try {
            rules = JSON.parse(rules);
            data = JSON.parse(data);
            var validator = new LIVR.Validator(rules);
            var result = validator.validate(data);

            return {
                result: result,
                errors : validator.getErrors()
            };
        } catch(e) {
            return { errors: e.message || e};
        }
    },

    handleInputsChange({data, rules}) {
        try {
            rules = rules || this.state.rules;
            data = data || this.state.data;
            this.setState({
                data: data,
                rules: rules,
                output: this.validate({rules, data})
            });
            window.location.hash = JSON.stringify({
                rules: JSON.parse(rules),
                data: JSON.parse(data)
            });
        } catch(e) {
            this.setState({
                data: data,
                output: {
                    errors: e.message
                }
            });
        }
    },

    handlePresetClick(preset) {
        this.handleInputsChange({
            rules: JSON.stringify(preset.rules),
            data: JSON.stringify(preset.data),
        });
    },

    render() {
        return <div className="App">
            <Navbar onPresetClick={this.handlePresetClick}/>
            <Input value={this.state.rules} label="Rules" type="rules" onChange={this.handleInputsChange}/>
            <Input value={this.state.data} label="Input data" type="data" onChange={this.handleInputsChange}/>
            <Output value={this.state.output}/>
        </div>;
    }
});

module.exports = App;
