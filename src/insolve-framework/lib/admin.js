import config from '../config';
import socket from '../socket';

import translateColorIntoRarity from '../helpers/translateColorIntoRarity';
import requestAPI from '../helpers/requestAPI';

import EventEmitter from '../classes/EventEmitter';

export default {
  init() {
    this.events = new EventEmitter()

    this.on = this.events.on
    this.off = this.events.off
    this.emit = this.events.emit
  },

  dispatch(data) {
    if (data.error) {
      data.error = data.error.split('Error:')
      data.error = data.error[data.error.length - 1]
    }

    this.emit(data.action, data)
  },

  createNewCase(data, id = -1) {
    return new Promise((resolve, reject) => {
      let totalPercent = 0

      for (let i in data.items) {
        totalPercent += data.items[i].percentage
        if (data.items[i].percentage <= 0) return reject('Items can\'t have a 0% chance.')
      }

      /*if(data.items.length < 2) return reject(`Please add at least 2 items.`);
      if(totalPercent !== 100) return reject(`Total odds don't add up to 100% - Please fix.`);
      if(!data.title || data.title == '') return reject(`Please input a valid title.`);
      if(data.price <= 0) return reject(`Please input a valid price.`);
      if(!data.image) return reject(`Please add an image first.`);*/

      //
      const form = new FormData()
      form.append('image', data.image)
      form.append('items', JSON.stringify(data.items))
      form.append('title', data.title)
      form.append('price', data.price)
      form.append('isEdit', id == -1 ? 'false' : 'true')
      form.append('type', data.type)
      form.append('id', id)

      requestAPI('api/admin/createNewCase', form, true)
        .then(res => (res.success ? resolve(res) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },

  async getAllItems() {
    return new Promise((resolve, reject) => {
      requestAPI('api/admin/getAllItems')
        .then(res => (res.success ? resolve(res.items) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },

  async getAllCases() {
    return new Promise((resolve, reject) => {
      requestAPI('api/admin/getAllCases')
        .then(res => (res.success ? resolve(res.cases) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },

  async getAllTransactions() {
    return new Promise((resolve, reject) => {
      requestAPI('api/getTransactions')
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },

  async deleteCase(id) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/admin/deleteCase/${id}`)
        .then(res => (res.success ? resolve(res) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },

  async featureCase(id, ft) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/admin/featureCase/${id}/${ft}`)
        .then(res => (res.success ? resolve(res) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },

  async manageTransaction(id, isApproved) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/admin/transaction/${id}/${isApproved}`)
        .then(res => (res.success ? resolve(res.msg) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },

  async getCase(id) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/admin/getCase/${id}`)
        .then(res => (res.success ? resolve(res.data) : reject(res.msg)))
        .catch(e => reject(e))
    })
  },
}
