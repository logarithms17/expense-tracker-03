import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SettingsButton = ({ title, handleRemoveAvatar }) => {
  // Extract avatarUrl from Redux state
  const avatarUrl = useSelector((state) => state.auth.user.avatarUrl);

  // Handle button click
  const handleClick = () => {
    if (avatarUrl) {
      handleRemoveAvatar(avatarUrl);
    } else {
      console.error("No avatar URL available to remove.");
    }
  };

  return (
    <button
      className="bg-neutral-800 py-2 px-5 rounded-3xl"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

SettingsButton.propTypes = {
  title: PropTypes.string.isRequired,
  handleRemoveAvatar: PropTypes.func.isRequired,
};

export default SettingsButton;
