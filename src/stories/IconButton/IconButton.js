import "./IconButton.scss";

import { FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";
import React from "react";

export const IconButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className={disabled ? "IconButton disabled" : "IconButton"}
      onClick={onClick}
    >
      <FaChevronRight />
    </button>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  onClick: undefined,
  disabled: false,
};
