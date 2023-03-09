import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callGetDocStatusListApi } from './document.api'

export const getDocStatusList = createAsyncThunk(
    'document/document-status',
    async () => {
        const response = await callGetDocStatusListApi()
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
    docStatusList: [],
}

export const documentSlice = createSlice({
    name: 'document',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getDocStatusList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getDocStatusList.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(getDocStatusList.fulfilled, (state, action) => {
                state.status = 'idle'
                state.docStatusList = action.payload
            })
    },
})

export const docStatusList = (state) => state?.document?.docStatusList
export const isLoading = (state) => state?.document?.status === 'loading'

export default documentSlice.reducer
