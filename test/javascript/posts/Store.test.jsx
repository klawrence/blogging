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

  test('notifies subscribers when a post is added to the store', async () => {
    const subscriber = jest.fn()
    store.subscribe(subscriber)

    store.addAndNotify(post)

    expect(subscriber).toBeCalled()
    expect(store.all[0]).toEqual(post)
  })

  test('can fetch a single post', async () => {
    server.send.mockReturnValue(post)

    const found = await store.find(1)
    expect(found).toEqual(post)

    expect(server.send).toBeCalledWith('/posts/1.json')
  })

  test('returns a local copy of a post if it has one', async () => {
    store.addAndNotify(post)

    const found = await store.find(1)
    expect(found).toEqual(post)

    expect(server.send).toHaveBeenCalledTimes(0)
  })


  test('create a post and add it to the store', async () => {
    const new_post = {title: 'title', body: 'body'}
    server.send.mockReturnValue({id: 123, ...new_post})

    const created = await store.create(new_post)
    expect(123).toEqual(created.id)

    expect(server.send).toBeCalledWith('/posts.json', 'post', {post: new_post})
  })

})
