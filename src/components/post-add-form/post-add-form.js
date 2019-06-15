import React from 'react'
import { Button } from 'reactstrap';

import './post-add-form.css'

const PostAddForm = ({onAdd}) => {
    return (
        <div className="bottom-panel d-flex">
            <input
                type="text"
                placeholder="What's on your mind?"
                className="form-control new-post-label"
            />
            <Button outline color="info" type="submit" onClick={() => onAdd('Hello')}>
                Send
            </Button>
        </div>
    )
}

export default PostAddForm