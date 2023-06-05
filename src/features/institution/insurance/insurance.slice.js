import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callFetchInsurance, callUpdateInsuranceApi } from './insurance.api'

export const fetchInsurance = createAsyncThunk(
    'institution/fetch-insurance',
    async () => {
        const response = await callFetchInsurance()
        return response
    }
)


export const updateInsurance = createAsyncThunk(
    'institution/update-insurance',
    async (request) => {
        const response = await callUpdateInsuranceApi(request)
        return response
    }
)

const initialState = {
    status: 'idle',
    list: []
}

export const insuranceSlice = createSlice({
    name: 'insurance',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchInsurance.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchInsurance.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(fetchInsurance.fulfilled, (state, action) => {
                state.status = 'idle'
                state.list = action.payload
            })
            .addCase(updateInsurance.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateInsurance.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(updateInsurance.fulfilled, (state, action) => {
                state.status = 'idle'
            })
    },
})

export const isLoading = (state) => state?.insurance?.status === 'loading'
export const list = (state) => state?.insurance?.list
export default insuranceSlice.reducer
