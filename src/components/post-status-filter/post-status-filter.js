import React, { useState } from 'react'

const PostStatusFilter = ({ filter, onFilterSelect }) => {

    // eslint-disable-next-line no-unused-vars
    const [buttons, setButtons] = useState(
        [
            { name: 'all', label: 'All' },
            { name: 'like', label: 'Liked' }
        ]
    )

    const buttonsUI = buttons.map(({ name, label }) => {
        const active = filter === name
        const clazz = active ? 'btn-info' : 'btn-outline-secondary'
        return (
            <button
                key={name}
                type="button"
                className={`btn ${clazz}`}
                onClick={() => onFilterSelect(name)}>{label}</button>
        )
    })

    return (
        <div className="btn-group">
            {buttonsUI}
        </div>
    );
}

export default PostStatusFilter;