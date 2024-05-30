import config from "../config";
import { userApi } from "../index";
import socket from "../socket";

import translateColorIntoRarity from "../helpers/translateColorIntoRarity";
import requestAPI from "../helpers/requestAPI";

import EventEmitter from "../classes/EventEmitter";
import { getToken } from "../../utils/auth.utils";

export default {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;
    this.socket = socket;

    this.events.addCustomProperty("balance", "balance");
    this.events.addCustomProperty("tickets", "tickets");

    this.events.addCustomEvent("signed in", () => {
      if (this.data) this.emit("signed in", this.data);
    });

    this.events.addCustomEvent("update data", () => {
      this.afterConnection();
    });

    this.events.addCustomEvent("balance", () => {
      // const token = getTokenFromCookie();
      socket.emit("user", {
        action: "request balance",
        token: getToken(), // getTokenFromCookie(),
      });
    });

    this.events.addCustomEvent("tickets", () => {
      socket.emit("user", {
        action: "request tickets",
        // token: getToken(),
      });
    });

    this.events.addCustomEvent("update value", () => {
      socket.emit("user", {
        action: "request value",
        // token: getToken(),
      });
    });

    this.data = undefined;

    // todo: ask server again after successful connection
    this.afterConnection();

    socket.on("connect", () => {
      if (this.data) return;

      this.afterConnection();
    });

    socket.on("user-count-change", (data) => {
      this.dispatch({ action: "user-count-change", count: data });
    });

    socket.on("status", (data) =>
      this.dispatch({ action: "status", status: data })
    );
    socket.on("user", (data) => this.dispatch(data));
    socket.on("isInDiscord", (data) => {
      this.dispatch({ action: "isInDiscord", isInDiscord: data });
    });

    socket.on("notification", (data) => this.dispatch(data));
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split("Error:");
      data.error = data.error[data.error.length - 1];
    }

    this.emit(data.action, data);
  },

  afterConnection() {
    if (!userApi.isToken()) return;

    userApi
      .getUserDataFromToken()
      .then((data) => {
        this.data = data;
        if (this.data) this.emit("signed in", this.data);
      })
      .catch((e) => {});

    socket.emit("user", {
      action: "handshake",
      token: getToken(),
    });
  },

  on() {
    return;
  },
  off() {
    return;
  },

  get(key) {
    if (!this.data) return undefined;
    if (key == "token") return getToken();

    return key ? this.data[key] : this.data;
  },

  isToken() {
    let token = getToken();

    return token !== null && token.replace(/\s/g, "").length >= 1;
  },

  isSignedIn() {
    return typeof this.data == "undefined" ? false : true;
  },

  getStatus() {
    socket.emit("get status");
  },

  async getFreeCaseData() {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/getFreeCaseData")
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async openCase() {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/openCase")
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getAdmin() {
    return new Promise((resolve, reject) => {
      requestAPI("api/admin")
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getAdminTxns() {
    return new Promise((resolve, reject) => {
      requestAPI("api/txns")
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  },

  async getAdminCfs() {
    return new Promise((resolve, reject) => {
      requestAPI("api/cfs")
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  },

  async getAffData() {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/affdata")
        .then((res) => resolve(res))
        .catch((e) => reject(e));
    });
  },

  async toggleGames() {
    socket.emit("games", {
      action: "toggle",
      token: getToken(),
    });
  },

  subToCodes() {
    socket.emit("user", {
      action: "sub to codes",
      token: getToken(),
    });
  },

  unsubToCodes() {
    socket.emit("user", {
      action: "unsub to codes",
      token: getToken(),
    });
  },

  async newTransaction({ type, data }) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/newTransaction/${type}`, data)
        .then((res) => {
          if (res.success) resolve(res);
          else reject(res);
        })
        .catch((e) => reject(e));
    });
  },

  acceptTos() {
    requestAPI("api/user/acceptTos")
      .then((res) => (res.success ? resolve(res) : reject(res.msg)))
      .catch((e) => reject(e));
  },

  async getUserDataFromToken() {
    return new Promise((resolve, reject) => {
      requestAPI("api/user")
        .then((res) => (res.success ? resolve(res.user) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getUserData(steamid) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/user/${steamid}`)
        .then((res) => (res.success ? resolve(res.user) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getUserGraphData(steamid) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/user/graph/${steamid}`)
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getTransactions(steamid) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/transactions/${steamid}`)
        .then((res) => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getCodes() {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/getCreatorCode")
        .then((res) => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async createCode(code, uses) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/user/createCreatorCode/${code}/${uses}`)
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getSteamItems(appid, forceNew = false, isBot = false) {
    return new Promise((resolve, reject) => {
      requestAPI(
        `api/user/getSteamInventory/${appid}/${forceNew ? 1 : 0}/${
          isBot ? 1 : 0
        }`
      )
        .then((res) => {
          if (!res.success || !res.items) return reject(res.msg);

          for (let i in res.items) {
            res.items[i].rarity = translateColorIntoRarity(res.items[i].color);
            res.items[i].price = parseFloat(res.items[i].price).toFixed(2);
            res.items[i].show = true;
            res.items[i].forceHide = false;
          }

          resolve(res);
        })
        .catch((e) => reject(e));
    });
  },

  async useRefCode(code) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/user/useCode/${code}`)
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async updateRefCode(code) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/user/updateCode/${code}`)
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async collectEarnings() {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/collectEarnings")
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async useCreatorCode(code) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/user/useCreatorCode/${code}`)
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async updateClientSeed(seed) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/user/updateClientSeed/${seed}`)
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async updateTradelink(link) {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/updateTradelink", { link })
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async updateEmail(email) {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/updateEmail", { email })
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },

  async getSkinsBackLink() {
    return new Promise((resolve, reject) => {
      requestAPI("api/skinsback")
        .then((res) =>
          res.success ? resolve(res.url) : reject(res.msg || res.error)
        )
        .catch((e) => {
          reject(e);
        });
    });
  },

  async selfBan(timespan) {
    return new Promise((resolve, reject) => {
      requestAPI("api/user/selfBan", { timespan })
        .then((res) => (res.success ? resolve(res) : reject(res.msg)))
        .catch((e) => reject(e));
    });
  },
};
