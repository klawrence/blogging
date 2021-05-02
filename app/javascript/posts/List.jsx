import React from 'react'
import {store} from './Store'
import {Post} from './Post'

export function List({posts}) {
  return <ul className='posts-list'>
    {
      posts.map(post => <li key={post.id}>
        <Post post={post}/>
      </li>)
    }
  </ul>
}

export default class ConnectedList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: null
    }
  }

  render() {
    const {posts} = this.state
    if(posts === null) return 'Loading…'
    return <List posts={posts} />
  }

  async componentDidMount() {
    const posts = await store.list()
    this.setState({posts})
  }
}
