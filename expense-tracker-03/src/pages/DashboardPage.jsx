import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import MainHeader from "../components/Header/MainHeader";

import UseToggle from "../Hook/UseToggle";

const DashboardPage = () => {
  const { showModal, toggleModal } = UseToggle();

  return (
    <>
      <MainHeader toggleModal={toggleModal} />
      <Dashboard showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};

export default DashboardPage;
