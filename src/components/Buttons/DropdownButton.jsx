import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FiUser, FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";

import { logOut } from "../../redux/authOperations";
import { Notify } from "notiflix";

import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export default function DropdownButton({ toggleModal }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user.name);
  const avatar = useSelector((state) => {
    return state.auth.user.avatarUrl;
  });

  const handleLogout = () => {
    dispatch(logOut());
    Notify.success("Goodbye!");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center w-full justify-center gap-x-1.5  bg-neutral-900 px-3 py-2 text-sm font-semibold text-neutral-500 shadow-sm ring-inset border-none hover:bg-slate-800 rounded-3xl">
          <img src={avatar} alt="" className="w-8 h-8 rounded-2xl mx-1" />
          {user}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-black shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in border-[1px] border-neutral-600 text-neutral-500"
      >
        <div className="">
          <MenuItem>
            <button
              className="flex items-center px-4 py-2 text-sm data-[focus]:bg-neutral-900 data-[focus]:text-neutral-500 rounded-t-2xl gap-2 w-full"
              onClick={toggleModal}
            >
              <FiUser />
              Profile Settings
            </button>
          </MenuItem>

          <MenuItem>
            <NavLink to="/">
              <button
                type="submit"
                className="flex items-center w-full px-4 py-2 text-left text-sm data-[focus]:bg-neutral-900 data-[focus]:text-neutral-500 rounded-b-2xl gap-2"
                onClick={handleLogout}
              >
                <FiLogOut />
                Log out
              </button>
            </NavLink>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}

DropdownButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
