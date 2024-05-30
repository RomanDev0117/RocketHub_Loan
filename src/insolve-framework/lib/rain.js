import config from '../config';
import socket from '../socket';
import requestAPI from '../helpers/requestAPI';
import EventEmitter from '../classes/EventEmitter';
import { getToken } from '@/utils/auth.utils';

export default {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;

    socket.on('rain', data => {
      this.dispatch(data);
    });
  },

  on() {
    return;
  },
  off() {
    return;
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split('Error:');
      data.error = data.error[data.error.length - 1];
    }
    this.emit(data.action, data);
  },


  subscribe(id) {
    socket.emit('rain', { action: 'subscribe', id: id, token: getToken(), });
  },

  unsubscribe(id) {
    socket.emit('rain', { action: 'unsubscribe', id: id, token: getToken(), });
  },
};
