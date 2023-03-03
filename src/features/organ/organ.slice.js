import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callGetOrganListApi } from './organ.api'

export const getOrganList = createAsyncThunk(
    'organ/organ-list',
    async () => {
        const response = await callGetOrganListApi()
        return response
    }
)
// export const createorgan = createAsyncThunk(
//     'organ/add-organ',
//     async (organInfo) => {
//         const response = await callCreateorganApi(organInfo)
//         return response
//     }
// )
// export const deleteorgan = createAsyncThunk(
//     'organ/delete-organ',
//     async (id) => {
//         const response = await callDeleteorganApi(id)
//         return response
//     }
// )

const initialState = {
    status: 'idle',
    organList: [],
}

export const organSlice = createSlice({
    name: 'organ',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getOrganList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOrganList.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(getOrganList.fulfilled, (state, action) => {
                state.status = 'idle'
                state.organList = action.payload
            })
    },
})

export const organList = (state) => state?.organ?.organList
export const isLoading = (state) => state.organ.status === 'loading'

export default organSlice.reducer
