import { CREATE_ROOM, ENTER_ROOM, JOIN_ROOM } from "../../config/constants"

import { Button } from "../../stories/Button/Button"
import { Header } from "../../stories/Header/Header"
import InputText from "../../stories/Input/InputText"
import { sendMessage } from "../../config/helper"
import { useParams } from "react-router-dom"
import { useState } from "react"

function Home({ client, }) {
    let { roomID } = useParams();

    const [username, setUsername] = useState("")
    const [roomInput, setRoomInput] = useState(roomID || "")

    return (
        <div className="container center">
            <Header roomID={roomID} onLogout={() => console.log("Logout")} onCopy={() => navigator.clipboard.writeText(`https://chatbox.pranjaljain.me/${roomID}`)} />
            <div className="userNameContainer">
                <InputText placeholder="Enter a username" value={username} setValue={(e) => setUsername(e.target.value)} />
                {(roomID === undefined || roomID === null) && <><Button label={"Create a Room"}
                    onClick={() => username !== "" && sendMessage(client, CREATE_ROOM, { username: username })}
                    disabled={username === ""} />
                    <hr style={{
                        margin: "20px auto",
                        width: "80%",
                    }} /></>}
                <InputText placeholder="Enter a Room ID" value={roomInput} setValue={(e) => setRoomInput(e.target.value)} />
                <Button label={"Enter the Room"}
                    onClick={() => roomInput !== "" && username !== "" && sendMessage(client, ENTER_ROOM, { roomID: roomInput, username: username })
                    }
                    disabled={(roomInput.length > 0 && username.length > 0) ? false : true} />
            </div>
        </div>
    )
}

export default Home
