import React, { useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import ChatRoom from "../pages/ChatRoom/ChatRoom";
import Home from "../pages/Home/Home";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// var client = new W3CWebSocket('WSS://chatbox-backend-app.herokuapp.com');
var client = new W3CWebSocket('WS://localhost:8000');

export default function Routes() {
    const [initData, setInitData] = useState(null)
    const [username, setUsername] = useState("")
    const [userConnected, setUserConnected] = useState(false)

    useEffect(() => {
        client.onopen = () => {
            client.send(JSON.stringify({
                type: "init",
                username: username,
            }));
            setUserConnected(true)
        }

        client.onmessage = (message) => {
            var data = JSON.parse(message.data)
            setInitData(data.userMessages)
        }
    }, [username])

    return (
        <Router>
            <Switch>
                <Route path="/:id">
                    <ChatRoom client={client} userConnected={userConnected} initData={initData} />
                </Route>
                <Route path="/">
                    <Home setUsername={setUsername} username={username} />
                </Route>
            </Switch>
        </Router>
    );
}
