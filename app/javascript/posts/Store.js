import {list, fetch} from './api'

export class Store {
  constructor() {
    this.all = []
    this.by_id = {}
    this.subscribers = []
  }

  async list() {
    const {posts} = await list()
    this.all = posts
    return posts
  }

  async find(id) {
    let post = this.by_id[id]
    if(! post) {
      post = await fetch(id)
      this.addAndNotify(post)
    }
    return post
  }

  addAndNotify(post) {
    this.by_id = {[post.id]: post}
    this.all = Object.values(this.by_id) // TODO sort this by the default sort
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