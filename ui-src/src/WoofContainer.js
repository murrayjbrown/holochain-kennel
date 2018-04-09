import { connect } from 'react-redux'
import Woof from './components/Woof'
import { getPost } from './actions'

const mapStateToProps = (state, ownProps) => {
  const woofHash = ownProps.match.params.woofHash
  const arrayOfPosts = Object.keys(state.posts).map(postStamp => state.posts[postStamp])
  let post = arrayOfPosts.find(p => p.hash === woofHash)
  if (post) {
    post = Object.assign({}, post, {
      userHandle: state.handles[post.author]
    })
  }
  return {
    post
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPost: () => {
      dispatch(getPost(ownProps.match.params.woofHash))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Woof)
