import React from 'react';
import PropTypes from 'prop-types';
import Styles from './icon.module.scss';

/**
 * Render Icon
 * @param {string} color
 * @param {string} className
 * @param {fun} onClick
 */

const Icon = ({color, className, onClick}) => {    
  return (
    <i
      className={`${Styles[color]} ${[className]}`}
      onClick={onClick}
    ></i>
  )
}

Icon.propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

Icon.defaultProps = {
    className: 'icon-Right-arrow',
    color: 'dark'
}

export default Icon