import socket from '../socket';
import user from './user';
import EventEmitter from '../classes/EventEmitter';
import { getToken } from '../../utils/auth.utils';

export default {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;

    this.connected = false;

    this.muted = localStorage.getItem('muted');
    if (this.muted !== null) {
      this.muted = JSON.parse(this.muted);
    } else {
      localStorage.setItem('muted', '[]');
      this.muted = [];
    }

    this.events.addCustomEvent('message', () => {
      this.joinLastRoom();
      socket.emit('chat', { action: 'request room list', token: 'x' });
    });

    // socket.on('connect', () => this.dispatch({action: 'system message', content: 'Connected!'}));
    socket.on('connect', () => this.dispatch({ action: 'connected' }));
    socket.on('chat', (data) => this.dispatch(data));
    socket.on('connect_error', () =>
      this.dispatch({ action: 'connection error' })
    );
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split('Error:');
      data.error = data.error[data.error.length - 1];
    }

    if (data.action == 'joined room') {
      // this.dispatch({action: 'system message', content: `Joined ${data.name}.`});
      localStorage.setItem('lastJoinedRoom', data.id);
    } else if (data.action == 'connected') {
      this.joinLastRoom();
    }

    this.emit(data.action, data);
  },

  on() {
    return;
  },
  off() {
    return;
  },

  joinLastRoom() {
    let lastJoinedRoom = localStorage.getItem('lastJoinedRoom');
    this.joinRoom(lastJoinedRoom !== null ? parseInt(lastJoinedRoom) : 0);
  },

  isMuted(steamid) {
    return this.muted.findIndex((el) => el == steamid) !== -1;
  },

  isConnected() {
    return socket.connected;
  },

  mute(steamid, name) {
    let isNowMuted = false;

    if (this.isMuted(steamid)) {
      // unmute
      this.muted = this.muted.filter((item) => item !== steamid);
    } else {
      this.muted.push(steamid);
      isNowMuted = true;
    }

    localStorage.setItem('muted', JSON.stringify(this.muted));

    this.dispatch({
      action: 'system message',
      content: isNowMuted
        ? `You will no longer see any messages from ${name}.`
        : `${name} has been unmuted.`,
    });

    return isNowMuted;
  },

  getLastJoinedRoom() {
    return localStorage.getItem('lastJoinedRoom') !== null
      ? parseInt(localStorage.getItem('lastJoinedRoom'))
      : 0;
  },

  sendMessage(data) {
    if (data.message === '/offload jackpot') {
      return socket.emit('jackpot', {
        token: getToken(),
        action: 'send all items',
      });
    } else if (data.message === '/offload coinflip') {
      return socket.emit('coinflip', {
        token: getToken(),
        action: 'send all items',
      });
    } else if (data.message === '/offload upgrader') {
      return socket.emit('upgrader', {
        token: getToken(),
        action: 'send all items',
      });
    }

    let s = data.message.split(' ');

    if (s[0] == '/img') {
      data.message = `<img src="${s[1]}" alt="" />`;
    } else if (s[0] == '/hl') {
      data.message = data.message.replaceAll('/hl', '[hl]');
    } else if (s[0] == '/mute') {
      return socket.emit('chat', {
        token: getToken(),
        action: 'mute',
        steamid: s[1],
        time: s[2],
      });
    } else if (s[0] == '/unmute') {
      return socket.emit('chat', {
        token: getToken(),
        action: 'unmute',
        steamid: s[1],
      });
    } else if (s[0] == '/ban') {
      const reason = s.slice(2).join(' ');

      return socket.emit('chat', {
        token: getToken(),
        action: 'ban',
        steamid: s[1],
        reason: reason,
      });
    } else if (s[0] == '/unban') {
      return socket.emit('chat', {
        token: getToken(),
        action: 'unban',
        steamid: s[1],
      });
    } else if (s[0] == '/clear') {
      return socket.emit('chat', { token: getToken(), action: 'clear' });
    } else if (s[0] == '/unselfban') {
      return socket.emit('chat', {
        token: getToken(),
        action: 'unselfban',
        steamid: s[1],
      });
    }

    socket.emit('chat', {
      action: 'message',
      token: getToken(),
      message: data.message,
    });
  },

  joinRoom(room) {
    socket.emit('chat', { action: 'join room', token: getToken(), room: room });
  },
};
