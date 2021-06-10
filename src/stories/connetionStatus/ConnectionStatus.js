import "./ConnectionStatus.scss"

import React from 'react'

function ConnectionStatus({ connection }) {
    return connection ? <span className="connStatus">Connected</span> : <span className="connStatus err">Not Connected</span>
}

export default ConnectionStatus
