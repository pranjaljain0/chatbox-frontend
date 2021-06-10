import { CREATE_ROOM, DROP, INIT, JOIN_ROOM, SEND_MESSAGE, UPDATE_CHAT_LOG, USERNAME } from "../../config/constants"
import { sendMessage, timeSince, waitForConnection } from "../../config/helper";
import { useEffect, useRef, useState } from 'react'

import ConnectionStatus from "../../stories/connetionStatus/ConnectionStatus";
import { Header } from "../../stories/Header/Header"
import NewMessage from "../../stories/Form/NewMessage/NewMessage"
import React from 'react'
import {
    useParams
} from "react-router-dom";

function ChatRoom({ client, userConnected, msgList, }) {
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
            <ConnectionStatus connection={userConnected} />
            <Header username={username} roomID={roomID} onLogout={() => sendMessage(client, DROP, { roomID, username })} onCopy={() => navigator.clipboard.writeText(`https://chatbox.pranjaljain.me/${roomID}`)} />
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
                    <NewMessage
                        placeholder="Enter your message"
                        disabled={inputMsg === ""}
                        value={inputMsg}
                        setValue={(e) => setInputMsg(e.target.value)}
                        onSubmit={() => {
                            inputMsg !== "" && sendMessage(client, SEND_MESSAGE, {
                                type: SEND_MESSAGE,
                                username: username,
                                roomID: roomID,
                                content: inputMsg,
                            })
                            setInputMsg("")
                        }} />
                </div>
            </div>

        </div>
    )
}

export default ChatRoom
