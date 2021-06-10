import { CREATE_ROOM, DROP, INIT, JOIN_ROOM, SEND_MESSAGE, STATUS_UPDATE, UPDATE_CHAT_LOG, USERNAME } from "../config/constants"
import React, { useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    useParams
} from "react-router-dom";

import ChatRoom from "../pages/ChatRoom/ChatRoom";
import Home from "../pages/Home/Home";
import { w3cwebsocket as W3CWebSocket } from "websocket";

var client = new W3CWebSocket('WSS://chatbox-backend-app.herokuapp.com');
// var client = new W3CWebSocket('WS://localhost:8000');

export default function Routes() {
    const [userConnected, setUserConnected] = useState(false)
    const [roomID, setRoomID] = useState(null)
    const [msgList, setMsgList] = useState(null)
    const [alert, setAlert] = useState(null)
    // let { username } = useParams();

    // console.log(username)

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
                window.location.href = `/${obj.payload.roomID}/${obj.payload.username}`
                break
            case JOIN_ROOM:
                setRoomID(obj.payload.roomID)
                setMsgList(obj.payload.messageList)
                break
            case SEND_MESSAGE:
                setMsgList(obj.payload.messageList)
                break
            case USERNAME:
                break;
            case STATUS_UPDATE:
                setAlert(obj.payload.status_update)
                break;
            case DROP:
                setMsgList(obj.payload.messageList)
                break;

            default:
                break;
        }
    }

    return (
        <Router>
            <Switch>
                <Route path={`/:roomID/:username`}>
                    <ChatRoom client={client} userConnected={userConnected} msgList={msgList} roomID={roomID} />
                </Route>
                <Route path={`/:roomID`}>
                    <Home client={client} />
                </Route>
                <Route path="/">
                    <Home client={client} />
                </Route>
            </Switch>
        </Router>
    );
}
