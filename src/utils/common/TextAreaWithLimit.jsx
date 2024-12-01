import React from 'react';

const TextAreaWithLimit = ({ formsValues: { handleChange }, placeholder, name, value }) => {
    const charCount = value ? value.trim().length : 0;

    return (
        <>
            <textarea
                placeholder={placeholder}
                value={value == 0 ? "" : value}
                onChange={handleChange}
                name={name}
                maxLength={300}
            />
            <p>{charCount}/300</p>
        </>
    );
};

export default TextAreaWithLimit;