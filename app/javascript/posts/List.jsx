import React from 'react'
import {list} from './api'
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
    const response = await list()
    this.setState({posts: response.posts})
  }
}
