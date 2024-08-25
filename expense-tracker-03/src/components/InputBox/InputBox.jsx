import React from "react";
import PropTypes from "prop-types";

const InputBox = ({
  type,
  placeholder,
  title,
  backgroundColor,
  name,
  textColor,
}) => {
  return (
    <label htmlFor={name} className="flex-1">
      <p className={title === "" ? "pb-0" : "pb-3"}>{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        className={`${backgroundColor} border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 ${textColor} w-full custom-input-icon`}
        name={name}
        id={name}
      />
    </label>
  );
};

export default InputBox;

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};
