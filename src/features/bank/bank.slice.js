import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callGetBankListApi } from './bank.api'

export const getBankList = createAsyncThunk(
    'bank/list',
    async () => {
        const response = await callGetBankListApi()
        return response
    }
)

export const selectBank = createAsyncThunk(
    'bank/select-bank', (bank) => {
        return bank
    }
)//callGetDocumentList

const initialState = {
    status: 'idle',
    bankList: [],
    selectedBank: ''
}

export const bankSlice = createSlice({
    name: 'bank',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(getBankList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getBankList.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(getBankList.fulfilled, (state, action) => {
                state.status = 'idle'
                state.bankList = action.payload
            }).addCase(selectBank.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(selectBank.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(selectBank.fulfilled, (state, action) => {
                state.status = 'idle'
                state.selectedBank = action.payload
            })
    },
})

export const bankList = (state) => state?.bank?.bankList
export const selectedBank = (state) => state?.bank?.selectedBank
export const isLoading = (state) => state?.bank?.status === 'loading'

export default bankSlice.reducer
