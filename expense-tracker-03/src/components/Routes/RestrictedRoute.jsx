import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const RestrictedRoute = ({
  component: Component,
  redirectedTo = "/dashboard",
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Navigate to={redirectedTo} /> : <Component />;
};

RestrictedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectedTo: PropTypes.string,
};

export default RestrictedRoute;
