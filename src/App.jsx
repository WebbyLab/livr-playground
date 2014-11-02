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
let Footer   = require('./components/Footer.jsx');

let LIVR = require('livr');
let jsonUtils =  require('./jsonUtils');

require('./App.less');

let presets = require('./presets/');
LIVR.Validator.defaultAutoTrim(true);

let App = React.createClass({
    getInitialState() {
        let parsed = this.parseURL();

        return {
            rules: parsed.rules,
            data: parsed.data
        };
    },

    validate() {
        try {
            let rules = jsonUtils.parse(this.state.rules);
            let data = jsonUtils.parse(this.state.data);

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

    handleIEditorChange(type, text) {
        this.state[type] = text;
        this.setState(this.state);

        this.updateURL();
    },

    handlePresetSelect(preset) {
        this.setState({
            rules: preset.rules,
            data: preset.data,
        });

        this.updateURL();
    },

    updateURL() {
        window.location.hash = encodeURIComponent(JSON.stringify({
            rules: this.state.rules,
            data: this.state.data
        }));
    },

    parseURL() {
        try {
            let decoded = decodeURIComponent(window.location.hash);
            decoded = decoded.replace(/^#/, '');
            return jsonUtils.parse( decoded );
        } catch(e) {
            console.error(e);
            return {
                rules: '{}',
                data: '{}'
            };
        }
    },

    render() {
        return <div className="App container">
            <HeadMenu presets={presets} onPresetClick={this.handlePresetSelect}/>

            <Row>
                <Col xs={6}>
                    <Editor label='LIVR Rules'
                            value={this.state.rules}
                            onChange={this.handleIEditorChange.bind(this, 'rules')} />
                </Col>

                 <Col xs={6}>
                    <Editor label='Data for validation'
                            value={this.state.data}
                            type='data'
                            onChange={this.handleIEditorChange.bind(this, 'data')} />
                </Col>
            </Row>

            <Output value={ this.validate() }/>

            <Footer />
        </div>;
    }
});

module.exports = App;
