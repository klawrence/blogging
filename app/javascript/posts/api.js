// posts/api.js
import {server} from 'remote/server'

export function fetch(id) {
  return server.send(`/posts/${id}.json`)
}