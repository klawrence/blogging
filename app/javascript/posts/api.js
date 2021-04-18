// posts/api.js
import {server} from 'remote/server'
import * as axios from 'axios'


export function fetch(id) {
  return server.send(`/posts/${id}.json`)
}

export function create(post) {
  const request = {
    url: '/posts.json',
    method: 'post',
    data: {post},
    headers: {
      'X-CSRF-Token': getCSRFToken(),
    }
  }

  return axios(request)
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
}

export function getCSRFToken() {
  const csrfTag = document.querySelector('meta[name=csrf-token]') || {content: 'missing-csrf-token'}
  return csrfTag.content
}