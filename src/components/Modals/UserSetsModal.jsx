import React, { useState } from "react";
import PropTypes from "prop-types";
import { Notify } from "notiflix";
import userIcon from "../../assets/ph_user-bold.svg";

import SettingsButton from "../Buttons/SettingsButton";

import CurrencyDropDown from "../InputBox/CurrencyDropDown";

import { useDispatch, useSelector } from "react-redux";
import {
  updateAvatar,
  updateUser,
  removeAvatar,
  refreshUser,
} from "../../redux/authOperations";
import CloseButton from "../Buttons/CloseButton";

const extractAvatarId = (avatarUrl) => {
  const regex = /\/avatar\/([^]+)\.webp$/;
  const match = avatarUrl.match(regex);
  if (!match) {
    console.error("Failed to extract avatarId from URL:", avatarUrl);
    return null;
  }
  return match[1];
};

const UserSetsModal = ({ title, toggleModal }) => {
  const userName = useSelector((state) => {
    return state.auth.user.name;
  });
  const userAvatar = useSelector((state) => {
    return state.auth.user.avatarUrl;
  });

  const [newName, setNewName] = useState(userName);
  const dispatch = useDispatch();

  const handleAvatarUpload = (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(updateAvatar(formData));
    dispatch(refreshUser());
  };

  // SUBMITS FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const currency = formData.get("currency");

    if (!name) {
      Notify.failure("Please fill in all the fields");
      return;
    }

    if (!currency) {
      Notify.failure("Please fill in all the fields");
      return;
    }

    dispatch(updateUser({ name, currency }));
    dispatch(updateAvatar(userAvatar));
    toggleModal();
  };

  const handleRemoveAvatar = (avatarUrl) => {
    const avatarId = extractAvatarId(avatarUrl);

    if (!avatarId) {
      console.error("Invalid avatarId. Cannot proceed with removal.");
      return;
    }

    dispatch(removeAvatar(avatarId))
      .unwrap()
      .then((data) => {})
      .catch((error) => {
        console.error("Failed to remove avatar:", error);
      });

    dispatch(updateAvatar(userIcon));
  };

  const handleOverlayClick = (e) => {
    // Check if the click was on the overlay, not on the modal
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      <div
        className="fixed w-screen h-screen bg-stone-950 z-50 opacity-80 top-0 left-0 m-auto overflow-hidden"
        onClick={handleOverlayClick}
      ></div>
      <div className="sm:w-[335px] md:w-[500px] h-[461px] bg-neutral-900 opacity-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-3xl md:px-10 sm:px-6 py-8">
        <CloseButton toggleModal={toggleModal} />
        <p className="text-2xl pt-3">{title}</p>
        <div className="flex flex-col items-center pt-10">
          <div className="h-[100px] w-[100px] bg-neutral-950 flex items-center justify-center rounded-full">
            <img
              src={userAvatar}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex gap-3 pt-7">
            <label
              htmlFor="avatarUpload"
              className="flex items-center bg-neutral-800 py-2 px-5 rounded-3xl"
              style={{ cursor: "pointer" }}
            >
              <p>Upload new photo</p>
              <input
                type="file"
                style={{ display: "none" }}
                name="avatar"
                className=""
                id="avatarUpload"
                onChange={(e) => {
                  return handleAvatarUpload(e.target.files[0]);
                }}
              />
            </label>
            <SettingsButton
              title="Remove"
              handleRemoveAvatar={handleRemoveAvatar}
            />
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 items-center w-full mt-4 gap-2 text-white">
              <div className="col-span-2 relative">
                <CurrencyDropDown
                  display="block"
                  border="border-2 border-neutral-500"
                  extraData="profileSettingsCurrencyBox"
                  textColor="text-white"
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="name" className="flex-1">
                  <input
                    type="name"
                    className={`bg-neutral-900 border-2 border-neutral-500 p-3 rounded-xl placeholder:text-neutral-500 text-white w-full`}
                    name="name"
                    id="name"
                    value={newName}
                    placeholder="Name"
                    required
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>
            <button className="w-full my-3 bg-green-400 text-black py-3 px-10 rounded-3xl font-medium hover:bg-green-300">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSetsModal;

UserSetsModal.propTypes = {
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
