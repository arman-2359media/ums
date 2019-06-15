
const initState = {
    users: []
}

const usersReducer = (state = initState, action ) => {
    //console.log(action.payload) => [..{users}]
    if(action.type === 'USERS_FETCH'){
        return {
            ...state,
            users: action.payload
        }
    }
    if(action.type === 'NEW_USERS_ADD'){
        return {
            ...state,
            users: action.payload
        }
    }
    if(action.type === 'NEW_USERS_EDIT'){
        return {
            ...state,
            users: action.payload
        }
    }
    if(action.type === 'DELETE_USER'){
        return {
            ...state,
            users: action.payload, 
        }
   }
    return state;
}

export default usersReducer