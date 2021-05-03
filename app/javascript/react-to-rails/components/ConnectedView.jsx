import React from 'react'
import {store} from '../../posts/store'
import {Post} from '../../posts/Post'

export function connectView(WrappedView, store) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.store = this.props.store || store
      this.state = {
        record: {}
      }
    }

    render() {
      const {record} = this.state
      const props = {
        [this.store.type]: record
      }
      return <WrappedView {...props} />
    }

    async componentDidMount() {
      const record = await this.store.find(this.props.id)
      this.setState({record})
    }
  }
}