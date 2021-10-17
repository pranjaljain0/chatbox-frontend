import moment from 'moment';

export const sendMessage = (client, type, payload) => {
	client.send(
		JSON.stringify({
			type: type,
			payload: payload,
		})
	);
};

export function timeSince(date) {
	var seconds = Math.floor((new Date() - date) / 1000);
	var interval = seconds / 31536000;

	if (interval > 1) {
		return moment(date).format('DD MMMM, YY');
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return moment(date).format('DD MMMM, YY');
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return moment(date).format('DD MMMM, YY');
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) === 1
			? Math.floor(interval) + ' hour'
			: Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) === 1
			? Math.floor(interval) + ' minute'
			: Math.floor(interval) + ' minutes';
	}
	return 'Less than a minute';
	// return Math.floor(interval) === 1
	// 	? Math.floor(seconds) + ' second'
	// 	: Math.floor(seconds) + ' seconds';
}

export const waitForConnection = (client, callback, interval) => {
	if (client !== undefined) {
		if (client.readyState === 1) {
			callback();
		} else {
			// optional: implement backoff for interval here
			setTimeout(function () {
				waitForConnection(client, callback, interval);
			}, interval);
		}
	}
};
