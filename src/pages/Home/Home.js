import { CREATE_ROOM, ENTER_ROOM } from 'config/constants';

import { Button } from 'stories/Button/Button';
import { Header } from 'stories/Header/Header';
import InputText from 'stories/Input/InputText';
import PropType from 'prop-types';
import React from 'react';
import { sendMessage } from 'config/helper';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Home({ client }) {
	let { roomID } = useParams();

	const [username, setUsername] = useState('');
	const [roomInput, setRoomInput] = useState(roomID || '');
	const [messageText, setMessageText] = useState('');
	const [showMessage, setShowMessage] = useState(false);

	const handleJoinRoom = async () => {
		if (roomInput !== '' && username !== '')
			sendMessage(client, ENTER_ROOM, {
				roomID: roomInput,
				username: username,
			});
		else {
			if (roomInput === '') setMessageText('Enter a room ID');
			if (username === '') setMessageText('Enter your username');
			setShowMessage(true);
			setTimeout(() => setShowMessage(false), 5000);
		}
	};

	return (
		<div className='container center'>
			<Header
				roomID={roomID}
				onLogout={() => console.log('Logout')}
				onCopy={() =>
					navigator.clipboard.writeText(
						`https://chatbox.pranjaljain.me/${roomID}`
					)
				}
			/>
			<div className='aboutSection'>
				<h2>About</h2>
				<p>
					This is an application developed for an in-depth understanding of
					WebSockets as a personal project.
				</p>
				<p>For the front end, I have used React JS and sockets IO </p>
				<p>For the backend, implemented sockets using Express JS.</p>
				<p>
					Checkout more of my work on{' '}
					<a href='https://www.github.com/pranjaljain0'>Github</a>
				</p>
			</div>
			{showMessage && (
				<div className='alertSection'>
					<p>{messageText}</p>
					<div className='progress'></div>
				</div>
			)}
			<div className='userNameContainer'>
				<InputText
					placeholder='Enter a username'
					value={username}
					setValue={(e) => setUsername(e.target.value)}
				/>
				{(roomID === undefined || roomID === null) && (
					<>
						<Button
							label={'Create a Room'}
							onClick={() =>
								username !== '' &&
								sendMessage(client, CREATE_ROOM, { username: username })
							}
							disabled={username === ''}
						/>
						<hr
							style={{
								margin: '20px auto',
								width: '80%',
							}}
						/>
					</>
				)}
				<InputText
					placeholder='Enter a Room ID'
					value={roomInput}
					setValue={(e) => setRoomInput(e.target.value)}
				/>
				<Button
					label={'Enter the Room'}
					onClick={handleJoinRoom}
					disabled={roomInput.length > 0 && username.length > 0 ? false : true}
				/>
			</div>
		</div>
	);
}

Home.propTypes = {
	client: PropType.any,
};

export default Home;
