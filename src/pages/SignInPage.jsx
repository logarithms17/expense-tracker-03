import InitialHeader from "../components/Header/Logo";
import SignIn from "../components/SignIn/SignIn";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/authOperations";

const SignInPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  return (
    <>
      <InitialHeader />
      <SignIn />
    </>
  );
};

export default SignInPage;
