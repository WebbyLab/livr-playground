/**
 * @jsx React.DOM
 */

'use strict';

let React  = require('react');

let Row    = require('react-bootstrap/Row');
let Col    = require('react-bootstrap/Col');

let Editor   = require('./components/Editor.jsx');
let Output   = require('./components/Output.jsx');
let HeadMenu = require('./components/HeadMenu.jsx');

require('./App.less');

let LIVR = require('livr');
LIVR.Validator.defaultAutoTrim(true);

let presets = require('./presets/');

let App = React.createClass({
    getInitialState() {
        let url = window.location.hash.slice(1, window.location.hash.length);

        let rules;
        let data;
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
            let validator = new LIVR.Validator(rules);
            let result = validator.validate(data);

            return {
                result: result,
                errors : validator.getErrors()
            };
        } catch(e) {
            return { errors: e.message || e};
        }
    },

    handleIEditorChange({data, rules}) {
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

    handlePresetSelect(preset) {
        this.handleIEditorChange({
            rules: JSON.stringify(preset.rules, null, '   '),
            data: JSON.stringify(preset.data, null, '   '),
        });
    },

    render() {
        return <div className="App container">
            <HeadMenu presets={presets} onPresetClick={this.handlePresetSelect}/>

            <Row>
                <Col xs={6}>
                    <Editor label='LIVR Rules'
                            value={this.state.rules}
                            type='rules'
                            onChange={this.handleIEditorChange} />
                </Col>
                 <Col xs={6}>
                    <Editor label='LIVR Rules'
                            value={this.state.data}
                            type='data'
                            onChange={this.handleIEditorChange} />
                </Col>
            </Row>

            <Output value={this.state.output}/>
        </div>;
    }
});

module.exports = App;
