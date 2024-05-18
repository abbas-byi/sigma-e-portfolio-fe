import React from 'react';
import PropTypes from 'prop-types';
import Styles from './link.module.scss';

/**
 * Render Link
 * @param {string} href
 * @param {string} className
 * @param {fun} onClick
 * @param {fun} children
 */

const Link = ({href, className, onClick, children}) => {    
  return (
    <a href={href} className={`${Styles.link} ${[className]}`} onClick={onClick}>{children}</a>
  )
}

Link.propTypes = {
    href: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.any,
};

Link.defaultProps = {
  href: '#'
}

export default Link