const initState = {
    display: false
}

const formDisplayReducer = (state = initState, action ) => {
    switch (action.type){
        case 'SHOW_FORM': 
            return {
                ...state,
                display: action.payload
            }
        case 'HIDE_FORM':
            return {
                ...state,
                display: action.payload
            } 

        default: 
            return state
    }
}

export default formDisplayReducer