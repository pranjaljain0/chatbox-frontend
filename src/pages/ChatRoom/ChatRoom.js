import { CREATE_ROOM, INIT, JOIN_ROOM, SEND_MESSAGE, UPDATE_CHAT_LOG, USERNAME } from "../../config/constants"
import { sendMessage, timeSince, waitForConnection } from "../../config/helper";
import { useEffect, useRef, useState } from 'react'

import React from 'react'
import {
    useParams
} from "react-router-dom";

function ChatRoom({ client, userConnected, msgList }) {
    let { roomID, username } = useParams();
    const [inputMsg, setInputMsg] = useState("")
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    }, [])

    useEffect(() => {
        waitForConnection(client, () => sendMessage(client, JOIN_ROOM, { roomID: roomID, username: username }), 1000)
    }, [client, roomID, username])

    return (
        <div className="container">
            {userConnected ? <span className="connStatus">Connected</span> : <span className="connStatus err">Not Connected</span>}
            <h1>ChatBox</h1>
            <div className="messegeContainer">
                <div className="messegesContainer">
                    {(msgList !== undefined && msgList !== null) &&
                        msgList.map((item, index) => {
                            return <div className={username === item.username ? `${item.messageType} send` : `${item.messageType} recv`} key={index} ref={messagesEndRef}>
                                <span>{username !== item.username ? item.username : "You"}</span>
                                <p>{item.content}</p>
                                {item.messageType !== "info" && <span>{timeSince(new Date(item.datetime))} ago</span>}
                            </div>
                        })}
                </div>
                <div className="messageInputContainer">
                    <input type="text" placeholder="Enter Message" className="inputText" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} />
                    <input
                        type="button"
                        value="Submit"
                        className={inputMsg === "" ? "inputButton disabled" : "inputButton"}
                        onClick={() => inputMsg !== "" && sendMessage(client, SEND_MESSAGE, {
                            type: SEND_MESSAGE,
                            username: username,
                            roomID: roomID,
                            content: inputMsg,
                        })} />
                </div>
            </div>

        </div>
    )
}

export default ChatRoom
