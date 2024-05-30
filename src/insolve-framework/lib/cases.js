import config from '../config';
import socket from '../socket';

import translateColorIntoRarity from '../helpers/translateColorIntoRarity';
import requestAPI from '../helpers/requestAPI';

import EventEmitter from '../classes/EventEmitter';
import { getToken } from '../../utils/auth.utils';

export default {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;

    socket.on('cases', data => {
      localStorage.removeItem('gameInProgress');
      localStorage.setItem('gameInProgress', data.id);
      this.dispatch(data);
    });
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split('Error:');
      data.error = data.error[data.error.length - 1];
    }

    this.emit(data.action, data);
  },

  on() {
    return;
  },
  off() {
    return;
  },

  verifyCo(pseed, sseed, cseed) {
    socket.emit('cases', { action: 'co_verify', pseed: pseed, sseed: sseed, cseed: cseed });
  },

  verifyJp(pseed, sseed, totalValue) {
    socket.emit('cases', { action: 'jp_verify', pseed: pseed, sseed: sseed, totalTickets: totalValue * 100 });
  },

  verifyCb(pseed, sseed, gameid, steamid, rounds, eos) {
    socket.emit('cases', {
      action: 'cb_verify',
      pseed: pseed,
      sseed: sseed,
      gameid: gameid,
      steamid: steamid,
      rounds: rounds,
      eos: eos,
    });
  },

  subscribe(id) {
    socket.emit('cases', { action: 'subscribe', id: id, token: getToken() });
  },

  unsubscribe(id) {
    socket.emit('cases', { action: 'unsubscribe', id: id, token: getToken() });
  },

  async createNewGame(data) {
    return new Promise((resolve, reject) => {
      requestAPI('api/cases/createNewGame', { cases: data })
        .then(res => (res.success ? resolve(res.id) : reject(res)))
        .catch(e => reject(e));
    });
  },

  async createMysteryGame(data) {
    return new Promise((resolve, reject) => {
      requestAPI('api/cases/mystery ', { amount: data })
        .then(res => (res.success ? resolve(res.id) : reject(res)))
        .catch(e => reject(e));
    });
  },

  async getAllGames(steamid, limit) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/cases/getAllGames/${steamid || 'all'}/${limit || 100}`)
        .then(res => (res.success ? resolve(res) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },

  async getGame(id) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/cases/getGame/${id}`)
        .then(res => {
          socket.emit('cases', { action: 'subscribe', id: id, token: getToken() });
          if (res.success) resolve(res);
          else reject(res.msg);
        })
        .catch(e => reject(e));
    });
  },

  async joinGame(id, payload) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/cases/joinGame/${id}`, { payload })
        .then(res => (res.success ? resolve(res) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },

  async deleteGame(id) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/cases/deleteGame/${id}`)
        .then(res => (res.success ? resolve(res) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },

  async getCases() {
    return new Promise((resolve, reject) => {
      requestAPI('api/cases/getCases')
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },

  async getCasesByType(type) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/cases/getCases/${type}`)
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },

  async getCase(id) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/cases/getCase/${id}`)
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },

  async generateSeed() {
    return new Promise((resolve, reject) => {
      requestAPI('api/cases/generateSeed')
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },

  async openSingleCase(id, amount) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/cases/openSingleCase/${id}`, { caseAmount: amount })
        .then(res => (res.success ? resolve(res) : reject(res.msg)))
        .catch(e => reject(e));
    });
  },
};
