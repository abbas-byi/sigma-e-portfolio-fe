import React from 'react'
import PropTypes from 'prop-types'
import Styles from './input.module.scss'

/** Render Input
 * @returns node
 */

const Input = ({
  type,
  className,
  placeholder,
  defaultValue,
  value,
  id,
  inputName,
  onChange,
  autoComplete,
  reference,
  pattern,
  onKeyUp,
  onKeyDown,
  onKeyPress,
  readOnly,
  disabled,
  rows,
}) => {
  switch (type) {
    case "textarea":
      return (
        <textarea
          placeholder={placeholder}
          value={value}
          id={id}
          name={inputName}
          disabled={disabled}
          className={`${Styles.input} ${[className]}`}
          rows={rows}
          {...reference}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
        ></textarea>
      );

    default:
    return (
      <input 
        className={`${Styles.input} ${[className]}`}
        placeholder={placeholder} 
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        type={type} 
        defaultValue={defaultValue}
        value={value}
        name={inputName}
        {...reference}
        onChange={onChange}
        {...pattern}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        readOnly={readOnly}
      />
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  type:PropTypes.string,
  defaultValue: PropTypes.any, 
  value: PropTypes.any,
  id: PropTypes.string, 
  inputName: PropTypes.string,
  onChange:PropTypes.any,
  autoComplete:PropTypes.string,
  reference: PropTypes.any,
  pattern: PropTypes.string,
  onKeyUp: PropTypes.any,
  onKeyDown: PropTypes.any,
  onKeyPress: PropTypes.any,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
}

export default Input