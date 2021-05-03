import React from 'react'

export function connectList(WrappedList, store) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.store = props.store || store
      this.state = {
        records: null
      }

      this.storeDidUpdate = this.storeDidUpdate.bind(this)
    }

    render() {
      const {records} = this.state
      if (records === null) return 'Loading…'

      const props = {
        [this.store.plural]: records
      }
      return <WrappedList {...props} />
    }

    async componentDidMount() {
      const records = await this.store.list()
      this.setState({records})
      this.store.subscribe(this.storeDidUpdate)
    }

    componentWillUnmount() {
      this.store.unsubscribe(this.storeDidUpdate)
    }

    storeDidUpdate() {
      const records = this.store.all
      this.setState({records})
    }
  }
}