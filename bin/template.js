const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

const getAttrs = (style) => {
  const baseAttrs = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "size",
    height: "size",
    viewBox: "0 0 24 24",
  };
  const fillAttrs = {
    fill: "color",
    otherProps: "...otherProps",
  };
  const strokeAttrs = {
    fill: "none",
    stroke: "color",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    otherProps: "...otherProps",
  };
  return Object.assign(
    {},
    baseAttrs,
    style === "fill" ? fillAttrs : strokeAttrs
  );
};

const getElementCode = (iconName, attrs, svgCode) => {
  const ComponentName = nanoid(iconName);

  const code = `
  import React from 'react';
  import PropTypes from 'prop-types';

  const ${ComponentName} = (props) => {
    const { color, size, ...otherProps } = props;
    return (
      <svg ${attrs}>
        ${svgCode}
      </svg>
    )
  };

  ${ComponentName}.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }

  ${ComponentName}.defaultProps = {
    color: 'currentColor',
    size: '24',
  }

  export default ${ComponentName}
`;

  return code;
};

module.exports = { getAttrs, getElementCode };
