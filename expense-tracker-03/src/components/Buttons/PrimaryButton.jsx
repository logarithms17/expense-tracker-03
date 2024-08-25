import PropTypes from "prop-types";

const PrimaryButton = ({ title, icon }) => {
  return (
    <button className="bg-green-400 text-black py-3 px-10 rounded-3xl font-medium hover:bg-green-300">
      <img src={icon} alt="" />
      {title}
    </button>
  );
};

export default PrimaryButton;

PrimaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
