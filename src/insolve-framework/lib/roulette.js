const socket = require('../socket');
const user = require('./user');
const chat = require('./chat');
const EventEmitter = require('../classes/EventEmitter');
const { getToken } = require('../../utils/auth.utils');

module.exports = {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;

    this.events.addCustomProperty('round update', 'timer');

    this.events.addCustomEvent('stats update', () => {
      socket.emit('roulette', { action: 'request initial data' });
    });

    socket.on('roulette', data => this.dispatch(data));
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split('Error:');
      data.error = data.error[data.error.length - 1];

      chat.dispatch({ action: 'system message', content: data.error });
    }

    this.emit(data.action, data);
  },

  placeBet(amount, color) {
    socket.emit('roulette', { action: 'place bet', token: getToken(), amount: amount, color: color });
  }
};