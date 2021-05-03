import {list, fetch, create, pluralize} from './api'
import {by_created_at} from './sorting'

export default class Store {
  constructor(type) {
    this.type = type
    this.plural = pluralize(type)
    this.all = []
    this.by_id = {}
    this.subscribers = []
  }

  async list() {
    const response = await list(this.type)
    const records = response[this.plural]
    this.addAndNotify(records)
    return records
  }

  async find(id) {
    let record = this.by_id[id]
    if(! record) {
      record = await fetch(this.type, id)
      this.addAndNotify(record)
    }
    return record
  }

  async create(record) {
    record = await create(this.type, record)
    // todo don't add it to the store unless it is valid
    this.addAndNotify(record)
    return record
  }

  addAndNotify(record_or_records) {
    if(Array.isArray(record_or_records))
      record_or_records.forEach(record => this.add(record))
    else
      this.add(record_or_records)

    this.all = Object.values(this.by_id).sort(by_created_at)
    this.notify()
  }

  add(record) {
    this.by_id[record.id] = record
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
