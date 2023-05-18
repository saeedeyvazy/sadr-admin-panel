import axios from 'axios'
import { API_LOGIN_URL } from '../../constants'
import Cookies from 'universal-cookie'

export async function callLoginApi({ username, password, type, userType }) {
    try {
        const response = await axios.post(API_LOGIN_URL, { username, password, userType })
        if (response.data.success) {

            new Cookies().set('token', response.data.data.token)
            new Cookies().set('username', username)
            return { response, type, username }
        }
    } catch (error) {
        return { error }
    }
}