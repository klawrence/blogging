import React from 'react'
import * as axios from 'axios'

export function Post({post}) {
  return <div className='post'>
    <h2 className='title'>{post.title}</h2>
    <div className='body'>{post.body}</div>
  </div>
}

export default class ConnectedPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {}
    }
  }
  render() {
    const {post} = this.state
    return <Post post={post} />
  }

  async componentDidMount() {
    const post = await fetch(1)
    this.setState({post})
  }
}