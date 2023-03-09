import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callGetSubBankListApi } from './subbank.api'

export const getSubBankList = createAsyncThunk(
    'subbank/list',
    async () => {
        const response = await callGetSubBankListApi()
        return response
    }
)

const initialState = {
    status: 'idle',
    subbankList: [],
}

export const subbankSlice = createSlice({
    name: 'subbank',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getSubBankList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getSubBankList.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(getSubBankList.fulfilled, (state, action) => {
                state.status = 'idle'
                state.subbankList = action.payload
            })
    },
})

export const subbankList = (state) => state?.subbank?.subbankList
export const isLoading = (state) => state?.subbank?.status === 'loading'

export default subbankSlice.reducer
