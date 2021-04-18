// posts/api.js
import * as axios from 'axios'

export function fetch(id) {
  const request = {
    url: `/posts/${id}.json`
  }
  return axios(request).then(response => response.data)
}
