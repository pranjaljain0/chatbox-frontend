import "./NewMessage.scss"

import { IconButton } from "../../IconButton/IconButton"
import InputText from "../../Input/InputText"
import PropTypes from "prop-types"
import React from 'react'

function NewMessage({ placeholder, onSubmit, disabled, value, setValue }) {
    return (
        <div className="newMessage">
            <InputText placeholder={placeholder} value={value} setValue={setValue} />
            <IconButton onClick={onSubmit} disabled={disabled} />
        </div>
    )
}

NewMessage.propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    setValue: PropTypes.func
}

export default NewMessage
