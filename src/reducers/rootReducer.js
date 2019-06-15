import {combineReducers} from 'redux'

import formDisplayReducer from './formDisplayReducer'
import usersReducer from './usersReducer'
import editUserReducer from './editUserReducer'


export default combineReducers({
    formDisplayReducer,
    usersReducer, 
    editUserReducer
})