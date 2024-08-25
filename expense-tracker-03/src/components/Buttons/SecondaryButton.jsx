import PropTypes from "prop-types";

const SecondaryButton = ({ title, styles, icon }) => {
  return (
    <button className={styles}>
      {icon}
      {title}
    </button>
  );
};

export default SecondaryButton;

SecondaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
