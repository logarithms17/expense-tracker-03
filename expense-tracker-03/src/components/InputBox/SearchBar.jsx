import React from "react";
import searchIcon from "../../assets/search.svg";

const SearchBar = ({ setSearchQuery, setSearchDate }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDate = (e) => {
    setSearchDate(e.target.value);
  };

  return (
    <div className=" ">
      <div className="flex md:flex-row sm:flex-col gap-5 items-center px-10">
        <label htmlFor="search" className="relative md:w-[254px] sm:w-full">
          <img
            src={searchIcon}
            alt=""
            className="absolute right-5 top-[14px]"
            id="search"
            name="search"
          />

          <input
            type="text"
            placeholder="Search for anything.."
            className="bg-black px-5 py-3 sm:w-full md:w-[254px] rounded-3xl placeholder:text-neutral-500 z-10"
            onChange={handleSearch}
          />
        </label>
        <label htmlFor="" className="relative sm:w-full md:w-[254px]">
          <input
            type="date"
            className="bg-neutral-900 border-2 border-neutral-700 px-5 py-2 rounded-3xl text-neutral-500 no-calendar-icon sm:w-full md:w-[254px]"
            onChange={handleDate}
          />
          <svg
            className="absolute top-3 right-5 w-6 h-6 text-green-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-6 10h6m-7-4h8m-7 4v6m8-6v6M5 9v10a2 2 0 002 2h10a2 2 0 002-2V9M7 7h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
            ></path>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
