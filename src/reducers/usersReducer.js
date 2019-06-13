
const initState = {
    users: ''
}

export const usersReducer = (state = initState, action ) => {
    //console.log(action.payload) => [..{users}]
    if(action.type === 'USERS_FETCH'){
        return {
            ...state,
            users: action.payload
        }
    }
    return state;
}