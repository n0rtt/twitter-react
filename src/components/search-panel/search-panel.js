import React, { useState } from 'react'

import './search-panel.css'

const SearchPanel = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [term, setTerm] = useState('')

    const onUpdateSearch = e => {
        const term = e.target.value
        setTerm(term)
        props.onUpdateSearch(term)
    }

    return (
        <input
            className="form-control search-input"
            type="text"
            placeholder="Search posts"
            onChange={onUpdateSearch}
        />
    )
}

export default SearchPanel