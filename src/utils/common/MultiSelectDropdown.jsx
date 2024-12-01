import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const MultiSelectDropdown = ({
    options,
    selectedItems,
    onItemSelect,
    onItemRemove,
    placeholder = "Select Options",
    searchPlaceholder = "Search options",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [dynamicOptions, setDynamicOptions] = useState(options); // For dynamic addition of options
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleClickOutside = (e) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(e.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = dynamicOptions.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckboxChange = (option) => {
        if (selectedItems.includes(option)) {
            onItemRemove(option);
        } else {
            onItemSelect(option);
        }
    };

    const handleAddCustomOption = () => {
        if (searchQuery.trim() !== "" && !dynamicOptions.includes(searchQuery)) {
            const newOptions = [...dynamicOptions, searchQuery];
            setDynamicOptions(newOptions);
            onItemSelect(searchQuery); // Automatically select the newly added option
            setSearchQuery(""); // Reset search query
        }
    };


    // Ensure all selectedItems are present in filteredOptions
    const allOptions = Array.from(new Set([...filteredOptions, ...selectedItems]));
    return (
        <div className="dropdownMulti">
            <div
                id="dropdown_buttonSkill"
                className="dropdown-button"
                ref={buttonRef}
                onClick={handleToggle}
            >
                <div id="requiredSkillsSelect">
                    {/* {selectedItems?.length > 0 ? (
                        selectedItems?.map((item, index) => (
                            <div key={item + index} className="skill-chip">
                                <span onClick={() => onItemRemove(item)}>×</span> {item}
                            </div>
                        ))
                    ) : (
                       placeholder
                     )} */}

                    {selectedItems?.length > 0
                        ? `${selectedItems?.length} ${selectedItems?.length > 1 ? "Skills selected" : "Skill selected"}`
                        : "Select and Add "}
                </div>
                <span id="toggle_selectIcon">
                    {!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </span>
            </div>

            {isOpen && (
                <div className="dropdown-menu" ref={dropdownRef}>
                    <input
                        type="search"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search22"
                        id="searchDepartmentHead"
                    />
                    <div className="dropdown-I">
                        {allOptions.map((option) => (
                            <div key={option} className="dropdown-item"

                                onClick={() => handleCheckboxChange(option)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(option)}
                                    style={{ marginRight: '10px' }}
                                />
                                {option}
                            </div>
                        ))}
                        {filteredOptions?.length === 0 && searchQuery && (
                            <div
                                className="dropdown-item add-new-skill"
                                onClick={handleAddCustomOption}
                            >
                                + Add "{searchQuery}"
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
