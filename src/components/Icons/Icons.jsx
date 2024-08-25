import PropTypes from "prop-types";

const Icons = ({ icon, handleDeleteCategory, id }) => {
  return (
    <button onClick={() => handleDeleteCategory(id)}>
      <img src={icon} alt="" />
    </button>
  );
};

export default Icons;

Icons.propTypes = {
  icon: PropTypes.string.isRequired,
};
