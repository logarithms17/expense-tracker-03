import InitialHeader from "../components/Header/Logo";
import SignUp from "../components/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/authOperations";

const SignUpPage = () => {
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
      <SignUp />
    </>
  );
};

export default SignUpPage;
