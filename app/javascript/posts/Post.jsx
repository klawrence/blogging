import React from 'react'
import {fetch} from './api'
import {store} from './Store'

export function Post({post}) {
  return <div className='post'>
    <h2 className='title'>{post.title}</h2>
    <div className='body'>{post.body}</div>
  </div>
}

export default class ConnectedPost extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.store || store
    this.state = {
      post: {}
    }
  }

  render() {
    const {post} = this.state
    return <Post post={post} />
  }

  async componentDidMount() {
    const post = await this.store.find(this.props.id)
    this.setState({post})
  }
}