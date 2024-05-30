import requestAPI from '../helpers/requestAPI';

import EventEmitter from '../classes/EventEmitter';

export default {
  init() {
    this.events = new EventEmitter();

    this.on = this.events.on;
    this.off = this.events.off;
    this.emit = this.events.emit;
  },


  async handleBuy(item, price) {
    return new Promise((resolve, reject) => {
      requestAPI(`api/waxpeer/buy/${item}/${price}`, {
        method: 'POST',
        body: JSON.stringify({
          item,
          price,
        }),
      })
        .then((res) => {
          resolve(res);
          return res;
        })
        .catch((e) => reject(e));
    });
  },
};
