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

    socket.on('wheelOfFortune', data => {
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

  async getCurrentWof() {
    return new Promise((resolve, reject) => {
      requestAPI('api/wof/getcurrentcof')
        .then(res => {
          if (res.success) resolve(res);
          else reject(res);
        })
        .catch(e => reject(e));
    });
  },

  async placeBet(amount, color) {
    return new Promise((resolve, reject) => {
      requestAPI('api/wof/placebet', { amount, color })
        .then(res => {
          if (res.success) resolve(res);
          else reject(res);
        })
        .catch(e => reject(e));
    });
  },

  async getHistory() {
    return new Promise((resolve, reject) => {
      requestAPI('api/wof/gethistory')
        .then(res => {
          if (res.success) resolve(res);
          else reject(res);
        })
        .catch(e => reject(e));
    });
  },

  subscribe(id) {
    socket.emit('wheelOfFortune', { action: 'subscribe', id: id, token: getToken() });
  },

  unsubscribe(id) {
    socket.emit('wheelOfFortune', { action: 'unsubscribe', id: id, token: getToken() });
  },
};
