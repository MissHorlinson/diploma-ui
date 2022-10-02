import React from 'react';

const MySearch = ({ filter, setFilter }) => {
    return (
        <div className="container mb-3">
            <div className="row">
                <input
                    value={filter.query}
                    onChange={e => setFilter({ query: e.target.value })}
                    placeholder="Search..." />
            </div>
        </div>
    );
};

export default MySearch;
