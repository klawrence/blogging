import React from 'react'
import {fetch, list} from './api'
import {Post} from './Post'

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: null
    }
  }

  render() {
    const {posts} = this.state
    if(posts === null) return 'Loading…'

    return <ul>
      {
        posts.map(post => <li key={post.id}>
          <Post post={post}/>
        </li>)
      }
    </ul>
  }

  async componentDidMount() {
    const posts = list()
    this.setState({posts})
  }
}
