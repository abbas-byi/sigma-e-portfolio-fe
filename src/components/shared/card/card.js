import React from 'react'
import PropTypes from 'prop-types'
import Styles from './card.module.scss'

/** Render Card
 * @param {any} children
 * @returns node
 */

const Card = ({
  children,
  className,
  onClick,
}) => {
  return (
    <div className={`${Styles.card} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.any,
  children: PropTypes.any,
  onClick: PropTypes.func,
}

export default Card