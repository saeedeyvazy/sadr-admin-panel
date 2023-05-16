import axios from 'axios'
import { API_LOGIN_URL } from '../../constants'
import Cookies from 'universal-cookie'

export async function callLoginApi({ username, password, type }) {
    try {
        const response = await axios.post(API_LOGIN_URL, { username, password })
        if (response.data.success) {

            new Cookies().set('token', response.data.data.token)
            return { response, type }
        }
    } catch (error) {
        return { error }
    }
}