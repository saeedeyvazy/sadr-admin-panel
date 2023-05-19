import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callAddDirectorBoardApi, callDeleteBoardMember, callFetchDirectorApi } from './director.api'

export const fetchDirectorBoard = createAsyncThunk(
    'institution/director',
    async () => {
        const response = await callFetchDirectorApi()
        return response
    }
)

export const deleteBoardMember = createAsyncThunk(
    'institution/delete-member', (memberId) => {
        callDeleteBoardMember(memberId)
        return memberId
    }
)

export const addBoardMember = createAsyncThunk(
    'institution/add-member', (request) => {
        callAddDirectorBoardApi(request)
        return request
    }
)


const initialState = {
    status: 'idle',
    memberList: []
}

export const directorSlice = createSlice({
    name: 'director',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchDirectorBoard.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchDirectorBoard.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(fetchDirectorBoard.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = action.payload
            })
            .addCase(deleteBoardMember.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteBoardMember.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(deleteBoardMember.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = state.memberList.filter(member => member.id != action.payload)
            })
            .addCase(addBoardMember.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addBoardMember.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(addBoardMember.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = [...state.memberList, action.payload]
            })
    },
})

export const isLoading = (state) => state?.director?.status === 'loading'
export const memberList = (state) => state?.director?.memberList
export default directorSlice.reducer
