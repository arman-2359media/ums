
import axios from 'axios'

const usersFetch = axios.create({
    baseURL: 'https://reqres.in/api/'
})

export const usersAction = () => {
    return async (dispatch) => {

        const response_1 = await usersFetch.get('users?page=1')
        const response_2 = await usersFetch.get('users?page=2')
        const response_3 = await usersFetch.get('users?page=3')
        const response_4 = await usersFetch.get('users?page=4')

        //axios response object, happened to be named 'data'
        //dont confuse with API response object property named 'data' too
        const usersAll = [...response_1.data.data, ...response_2.data.data, ...response_3.data.data, ...response_4.data.data]

        dispatch({
            type: 'USERS_FETCH',
            payload: usersAll
        })
    
    }
    
}