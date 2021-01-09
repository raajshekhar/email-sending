import PropTypes from 'prop-types';
import InputField from './types/InputField';
import { closeIcon, checkIcon } from './types/icons';

const InputValidationField = (props) => {

  const {
    name = '',
    type = 'text',
    id = '',
    value = '',
    onChange = () => {},
    onBlur = () => {},
    onKeyUp = () => {},
    placeholder = '',
    className = '',
    autoComplete = 'off',
    touched = false,
    placement = 'bottom',
    errorMsg = '',
    labelClass = props.type === 'checkbox' ? 'mb-0' : '',
    labelName = '',
    labelImp = false,
    options = [],
    maxLength = '200',
    rows='10',
    cols='10',
    onKeyPress = () => {},
    readOnly=false,
    restrictions = [],
    defaultChecked = false,
    icon = '',
    setFieldValue = () => {},
    setFieldTouched = () => {}
  } = props;

  const passToField = {
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
    options,
    maxLength,
    onKeyPress,
    rows,
    cols,
    readOnly,
    restrictions,
    defaultChecked,
    icon,
    setFieldValue,
    setFieldTouched
  };
  let showIcon = null;
  if (touched) {
    if (errorMsg) showIcon = closeIcon;
    else if(value) showIcon = checkIcon;
  }
  return InputField({ ...passToField, showIcon });
};

InputValidationField.propTypes = {
  defaultChecked: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
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
  labelImp: PropTypes.any,
  showIcon: PropTypes.any,
  maxLength: PropTypes.string,
};

export default InputValidationField;