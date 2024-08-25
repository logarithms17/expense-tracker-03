import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

const LogoutModal = () => {
  return (
    <>
      <div
        className={`fixed w-screen h-screen bg-stone-950 z-10 opacity-50 top-0 left-0 m-auto overflow-hidden`}
      ></div>
      <div
        className={`w-[500px] h-[266px] bg-neutral-900 opacity-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-3xl px-10 py-8 flex flex-col items-center justify-center gap-10`}
      >
        <p>Are you sure you want to log out?</p>
        <div className="flex gap-3">
          <PrimaryButton title="Logout" />
          <SecondaryButton title="Cancel" styles="logoutSecondaryButton" />
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
