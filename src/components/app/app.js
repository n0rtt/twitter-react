import React, { useState } from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'
import idGenerator from 'react-id-generator'
import styled from 'styled-components'

const AppBlock = styled.div`
        margin: 0 auto;
        max-width: 800px;
`

const SearchPanelStyle = styled.div`
        display: flex;
        margin: 1rem 0;
        width: auto;
        flex-grow: 1;
        margin-right: 3px;
`

const App = () => {

    const [data, setData] = useState(
        [
            { label: 'Learn props and states', important: true, like: false, id: '1' },
            { label: 'Go for a walk', important: false, like: false, id: '2' },
            { label: 'Start with footer for the final project', important: false, like: false, id: '3' }
        ]
    )
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')

    const addItem = (text) => {
        let htmlId = idGenerator()
        const newItem = {
            label: text,
            important: false,
            id: htmlId
        }
        const newArr = [...data, newItem]
        setData(newArr)
    }

    const deleteItem = (id) => {
        const index = data.findIndex(elem => elem.id === id)
        const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
        setData(newArr)
    }

    const onToggleImportant = (id) => {
        const action = 'important'
        update(id, action)
    }

    const onToggleLiked = (id) => {
        const action = 'like'
        update(id, action)
    }

    const update = (id, action) => {
        const index = data.findIndex(elem => elem.id === id)
        const old = data[index]

        const newItem = (action === 'important') ? { ...old, important: !old.important } : { ...old, like: !old.like }

        const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
        setData(newArr)
    }

    const onUpdateSearch = term => setTerm(term)
    const onFilterSelect = filter => setFilter(filter)

    const searchPost = (items, term) => (term.length === 0) ? items : items.filter(item => item.label.indexOf(term) > -1)
    const filterPost = (items, filter) => (filter === 'like') ? items.filter(items => items.like) : items

    const visiblePosts = filterPost(searchPost(data, term), filter)

    const liked = data.filter(item => item.like).length
    const allPosts = data.length

    return (
        <AppBlock>
            <AppHeader
                liked={liked}
                allPosts={allPosts} />
            <SearchPanelStyle>
                <SearchPanel
                    onUpdateSearch={onUpdateSearch} />
                <PostStatusFilter
                    filter={filter}
                    onFilterSelect={onFilterSelect} />
            </SearchPanelStyle>
            <PostList
                posts={visiblePosts}
                onDelete={deleteItem}
                onToggleImportant={onToggleImportant}
                onToggleLiked={onToggleLiked} />
            <PostAddForm onAdd={addItem} />
        </AppBlock>
    )
}

export default App;