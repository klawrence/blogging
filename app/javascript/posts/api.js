import {server} from 'remote/server'

export function fetch(id) {
  return server.send(`/posts/${id}.json`)
}

export function create(post) {
  return post('/posts.json', 'post', {post})
}

