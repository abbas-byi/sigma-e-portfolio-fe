import React from 'react';
import PropTypes from 'prop-types'
import Styles from './text.module.scss';

/**
 * Name: Text
 * Desc: Render text
 * @param {node} children
 * @param {string} color
 * @param {isRequired} text
 * @param {string} strong
 * @param {bool}   lineThrough
 * @param {string} upperCase
 * @param {string} variant
 * @param {string} className
 * @param {func} onClick
 */

const Text = ({
    children,
    color,
    text,
    strong,
    lineThrough,
    upperCase,
    variant,
    className,
    onClick
    }) => {
    const finalText = children || text
    const fontColor = color ? Styles[color] : ''
    const fontWeight = strong ? Styles[strong] : ''
    const strikeThrough = lineThrough ? Styles[lineThrough] : ''
    const textTransform = upperCase ? Styles[upperCase] : ''

    return (
        <span className={`${Styles[variant]} ${fontColor} ${fontWeight} ${strikeThrough} ${textTransform} ${[className]}`} onClick={onClick}>
            {finalText}
        </span>
    )
}

Text.defaultProps = {
    variant: 'md',
    text: '',
    strong: 'regular',
    className: ''
}
  
Text.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element
    ]).isRequired,
    strong: PropTypes.string,
    lineThrough: PropTypes.bool,
    upperCase: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  }
export default Text