import { CREATE_ROOM, INIT, JOIN_ROOM, SEND_MESSAGE, UPDATE_CHAT_LOG, USERNAME } from "../config/constants"
import React, { useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import ChatRoom from "../pages/ChatRoom/ChatRoom";
import Home from "../pages/Home/Home";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { sendMessage } from "../config/helper";

// var client = new W3CWebSocket('WSS://chatbox-backend-app.herokuapp.com');
var client = new W3CWebSocket('WS://localhost:8000');

export default function Routes() {
    const [username, setUsername] = useState("")
    const [userConnected, setUserConnected] = useState(false)
    const [roomID, setRoomID] = useState(null)
    const [msgList, setMsgList] = useState(null)

    useEffect(() => {
        client.onopen = () => client.send(payload({
            type: INIT,
        }))
        client.onmessage = message => parseMessage(JSON.parse(message.data))
    }, [])

    const payload = (obj) => {
        return JSON.stringify(obj)
    }

    const parseMessage = (obj) => {
        switch (obj.type) {
            case INIT:
                setUserConnected(true)
                setMsgList(obj.messageList)
                break
            case CREATE_ROOM:
                setRoomID(obj.payload.roomID)
                window.location.href = `/${obj.payload.roomID}/${username}`
                break
            case JOIN_ROOM:
                setMsgList(obj.payload.messageList)
                break
            case SEND_MESSAGE:
                setMsgList(obj.payload.messageList)
                break
            case USERNAME:
                break;

            default:
                break;
        }
    }

    return (
        <Router>
            <Switch>
                <Route path={`/:roomID/:username`}>
                    <ChatRoom client={client} userConnected={userConnected} msgList={msgList} roomID={roomID} username={username} />
                </Route>
                <Route path="/">
                    <Home client={client} setUsername={setUsername} username={username} />
                </Route>
            </Switch>
        </Router>
    );
}
