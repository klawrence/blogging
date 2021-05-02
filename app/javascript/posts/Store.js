import {list} from './api'

export class Store {
  constructor() {
    this.all = []
    this.subscribers = []
  }

  async list() {
    const {posts} = await list()
    this.all = posts
    return posts
  }

  addAndNotify(post) {
    this.all = [...this.all, post]
    this.notify()
  }

  // extract this to a class
  subscribe(fn) {
    this.subscribers.push(fn)
  }

  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn)
  }

  notify() {
    //  do a dispatch thing here with a queue
    this.subscribers.forEach(fn => fn())
  }
}

export const store = new Store()