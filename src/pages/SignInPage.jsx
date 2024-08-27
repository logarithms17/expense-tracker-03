import React from "react";
import InitialHeader from "../components/Header/Logo";
import SignIn from "../components/SignIn/SignIn";
import { useDispatch } from "react-redux";

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
