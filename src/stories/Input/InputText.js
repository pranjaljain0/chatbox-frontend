import "./InputText.scss"

import React from 'react'

export default function InputText({ placeholder, value, setValue }) {
    return (
        <input type="text" placeholder={placeholder} className="inputText" value={value} onChange={setValue} />
    )
}

