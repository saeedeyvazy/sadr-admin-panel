import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callGetSubBankListApi, callGetSubBankMngListApi, callSearchSubBankMngListApi } from './subbank.api'

export const getSubBankList = createAsyncThunk(
    'subbank/list',
    async () => {
        const response = await callGetSubBankListApi()
        return response
    }
)

export const getSubBankMngList = createAsyncThunk(
    'subbank/mng-list',
    async () => {
        const response = await callGetSubBankMngListApi()
        return response
    }
)



export const searchBankMng = createAsyncThunk(
    'subbank/search-bank-mng',
    async (request) => {
        const response = await callSearchSubBankMngListApi(request)
        return response
    }
)

export const selectSubBank = createAsyncThunk(
    'subbank/select-subbank', (subbank) => {
        return subbank
    }
)

const initialState = {
    status: 'idle',
    subbankList: [],
    selectedSubBank: '',
    subBankMngList: []
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
            }).addCase(selectSubBank.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(selectSubBank.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(selectSubBank.fulfilled, (state, action) => {
                state.status = 'idle'
                state.selectedSubBank = action.payload
            }).addCase(searchBankMng.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(searchBankMng.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(searchBankMng.fulfilled, (state, action) => {
                state.status = 'idle'
                state.subbankList = action.payload
            })
    },
})

export const subbankList = (state) => state?.subbank?.subbankList
export const isLoading = (state) => state?.subbank?.status === 'loading'
export const selectedSubBank = (state) => state?.subbank?.selectedSubBank
export default subbankSlice.reducer
