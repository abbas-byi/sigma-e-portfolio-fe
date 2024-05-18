import React from "react";
import PropTypes from "prop-types";

/**
 * Render Image Tag
 * @param {isRequired} src
 * @param {string} className
 * @param {fun} onClick
 * @param {string} alt
 * @returns node
 */
const Image = ({ className, src, alt, onClick }) => {
  return <img className={className} src={src} alt={alt} draggable="false" onClick={onClick} />;
};

Image.defaultProps = {
  alt: "Image",
};
Image.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  alt: PropTypes.string.isRequired,
};

export default Image;