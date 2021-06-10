import "./ConnectionStatus.scss"

import PropType from "prop-types"
import React from 'react'

function ConnectionStatus({ connection }) {
    return connection ? <span className="connStatus">Connected</span> : <span className="connStatus err">Not Connected</span>
}

ConnectionStatus.propTypes = {
    connection: PropType.any
}


export default ConnectionStatus
