import { CREATE_ROOM } from "../../config/constants"
import { Link } from "react-router-dom"
import { sendMessage } from "../../config/helper"

function Home({ client, username, setUsername }) {
    return (
        <div className="container center">
            <h1>ChatBox</h1>
            <div className="userNameContainer">
                <span className={username === "" ? "usernameButton disabled" : "usernameButton"}
                    role='button'
                    aria-hidden
                    onClick={() => username !== "" && sendMessage(client, CREATE_ROOM, null)}>
                    Create a Room</span>
                <input type="text" placeholder="Enter a username" className="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)} />
                <span className={username === "" ? "usernameButton disabled" : "usernameButton"}>
                    Enter the Room</span>
            </div>
        </div>
    )
}

export default Home
