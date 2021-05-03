import {server} from './server'

export function fetch(type, id) {
  return server.get(pathToShow(type, id))
}

export function list(type) {
  return server.get(pathToIndex(type))
}

export function create(type, record) {
  return server.post(pathToIndex(type), {[type]: record})
}

function pathToShow(type, id) {
  return `/${type}s/${id}.json`
}

function pathToIndex(type) {
  return `/${type}s.json`
}

