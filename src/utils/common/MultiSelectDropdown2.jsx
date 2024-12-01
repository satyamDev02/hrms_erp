import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const MultiSelectDropdown2 = ({
  selectedValue = [],
  options,
  placeholder,
  onSelect,
  searchPlaceholder = 'Search...',
  handleSearch,
  type,
  loading = false,
  showSearchBar,
  className,
  itemClassName = () => '', // Custom conditional classes
  disabled = false,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    if (selectedValue.some((val) => val.id === item.id)) {
      // Unselect item
      onSelect(type, selectedValue.filter((val) => val.id !== item.id));
    } else {
      // Select item
      onSelect(type, [...selectedValue, item]);
    }
  };

  const handleSearchItem = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value, type);
  };

  return (
    <div className={`dropdown ${className || ''} ${disabled ? 'dropdown-disabled' : ''}`}>
      <div
        className={`dropdown-button ${disabled ? 'disabled' : ''}`}
        ref={buttonRef}
        onClick={toggleDropdown}
      >
        {selectedValue?.length > 0 ? `${selectedValue?.length} ${selectedValue?.length > 1 ? 'Members' : 'Member'} Selected ` : placeholder}
        <span id="toggle_selectIcon">
          {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="dropdown-menu" ref={dropdownRef}>
          {showSearchBar && (
            <input
              id="searchDepartmentHead"
              type="search"
              className="search22"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchItem}
            />
          )}
          <div className="dropdown_I">
            {options?.map((item, index) => {
              const isSelected = selectedValue.some((val) => val.id === item.id);
              const itemClasses = `dropdown-item ${itemClassName(item)} ${isSelected ? 'selected' : ''
                }`;
              return (
                <div key={index} className={itemClasses}
                    style={{display:'flex'}}
                    onClick={() => handleSelect(item)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    style={{ marginRight: '10px' }}
                  />
                  {item?.name}
                </div>
              );
            })}
            {options?.length === 0 && (
              <>
                <div className="no_option_found">
                  <iframe
                    src="https://lottie.host/embed/4a834d37-85a4-4cb7-b357-21123d50c03a/JV0IcupZ9W.json"
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="dropdown-item centeraligntext">No option found</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown2;
