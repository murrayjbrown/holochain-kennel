import { connect } from 'react-redux'
import NewWoof from './NewWoof'
import {
  post
} from './actions'

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: (message, then) => {
      dispatch(post(message, then))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewWoof)
