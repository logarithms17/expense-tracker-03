import PropTypes from "prop-types";
import { FiEdit2 } from "react-icons/fi";

const ButtonWithIcon = ({ title, icon, handleOpenModal, id, type }) => {
  return (
    <button className="tablePrimaryButton" onClick={handleOpenModal}>
      <FiEdit2 />
      <p className="lg:block sm:hidden">{title}</p>
    </button>
  );
};

export default ButtonWithIcon;

ButtonWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
