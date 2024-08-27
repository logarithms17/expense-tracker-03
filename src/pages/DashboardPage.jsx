import Dashboard from "../components/Dashboard/Dashboard";
import MainHeader from "../components/Header/MainHeader";

import UseToggle from "../Hook/UseToggle";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "../redux/authOperations";

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  const { showModal, toggleModal } = UseToggle();

  return (
    <>
      <MainHeader toggleModal={toggleModal} />
      <Dashboard showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default DashboardPage;
