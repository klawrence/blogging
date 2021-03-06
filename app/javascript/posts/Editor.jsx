import React from 'react'
import {store} from './store'
import {signedIn} from '../users/current_user'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store || store
    this.state = {
      post: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    const {post} = this.state

    if(!signedIn()) return null

    return <form onChange={this.handleChange}
                 onSubmit={this.handleSubmit}>
      <input type='text' name='title' className='title' defaultValue={post.title} />
      <textarea name='body' className='body' defaultValue={post.body} />
      <div className='actions'>
        <input type='submit' className='button' />
      </div>
    </form>
  }

  handleChange(event) {
    const {name, value} = event.target
    const post = {
      ...this.state.post,
      [name]: value
    }
    this.setState({post})
  }

  async handleSubmit(event) {
    event.preventDefault()

    const {post} = this.state
    await this.store.create(post)
  }
}