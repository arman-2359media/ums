import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import './style/style.css'
import App from './component/App'
import {usersReducer} from './reducers/usersReducer'

const store = createStore(usersReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.querySelector('#root'))