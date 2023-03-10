import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callCreateRepairApi } from './repair.api'

export const createRepair = createAsyncThunk(
    'repair/create',
    async (request) => {
        const response = await callCreateRepairApi(request)
        return response
    }
)
const initialState = {
    status: 'idle',
    bankList: [],
    newRepair: {}
}

export const repairSlice = createSlice({
    name: 'repair',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(createRepair.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createRepair.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(createRepair.fulfilled, (state, action) => {
                state.status = 'idle'
                state.newRepair = action.payload
            })
    },
})

export const bankList = (state) => state?.repair?.bankList
export const selectedBank = (state) => state?.repair?.selectedBank
export const isLoading = (state) => state?.repair?.status === 'loading'

export default repairSlice.reducer
