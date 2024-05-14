import React from 'react'
import PropTypes from 'prop-types'
import Styles from './label.module.scss'

/** Render Label
 * @param {any} children
 * @returns node
 */

const Label = ({
  variant,
  size,
  type,
  children,
  className,
  forId,
  isDisabled
}) => {
  return (
    <label className={`${Styles.label} ${className}`} htmlFor={forId}>{children}</label>
  )
}

Label.propTypes = {
  className: PropTypes.any,
  children: PropTypes.any,
  forId: PropTypes.string,
}

export default Label