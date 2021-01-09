import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';

const inputFieldLabel = ({id, labelClass = '', labelName, labelImp}) => (
    <Label htmlFor={id} className={labelClass}>
        <span dangerouslySetInnerHTML={{ __html: labelName }} />
        <sup className={`text-danger ${labelImp ? '' : 'd-none'}`}>*</sup>
    </Label>
);

inputFieldLabel.propTypes = {
    id: PropTypes.string.isRequired,
    labelClass: PropTypes.string.isRequired,
    labelName: PropTypes.string.isRequired,
    labelImp: PropTypes.any
}

export default React.memo(inputFieldLabel);