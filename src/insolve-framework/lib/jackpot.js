const config = require("../config");
const insolve = require("../index");
const socket = require("../socket");

const requestAPI = require("../helpers/requestAPI");

const EventEmitter = require("../classes/EventEmitter");

module.exports = {
	init() {
		this.events = new EventEmitter();

		this.on = this.events.on;
		this.off = this.events.off;
		this.emit = this.events.emit;

		socket.on("jackpot", data => {
			this.dispatch(data);
		});
	},

	dispatch(data) {
		console.log("DISPATCH", data);
		if (data == null) return;
		this.emit(data.action, data);
	},

	async getCurrentJackpot() {
		return new Promise((resolve, reject) => {
			requestAPI(`api/getCurrentJackpot`)
				.then(res => {
					if (res.success) resolve(res);
					else reject(res);
				})
				.catch(e => reject(e));
		});
	},

    async getJackpots(skip, limit) {
        return new Promise((resolve, reject) => {
            requestAPI(`api/getJackpots`, {skip, limit})
                .then(res => {
                    if (res.success) resolve(res);
                    else reject(res);
                })
                .catch(e => reject(e));
        });
    },

    subscribe(id) {
		socket.emit("jackpot", { action: "subscribe", id: id, token: localStorage.getItem("token") });
	},

	unsubscribe(id) {
		socket.emit("jackpot", { action: "unsubscribe", id: id, token: localStorage.getItem("token") });
	},

	async joinJackpotGame(cases) {
		return new Promise((resolve, reject) => {
			requestAPI(`api/jackpot/joinJackpot`, { cases })
				.then(res => {
					if (res.success) resolve(res);
					else reject(res);
				})
				.catch(e => reject(e));
		});
	},

	// requestData() {
	// 	socket.emit("coinflip", { action: "request data" });
	// },

	// joinGame({ items, appid }) {
	// 	socket.emit("jackpot", { action: "join game", items, appid, token: localStorage.getItem("token") });
	// },

	// getAdminItems() {
	// 	socket.emit("jackpot", { action: "get admin items", token: localStorage.getItem("token") });
	// },

	// withdrawAdminItems(items) {
	// 	socket.emit("jackpot", { action: "withdraw admin items", items: items, token: localStorage.getItem("token") });
	// },
};
