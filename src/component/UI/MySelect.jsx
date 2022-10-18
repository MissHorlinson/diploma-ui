import React from 'react';

const MySelect = ({ options, defaultValue, value, onChange }) => {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            name={value}
            className="form-control">
            <option value="">{defaultValue}</option>
            {
                options.map(option =>
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                )}
        </select>
    );
};

export default MySelect;