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
                { label: 'Learn props and states', important: true, id: '1' },
                { label: 'Go for a walk', important: false, id: '2' },
                { label: 'Start with footer for the final project', important: false, id: '3' }
            ]
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.htmlId = idGenerator()
        this.maxId = 4
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

    render() {
        return (
            <AppBlock>
                <AppHeader />
                <SearchPanelStyle>
                    <SearchPanel />
                    <PostStatusFilter />
                </SearchPanelStyle>
                <PostList posts={this.state.data} onDelete={this.deleteItem} />
                <PostAddForm onAdd={this.addItem} />
            </AppBlock>
        )
    }
}