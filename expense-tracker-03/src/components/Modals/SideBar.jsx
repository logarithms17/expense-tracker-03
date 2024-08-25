import React from "react";
import DropdownButton from "../Buttons/DropdownButton";
import UseToggle from "../../Hook/UseToggle";
import UserSetsModal from "./UserSetsModal";

import { NavLink } from "react-router-dom";

const SideBar = ({ setShowSidebar }) => {
  const { showModal, toggleModal } = UseToggle();

  const handleCloseButton = () => {
    
    setShowSidebar(false);
  };

  return (
    <>
      <div className="absolute w-full h-screen bg-neutral-950 opacity-80 z-10 top-0 left-0 transition duration-100 lg:hidden"></div>
      {showModal && (
        <UserSetsModal title="Profile Settings" toggleModal={toggleModal} />
      )}
      {!showModal && (
        <aside className=" lg:hidden fixed bg-green-400 sm:w-[385px] h-full z-20 md:translate-x-full">
          <button
            className="absolute top-5 right-7 text-4xl"
            onClick={handleCloseButton}
          >
            <p className="text-black font-extrabold text-5xl">&times;</p>
          </button>
          <div className="absolute top-0 left-0 flex items-start px-6 py-5">
            <DropdownButton toggleModal={toggleModal} />
          </div>
          <div className="gap-2 flex flex-col items-center justify-center h-full">
            <NavLink to="/all-expense">
              <button className="dashboardSecondaryButton">All Expense</button>
            </NavLink>
            <NavLink to="/all-income">
              <button className="dashboardSecondaryButton bg-green-400 border-black text-black font-semibold hover:bg-green-500">
                All Income
              </button>
            </NavLink>
          </div>
        </aside>
      )}
    </>
  );
};

export default SideBar;
