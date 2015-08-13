'use strict';

import React from 'react/addons';
const cx    = React.addons.classSet;

import Well  from 'react-bootstrap/lib/Well';
import jsonUtils from '../jsonUtils';

import './Output.less';


const Output = React.createClass({
    render() {
        const output = this.props.value;

        const outputClasses = cx({
            Output: true,
            valid: output.result,
            error: output.errors
        });

        return (
            <Well className={outputClasses}>
                <pre>
                    { jsonUtils.stringify(output.result ? output.result : output.errors) }
                </pre>
            </Well>
        );
    }

});

export default Output;
