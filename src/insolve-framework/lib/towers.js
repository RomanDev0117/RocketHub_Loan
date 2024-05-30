const socket = require("../socket")
const requestAPI = require("../helpers/requestAPI")
const EventEmitter = require("../classes/EventEmitter")

module.exports = {
  init() {
    this.events = new EventEmitter()

    this.on = this.events.on
    this.off = this.events.off
    this.emit = this.events.emit

    socket.on("towers", data => {
      this.dispatch(data)
    })
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split("Error:")
      data.error = data.error[data.error.length - 1]
    }

    this.emit(data.action, data)
  },

  subscribe(id) {
    socket.emit("towers", { action: "subscribe", id: id, token: localStorage.getItem("token") })
  },

  unsubscribe(id) {
    socket.emit("towers", { action: "unsubscribe", id: id, token: localStorage.getItem("token") })
  },

  async create(data) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/towers/create`, { data: data })
        .then(res => (res.success ? resolve(res.id) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },
  async checkAlternative(data) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/towers/checkalternative`, { data: data })
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },
  async cashout() {
    return new Promise((resolve, reject) => {
      requestAPI(`api/towers/cashout`)
        .then(res => {
          if (res.success) resolve(res)
          else reject(res.msg)
        })
        .catch(e => reject(e))
    })
  },
  async getCurrentGame() {
    return new Promise((resolve, reject) => {
      requestAPI(`api/towers/getcurrentgame`)
        .then(res => {
          if (res.success) resolve(res.data)
          else reject(res.msg)
        })
        .catch(e => reject(e))
    })
  },
  async getHistory() {
    return new Promise((resolve, reject) => {
      requestAPI(`api/towers/gethistory`)
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },
}
