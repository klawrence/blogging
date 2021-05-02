import {list, fetch, create} from './api'

export class Store {
  constructor() {
    this.all = []
    this.by_id = {}
    this.subscribers = []
  }

  async list() {
    const {posts} = await list()
    this.addAndNotify(posts)
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

  async create(post) {
    post = await create(post)
    // todo don't add it to the store unless it is valid
    this.addAndNotify(post)
    return post
  }

  addAndNotify(post_or_posts) {
    if(Array.isArray(post_or_posts))
      post_or_posts.forEach(post => this.add(post))
    else
      this.add(post_or_posts)

    this.all = Object.values(this.by_id) // TODO sort this by the default sort
    this.notify()
  }

  add(post) {
    this.by_id = {[post.id]: post}
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