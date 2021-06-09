import { CREATE_ROOM_ERROR, CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, INIT, JOIN_ROOM_ERROR, JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, SEND_MESSAGE_REQUEST, UPDATE_CHAT_LOG, USERNAME } from "../config/constants"
import React, { useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import ChatRoom from "../pages/ChatRoom/ChatRoom";
import Home from "../pages/Home/Home";
import { w3cwebsocket as W3CWebSocket } from "websocket";

var client = new W3CWebSocket('WSS://chatbox-backend-app.herokuapp.com');
// var client = new W3CWebSocket('WS://localhost:8000');

export default function Routes() {
    const [initData, setInitData] = useState(null)
    const [username, setUsername] = useState("")
    const [userConnected, setUserConnected] = useState(false)
    const [msgList, setMsgList] = useState(initData)

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
        // let activityArr = [USERNAME, SEND_MESSAGE_REQUEST, UPDATE_CHAT_LOG, CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_ERROR, JOIN_ROOM_REQUEST, JOIN_ROOM_SUCCESS, JOIN_ROOM_ERROR, INIT]
        switch (obj.type) {
            case INIT:
                setUserConnected(true)
                setMsgList(obj.messageList)
                break
            case SEND_MESSAGE_REQUEST:
                setMsgList(obj.messageList)
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
                <Route path="/:id">
                    <ChatRoom client={client} userConnected={userConnected} msgList={msgList} />
                </Route>
                <Route path="/">
                    <Home setUsername={setUsername} username={username} />
                </Route>
            </Switch>
        </Router>
    );
}
