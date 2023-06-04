import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callAddClassApi, callDeleteClass } from './regClass.api'


export const registerClass = createAsyncThunk(
    'institution/register-class', async (request, { rejectWithValue }) => {
        const response = await callAddClassApi(request)
        if (response.error)
            rejectWithValue(response.error)
        else
            return response
    }
)

export const deleteClass = createAsyncThunk(
    'institution/delete-class', (classCode) => {
        callDeleteClass(classCode)
        return classCode
    }
)

const initialState = {
    status: 'idle',
    memberList: []
}

export const regClassSlice = createSlice({
    name: 'regclass',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(registerClass.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerClass.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(registerClass.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = [...state.memberList, action.payload]
            })
    },
})

export const regClassLoading = (state) => state?.regClass?.status === 'loading'
export const memberList = (state) => state?.regClass?.memberList
export default regClassSlice.reducer
