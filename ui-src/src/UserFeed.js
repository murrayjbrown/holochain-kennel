import React, { Component } from 'react'
import Woof from './components/Woof'

class UserFeed extends Component {
  componentDidMount () {
    this.setupForNewUser()
  }
  componentDidUpdate (prevProps) {
    if (prevProps.handle !== this.props.handle) {
      this.setupForNewUser()
    }
  }
  setupForNewUser () {
    this.props.getPosts(this.props.handle)
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.props.getPosts(this.props.handle)
    }, 1000)
  }
  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval)
  }
  render () {
    return (
      <div id='woofs'>
        <h2 id='user-header'>{this.props.handle}</h2>
        {this.props.postList.map(post => <Woof post={post} key={post.stamp} />)}
      </div>
    )
  }
}

export default UserFeed
