import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import InputFieldLabel from './input-label';
import InputFieldPopover from './pop-over';
import { dynamicIcon } from './icons';
import { customOnKeyPress } from '../../../assests/js/commonFunctions';

const InputField = (props) => {
   const {
        name,
        type,
        id,
        value,
        onChange,
        onBlur,
        onKeyUp,
        placeholder,
        className,
        autoComplete,
        touched,
        placement,
        errorMsg,
        labelClass,
        labelName,
        labelImp,
        showIcon,
        maxLength,
        onKeyPress,
        rows,
        cols,
        readOnly,
        restrictions,
        defaultChecked,
        icon = ''
      } = props
    let inputFields = {
      name,
      type,
      id,
      value,
      onKeyPress,
      onBlur,
      className,
      onKeyUp,
      placeholder,
      autoComplete,
      maxLength,
      rows,
      cols,
      readOnly,
      defaultChecked
    };

    const popoverData = {
      isOpen: touched && errorMsg.length > 0,
      placement,
      target: id,
      flip: false,
      errorMsg
    };

    const inputDesign = [{type: 'checkbox', class: 'input-checkbox-check'}, {type: 'radio', class: 'input-radio-check'}].find(data => data.type === type);
    const labelData = { id, labelClass: `${labelClass} ${type !== 'checkbox' ? '' : 'ml-4'}`, labelName, labelImp };

    return (
      <div className={`custom-input-validation custom-${type}-field`}>

        {(labelName && type !== 'checkbox') && <InputFieldLabel {...labelData} /> }

        <div className={`position-relative d-flex ${icon ? 'has-icon': ''} ${(errorMsg && touched) ? 'has-error': ''}`}>
            {(type==='checkbox') && <InputFieldLabel {...labelData} />}
            <Input {...inputFields} onChange={onChange} onKeyPress={(e)=>{customOnKeyPress(e, restrictions, onKeyPress)}}  />
            {showIcon}
            { icon ? dynamicIcon({icon, id}) : null }
            {inputDesign ? <div className={inputDesign.class} /> : null }
        </div>

        {errorMsg && touched && <InputFieldPopover {...popoverData} />}

      </div>
    );
  };

  InputField.propTypes = {
    name: PropTypes.string,
    defaultChecked: PropTypes.bool,
    restrictions: PropTypes.array,
    readOnly: PropTypes.bool,
    rows: PropTypes.string,
    cols: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
    touched: PropTypes.bool,
    errorMsg: PropTypes.string,
    placement: PropTypes.string,
    labelClass: PropTypes.string,
    labelName: PropTypes.string,
    labelImp: PropTypes.string,
    showIcon: PropTypes.any,
    maxLength: PropTypes.string,
    icon: PropTypes.oneOf([PropTypes.string, PropTypes.any])
};

export default InputField;