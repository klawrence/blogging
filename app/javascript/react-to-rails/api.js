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
  return `/${pluralize(type)}/${id}.json`
}

function pathToIndex(type) {
  return `/${pluralize(type)}.json`
}

export function pluralize(type) {
  return `${type}s`
}

