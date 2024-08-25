import React from "react";
import PropTypes from "prop-types";

const CloseButton = ({ toggleModal }) => {
  return (
    <button className="absolute top-5 right-7 text-4xl" onClick={toggleModal}>
      &times;
    </button>
  );
};

export default CloseButton;

CloseButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
