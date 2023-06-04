import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callLoginApi } from './login.api'
import { UserTypeMenu } from '../../config'

export const login = createAsyncThunk(
    'user/login',
    async (user, { rejectWithValue }) => {
        const response = await callLoginApi(user)
        if (response.error)
            rejectWithValue(response.error)
        else
            return response
    }
)

const initialState = {
    status: 'idle',
    isLoggedin: false,
    username: '',
    menu: []
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
                state.isLoggedin = false
            })
            .addCase(login.rejected, (state) => {
                state.status = 'rejected'
                state.isLoggedin = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isLoggedin = true
                state.menu = UserTypeMenu.get(action.payload.type)
                state.username = action.payload.username
            })
    },
})

export const isLoading = (state) => state?.login?.status === 'loading'
export const isRejectedLogin = (state) => state?.login?.status === 'rejected'
export const isLoggedin = state => state?.login?.isLoggedin
export const menuList = state => state?.login?.menu
export const username = state => state?.login?.username

export default loginSlice.reducer
