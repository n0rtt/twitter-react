import React, { Component } from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'
import idGenerator from 'react-id-generator'

//import './app.css'
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

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                { label: 'Learn props and states', important: true, like: false, id: '1' },
                { label: 'Go for a walk', important: false, like: false, id: '2' },
                { label: 'Start with footer for the final project', important: false, like: false, id: '3' }
            ],
            term: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onToggleImportant = this.onToggleImportant.bind(this)
        this.onToggleLiked = this.onToggleLiked.bind(this)
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
        this.onFilterSelect = this.onFilterSelect.bind(this)
    }

    deleteItem(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        this.htmlId = idGenerator()
        const newItem = {
            label: body,
            important: false,
            id: this.htmlId
        }

        this.setState(({ data }) => {
            const newArr = [...data, newItem]

            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        const action = 'important'
        this.update(id, action)
    }

    onToggleLiked(id) {
        const action = 'like'
        this.update(id, action)
    }

    update(id, action) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            let newItem

            if (action === 'important') {
                newItem = { ...old, important: !old.important }
            } else {
                newItem = { ...old, like: !old.like }
            }

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]

            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(items => items.like)
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({ term })
    }

    onFilterSelect(filter) {
        this.setState({ filter })
    }

    render() {
        const { data, term, filter } = this.state

        const liked = data.filter(item => item.like).length
        const allPosts = data.length

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter)

        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts} />
                <SearchPanelStyle>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter 
                    filter={filter} 
                    onFilterSelect={this.onFilterSelect}/>
                </SearchPanelStyle>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked} />
                <PostAddForm onAdd={this.addItem} />
            </AppBlock>
        )
    }
}