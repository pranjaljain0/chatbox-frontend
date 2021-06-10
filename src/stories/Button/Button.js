import './button.scss';

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, onClick, disabled }) => {
  return (
    <input
      type="button"
      value={label}
      className={disabled ? "inputButton disabled" : "inputButton"}
      onClick={onClick} />
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  label: "Button",
  onClick: undefined,
  disabled: false,
};
