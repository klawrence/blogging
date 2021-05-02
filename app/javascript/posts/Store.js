import {list} from './api'

export class Store {
  constructor() {
    this.all = []
  }

  async list() {
    const {posts} = await list()
    this.all = posts
    return posts
  }
}

export const store = new Store()