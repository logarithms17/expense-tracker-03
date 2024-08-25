import PropTypes from "prop-types";

const UserImage = ({ user, alt, z }) => {
  return (
    <div className={`relative w-12 h-12 rounded-full overflow-hidden ${z}`}>
      <img
        src={user}
        alt={alt}
        className="absolute w-full h-full object-cover"
      />
    </div>
  );
};

export default UserImage;

UserImage.propTypes = {
  user: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  z: PropTypes.string.isRequired,
};
