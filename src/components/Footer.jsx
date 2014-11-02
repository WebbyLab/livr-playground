/**
 * @jsx React.DOM
 */

'use strict';

let React = require('react');

let Col = require('react-bootstrap/Col');
let Row = require('react-bootstrap/Row');

require('./Footer.less');

let Footer = React.createClass({
    render() {
        return (
            <Row className='Footer'>
                <Col xs={12}>
                    <small>
                        Developed by <a href='http://webbylab.com' target='_blank'> WebbyLab </a>
                    </small>
                </Col>
            </Row>

        );
    }
});

module.exports = Footer;