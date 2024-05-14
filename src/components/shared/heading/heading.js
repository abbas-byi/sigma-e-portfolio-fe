import React from 'react';
import PropTypes from 'prop-types';
import Styles from './heading.module.scss';

/**
 * Render Heading
 * @param {string} headingType
 * @param {string} headingText
 * @param {string} color
 * @param {string} strong
 * @param {string} className
 * @param {string} onClick

 */ 

const RenderHeading = ({onClick, headingType, headingText, color, strong, className}) => {
    const fontColor = color ? Styles[color] : '';
    const fontWeight = strong ? Styles[strong] : '';
    switch (headingType) {
        case 'h1': {
            return <h1  onClick={onClick} className={`${Styles[headingType]} ${[className]} ${fontColor} ${fontWeight} `}>{headingText}</h1>
        }
        case 'h2': {
            return <h2  onClick={onClick}  className={`${Styles[headingType]} ${[className]} ${fontColor} ${fontWeight}`}>{headingText}</h2>
        }
        case 'h3': {
            return <h3  onClick={onClick}  className={`${Styles[headingType]} ${[className]} ${fontColor} ${fontWeight}`}>{headingText}</h3>
        }
        case 'h4': {
            return <h4 onClick={onClick} className={`${Styles[headingType]} ${[className]} ${fontColor} ${fontWeight}`}>{headingText}</h4>
        }
        case 'h5': {
            return <h5 onClick={onClick}  className={`${Styles[headingType]} ${[className]} ${fontColor} ${fontWeight}`}>{headingText}</h5>
        }
        case 'h6': {
            return <h6 onClick={onClick}  className={`${Styles[headingType]} ${[className]} ${fontColor} ${fontWeight}`}>{headingText}</h6>
        }
        default: {
            return <h5 onClick={onClick}  className={`${Styles[headingType]} ${[className]} ${fontColor} ${fontWeight}`}>{headingText}</h5>
        }
    }
}

const Heading = (props) => {
    return (
        RenderHeading(props)
    )
}

Heading.defaultProps = {
    strong: 'semiBold',
    headingType: 'h2',
    color: 'dark'
}

Heading.propTypes = {
    headingType: PropTypes.string,
    headingText: PropTypes.any,
    className: PropTypes.any,
    strong: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Heading