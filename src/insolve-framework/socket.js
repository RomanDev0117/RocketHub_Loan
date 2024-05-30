import config from './config';
import io from 'socket.io-client';

// let socket = {on: () => {}, emit: () => {}, off: () => {}};
// let socket = io('http://localhost:3001');
let socket = io(config.url, {
    withCredentials: false
});
// todo: on connect, emit a handhshake request including the token from localStorage

export default socket;