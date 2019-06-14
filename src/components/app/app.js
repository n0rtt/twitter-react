import React from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'

import './app.css'

const data = [
    {label: 'Learn props and states', important: true, id: 'qwert'},
    {label: 'Go for a walk', important: false, id: 'trewq'},
    {label: 'Start with footer for the final project', important: false, id: 'dfgghj'}
]

const App = () => {
    return (
        <div className="app">
            <AppHeader />
            <div className="search-panel d-flex">
                <SearchPanel />
                <PostStatusFilter />
            </div>
            <PostList posts={data}/>
            <PostAddForm />
        </div>
    )
}

export default App