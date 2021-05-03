import {server} from 'react-to-rails/server'

export function fetch(id) {
  return server.get(`/posts/${id}.json`)
}

export function list() {
  return server.get(`/posts.json`)
}

export function create(post) {
  return server.post('/posts.json', {post})
}

