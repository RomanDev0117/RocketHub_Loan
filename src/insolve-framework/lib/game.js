const socket = require('../socket');
const EventEmitter = require('../classes/EventEmitter');
const { getToken } = require('../../utils/auth.utils');

module.exports = {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;

    this.server = undefined; // current server

    socket.on('game', (data) => this.dispatch(data));

    this.events.addCustomEvent('joined server', () => {
      socket.emit('game', { action: 'get active server', token: getToken() });
    });
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split('Error:');
      data.error = data.error[data.error.length - 1];
    }

    if (data.action == 'joined server') {
      this.server = data;
    } else if (data.action == 'left server') {
      this.server = undefined;
    }

    this.emit(data.action, data);
  },

  startMoving(dir) {
    socket.emit('game', {
      action: 'start moving',
      token: getToken(),
      dir: dir,
    });
  },

  stopMoving(dir) {
    socket.emit('game', { action: 'stop moving', token: getToken(), dir: dir });
  },

  emitRotation(rotation = 0) {
    socket.emit('game', {
      action: 'rotate',
      token: getToken(),
      rotation: rotation,
    });
  },

  shoot() {
    socket.emit('game', { action: 'shoot', token: getToken() });
  },

  kick() {
    socket.emit('game', { action: 'kick', token: getToken() });
  },

  getServer() {
    return this.server;
  },

  joinServer(id = 0) {
    socket.emit('game', { action: 'join server', token: getToken(), id: id });
  },

  leaveServer() {
    socket.emit('game', { action: 'leave server', token: getToken() });
  },
};
