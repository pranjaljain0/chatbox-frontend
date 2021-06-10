import "./InputText.scss"

import PropTypes from "prop-types"
import React from 'react'

export default function InputText({ placeholder, value, setValue }) {
    return (
        <input type="text" placeholder={placeholder} className="inputText" value={value} onChange={setValue} />
    )
}

InputText.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func
}