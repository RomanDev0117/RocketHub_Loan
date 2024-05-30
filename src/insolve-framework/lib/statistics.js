const config = require('../config');
const insolve = require('../index');
const socket = require('../socket');

const translateColorIntoRarity = require('../helpers/translateColorIntoRarity');
const requestAPI = require('../helpers/requestAPI');

const EventEmitter = require('../classes/EventEmitter');

module.exports = {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;
  },

  dispatch(data) {
    if(data.error) {
      data.error = data.error.split('Error:');
      data.error = data.error[data.error.length - 1];
    }

    this.emit(data.action, data);
  },

  async getLeaderboard() {
    return new Promise((resolve, reject) => {
      requestAPI(`api/statistics/leaderboard`)
      .then(res => res.success ? resolve(res.data) : reject(res.msg))
      .catch(e => reject(e));
    });
  },

  async getAffiliate() {
		return new Promise((resolve, reject) => {
			requestAPI(`api/statistics/affiliate`)
				.then((res) => resolve(res))
				.catch((e) => reject(e));
		});
	},

}