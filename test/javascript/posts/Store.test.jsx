import {Store} from 'posts/Store'
import {server} from 'remote/server'

describe('The post store', () => {
  let store
  server.send = jest.fn()
  const post = {
    id: 1,
    title: 'The Title',
    body: 'The body.',
  }

  beforeEach( () => {
    store = new Store()
  })

  test('is initially empty', () => {
    expect(store.all).toEqual([])
  })

  test('fetches the list of posts from the server', async () => {
    server.send.mockReturnValue({posts: [post]})

    const posts = await store.list()
    expect(posts.length).toEqual(1)
    expect(posts[0].title).toEqual('The Title')
    expect(store.all).toEqual(posts)

    expect(server.send).toBeCalledWith('/posts.json')
  })

  test('notify subscribers when a post is added to the store', async () => {
    const subscriber = jest.fn()
    store.subscribe(subscriber)

    store.addAndNotify(post)

    expect(subscriber).toBeCalled()
    expect(store.all[0]).toEqual(post)
  })

})
