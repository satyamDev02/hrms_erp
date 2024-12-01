import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchBox = ({ onSearch, placeholder }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiCall, setApiCall] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchQuery(term);

    setTimeout(() => {
      setApiCall(!apiCall);
      onSearch(term);
    }, 1000);
  };

  useEffect(() => {
    setSearchQuery("");
  }, []);
  
  return (
    <div>
      <div className="search divRight">
        <div className="search div_box">
          <span className="search_icon">
            <IoSearchSharp />
          </span>
          <input
           autoComplete="off"
            type="text"
            name="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            id="TypeSearchInput"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
