import PropTypes from "prop-types";

const RadioInput = ({ title, name, id, value, handleRadioChange }) => {
  return (
    <label htmlFor={title} className="flex gap-2">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={handleRadioChange}
      />
      <p>{title}</p>
    </label>
  );
};

export default RadioInput;

RadioInput.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
};
