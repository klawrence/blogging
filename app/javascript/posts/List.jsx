import React from 'react'
import {store} from './store'
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

    this.store = this.props.store || store
    this.state = {
      posts: null
    }

    this.storeDidUpdate = this.storeDidUpdate.bind(this)
  }

  render() {
    const {posts} = this.state
    if(posts === null) return 'Loading…'
    return <List posts={posts} />
  }

  async componentDidMount() {
    const posts = await this.store.list()
    this.setState({posts})
    this.store.subscribe(this.storeDidUpdate)
  }

  componentWillUnmount() {
    this.store.unsubscribe(this.storeDidUpdate)
  }

  storeDidUpdate() {
    const posts = this.store.all
    this.setState({posts})
  }
}
