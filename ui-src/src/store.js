import { compact } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
import promiseMiddleware from 'redux-promise'
import { requestSendingMiddleware, hcMiddleware } from 'hc-redux-middleware'
import kennelApp from './reducers'

const middleware = compact([
    hcMiddleware,
    requestSendingMiddleware,
    promiseMiddleware
])

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
function CreateStore() {
  return createStore(kennelApp, undefined, composeEnhancers(applyMiddleware(...middleware)))
}

export default CreateStore;
