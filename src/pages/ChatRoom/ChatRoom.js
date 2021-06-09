import { CREATE_ROOM_ERROR, CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, INIT, JOIN_ROOM_ERROR, JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, SEND_MESSAGE_REQUEST, UPDATE_CHAT_LOG, USERNAME } from "../../config/constants"
import { useEffect, useRef, useState } from 'react'

import React from 'react'
import moment from 'moment';
import {
    useParams
} from "react-router-dom";

function ChatRoom({ client, userConnected, msgList }) {
    let { id } = useParams();
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

    const sendMessage = (type) => {
        client.send(JSON.stringify({
            type: type,
            username: id,
            content: inputMsg,
        }));
    }

    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;

        if (interval > 1) {
            return moment(date).format("DD MMMM, YY")
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return moment(date).format("DD MMMM, YY")
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return moment(date).format("DD MMMM, YY")
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) === 1
                ? Math.floor(interval) + " hour"
                : Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) === 1
                ? Math.floor(interval) + " minute"
                : Math.floor(interval) + " minutes";
        }
        return Math.floor(interval) === 1
            ? Math.floor(seconds) + " second"
            : Math.floor(seconds) + " seconds";
    }

    return (
        <div className="container">
            {userConnected ? <span className="connStatus">Connected</span> : <span className="connStatus err">Not Connected</span>}
            <h1>ChatBox</h1>
            <div className="messegeContainer">
                <div className="messegesContainer">
                    {(msgList !== undefined && msgList !== null) &&
                        msgList.map((item, index) => {
                            return <div className={id === item.username ? "msg send" : "msg recv"} key={index} ref={messagesEndRef}>
                                <span>{id !== item.username ? item.username : "You"}</span>
                                <p>{item.content}</p>
                                {/* <span>{moment(item.datetime).format("DD/MM/YY")}</span> */}
                                <span>{timeSince(new Date(item.datetime))}</span>
                            </div>
                        })}

                </div>
                <div className="messageInputContainer">
                    <input type="text" placeholder="Enter Message" className="inputText" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} />
                    <input
                        type="button"
                        value="Submit"
                        className={inputMsg === "" ? "inputButton disabled" : "inputButton"}
                        onClick={() => inputMsg !== "" && sendMessage(SEND_MESSAGE_REQUEST)} />
                </div>
            </div>

        </div>
    )
}

export default ChatRoom
