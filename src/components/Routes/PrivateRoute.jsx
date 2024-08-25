import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Notify } from "notiflix";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const shouldRedirect = !isLoggedIn;

  if (shouldRedirect) {
    Notify.warning("You must be logged in to access this page");
  }

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  redirectTo: PropTypes.string,
};
