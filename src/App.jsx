'use strict';

import React    from 'react';

import Row      from 'react-bootstrap/lib/Row';
import Col      from 'react-bootstrap/lib/Col';

import Editor   from './components/Editor.jsx';
import Output   from './components/Output.jsx';
import HeadMenu from './components/HeadMenu.jsx';
import Footer   from './components/Footer.jsx';

import LIVR      from 'livr';
import jsonUtils from './jsonUtils';

import './App.less';
import presets from './presets/';

LIVR.Validator.defaultAutoTrim(true);

const App = React.createClass({
    getInitialState() {
        const parsed = this.parseURL();

        return {
            rules: parsed.rules,
            data: parsed.data
        };
    },

    validate() {
        try {
            const rules = jsonUtils.parse(this.state.rules);
            const data = jsonUtils.parse(this.state.data);

            const validator = new LIVR.Validator(rules);
            const result = validator.validate(data);

            return {
                result,
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
            data: preset.data
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

export default App;
