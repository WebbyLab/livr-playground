'use strict';

import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import './Footer.less';

const Footer = React.createClass({
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

export default Footer;
