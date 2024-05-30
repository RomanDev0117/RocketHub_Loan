export default class EventEmitter {
  constructor() {
    this.subs = {};
    this.props = {};
    this.events = {};

    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.emit = this.emit.bind(this);
  }

  on(event, callback, additionalData) {
    if(!this.subs[event]) this.subs[event] = [];
    this.subs[event].push(callback);

    if(this.events[event]) this.events[event](additionalData);
  }

  off(event, callback) {
    for(let i in this.subs[event]) {
      if(this.subs[event][i] == callback) {
        this.subs[event].splice(i, 1);
      }
    }
  }

  emit(event, data) {
    if(this.subs[event]) {
      for(let i in this.subs[event]) {
        this.subs[event][i](this.props[event] ? data[this.props[event]] : data);
      }
    }
  }

  addCustomProperty(event, property) {
    this.props[event] = property;
  }

  addCustomEvent(event, callback) {
    this.events[event] = callback;
  }
}
