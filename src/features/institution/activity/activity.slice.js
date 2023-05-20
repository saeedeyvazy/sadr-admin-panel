import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callAddActivityApi, callDeleteActivity, callFetchActivityApi } from './activity.api'

export const fetchActivity = createAsyncThunk(
    'institution/activity',
    async () => {
        const response = await callFetchActivityApi()
        return response
    }
)

export const deleteActivity = createAsyncThunk(
    'institution/delete-activity', (memberId) => {
        callDeleteActivity(memberId)
        return memberId
    }
)

export const addActivity = createAsyncThunk(
    'institution/add-activity', async (request) => {
        return await callAddActivityApi(request)
    }
)


const initialState = {
    status: 'idle',
    memberList: []
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchActivity.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchActivity.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(fetchActivity.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = action.payload
            })
            .addCase(deleteActivity.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteActivity.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(deleteActivity.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = state.memberList.filter(member => member.id != action.payload)
            })
            .addCase(addActivity.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addActivity.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(addActivity.fulfilled, (state, action) => {
                state.status = 'idle'
                state.memberList = [...state.memberList, action.payload]
            })
    },
})

export const isLoading = (state) => state?.activity?.status === 'loading'
export const memberList = (state) => state?.activity?.memberList
export default activitySlice.reducer
