import { Link } from "react-router-dom"

function Home({ username, setUsername }) {

    return (
        <div className="container">
            <h1>ChatBox</h1>
            <div className="userNameContainer">
                <input type="text" placeholder="Enter a username" className="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Link className={username === "" ? "usernameButton disabled" : "usernameButton"}
                    to={username !== "" ? `/${username}` : ""}> Enter the room</Link>
            </div>
        </div>
    )
}

export default Home
