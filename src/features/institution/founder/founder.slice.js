import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callAddFounderApi, callDeleteFounder, callFetchFounderApi } from './founder.api'

export const fetchFounderGroup = createAsyncThunk(
    'institution/founder',
    async () => {
        const response = await callFetchFounderApi()
        return response
    }
)

export const deleteFounder = createAsyncThunk(
    'institution/delete-founder', (memberId) => {
        callDeleteFounder(memberId)
        return memberId
    }
)

export const addFounder = createAsyncThunk(
    'institution/add-founder', async (request) => {
        return await callAddFounderApi(request)
    }
)


const initialState = {
    status: 'idle',
    memberList: []
}

export const founderSlice = createSlice({
    name: 'founder',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchFounderGroup.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchFounderGroup.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(fetchFounderGroup.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = action.payload
            })
            .addCase(deleteFounder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteFounder.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(deleteFounder.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = state.memberList.filter(member => member.id != action.payload)
            })
            .addCase(addFounder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addFounder.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(addFounder.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = [...state.memberList, action.payload]
            })
    },
})

export const isLoading = (state) => state?.founder?.status === 'loading'
export const memberList = (state) => state?.founder?.memberList
export default founderSlice.reducer
