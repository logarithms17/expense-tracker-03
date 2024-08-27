import React from "react";
import InitialHeader from "../components/Header/Logo";
import Home from "../components/Home/Home";

import { useDispatch } from "react-redux";

const HomePage = () => {
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
      <Home />
    </>
  );
};

export default HomePage;
