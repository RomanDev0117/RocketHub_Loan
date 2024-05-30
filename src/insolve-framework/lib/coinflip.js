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

		this.events.addCustomEvent("games", () => {
			socket.emit("coinflip", { action: "request games" });
		});

		socket.on("coinflip", (data) => this.dispatch(data));
		socket.on("giveaway", (data) =>
			this.dispatch({
				...data,
				action: `giveaway-${data.action}`,
			})
		);

		socket.on("giveaway-big", (data) =>
			this.dispatch({
				...data,
				action: `giveaway-big-${data.action}`,
			})
		);
	},

	dispatch(data) {
		if (data.action !== "giveaway-big-update" && data.action !== "giveaway-update");
		if (data == null) return;

		this.emit(data.action, data);
	},

	getAdminItems() {
		socket.emit("coinflip", { action: "get admin items", token: localStorage.getItem("token") });
	},

	withdrawAdminItems(items) {
		socket.emit("coinflip", { action: "withdraw admin items", items: items, token: localStorage.getItem("token") });
	},

	didJoin() {
		socket.emit("coinflip", { action: "giveaway-flash-did-join", token: localStorage.getItem("token") });
	},

	didJoinBig() {
		socket.emit("coinflip", { action: "giveaway-big-did-join", token: localStorage.getItem("token") });
	},

	joinFlashGiveaway() {
		socket.emit("coinflip", { action: "giveaway-flash-join", token: localStorage.getItem("token") });
	},

	joinBigGiveaway() {
		socket.emit("coinflip", { action: "giveaway-big-join", token: localStorage.getItem("token") });
	},

	createNewGame({ items, appid, side }) {
		socket.emit("coinflip", { action: "create game", appid, items, side, gameId: 0, token: localStorage.getItem("token") });
	},

	joinGame({ items, appid, gameId }) {
		socket.emit("coinflip", { action: "join game", items, appid, gameId, token: localStorage.getItem("token") });
	},

	callBot(gameId) {
		socket.emit("coinflip", { action: "call bot", gameId: gameId, token: localStorage.getItem("token") });
	},

	// async collectEarnings() {
	//   return new Promise((resolve, reject) => {
	//     requestAPI(`api/user/collectEarnings`)
	//     .then(res => res.success ? resolve(res) : reject(res.msg))
	//     .catch(e => reject(e));
	//   });
	// }
};
