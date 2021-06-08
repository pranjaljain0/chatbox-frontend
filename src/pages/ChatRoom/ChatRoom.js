import { useEffect, useRef, useState } from 'react'

import React from 'react'
import moment from 'moment';
import {
    useParams
} from "react-router-dom";

function ChatRoom({ client, userConnected, initData }) {
    let { id } = useParams();

    const [msgList, setMsgList] = useState(initData)
    const [inputMsg, setInputMsg] = useState("")

    const messagesEndRef = useRef(null)
    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({
    //         behavior: "smooth",
    //         block: 'end',
    //         inline: 'nearest'
    //     });
    // }

    useEffect(() => {
        client.onmessage = (message) => {
            var data = JSON.parse(message.data)
            setMsgList(data.userMessages)
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView(
                    {
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'nearest'
                    })
            }
        }
        return () => {
            client.close = (e) => { console.warn("Conn closed") }
            // ...
        }
    }, [client])

    const sendMessage = () => {
        client.send(JSON.stringify({
            type: "com",
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
                        onClick={() => inputMsg !== "" && sendMessage()} />
                </div>
            </div>

        </div>
    )
}

export default ChatRoom
