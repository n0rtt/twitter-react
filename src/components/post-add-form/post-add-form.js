import React, { useState } from 'react'
import { Button } from 'reactstrap'

import './post-add-form.css'

const PostAddForm = ({ onAdd }) => {

    const [text, setText] = useState('')

    const onValueChange = e => setText(e.target.value)

    const onSubmit = e => {
        e.preventDefault()

        if (text === '') {
            return null
        } else {
            onAdd(text)
        }

        setText('')
    }

    return (
        <form
            className="bottom-panel d-flex"
            onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="What's on your mind?"
                className="form-control new-post-label"
                onChange={onValueChange}
                value={text}
            />
            <Button outline color="info" type="submit">
                Send
            </Button>
        </form>
    )
}

export default PostAddForm