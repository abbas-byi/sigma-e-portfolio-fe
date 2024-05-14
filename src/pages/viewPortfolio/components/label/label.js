import React from 'react';
import PropTypes from 'prop-types'

/**
 * Name: Text
 * Desc: Render text
 * @param {node} children
 * @param {string} htmlFor
 * @param {string} className
 */

const Label = ({
    children,
    htmlFor,
    className,
    }) => {
    
    return (
        <label htmlFor={htmlFor} className={className}>{children}</label>
    )
}

Label.propTypes = {
    children: PropTypes.node,
    htmlFor: PropTypes.string,
    className: PropTypes.string,
  }
export default Label