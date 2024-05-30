const socket = require('../socket');
const user = require('./user');
// const chat = require('./chat');
const EventEmitter = require('../classes/EventEmitter');

module.exports = {
	init() {
		this.events = new EventEmitter();

		this.on = this.events.on;
		this.off = this.events.off;
		this.emit = this.events.emit;

		this.events.addCustomEvent('new item', (additionalData) => {
			socket.emit('p2p', {
				action: 'request active deposits',
				token: user.get('token'),
				showEverything: additionalData
					? additionalData.showEverything
					: undefined,
				appid: additionalData ? additionalData.appid : undefined,
			});
		});

		socket.on('p2p', (data) => this.dispatch(data));
	},

	dispatch(data) {
		if (data.error) {
			data.error = data.error.split('Error:');
			data.error = data.error[data.error.length - 1];
		}

		this.emit(data.action, data);
	},

	deposit(items, appid = 730) {
		socket.emit('p2p', {
			action: 'deposit',
			token: user.get('token'),
			items: items,
			appid: appid,
		});
	},

	cancelDeposit(item, appid = 730) {
		socket.emit('p2p', {
			action: 'cancel deposit',
			token: user.get('token'),
			items: [item],
			appid: appid,
		});
	},

	async getSteamItems(appid) { },
};
