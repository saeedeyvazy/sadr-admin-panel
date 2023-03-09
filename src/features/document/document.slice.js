import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { callGetDocStatusListApi, callGetDocumentList } from './document.api'

export const getDocStatusList = createAsyncThunk(
    'document/document-status',
    async () => {
        const response = await callGetDocStatusListApi()
        return response
    }
)

export const selectDoc = createAsyncThunk(
    'document/select-doc-status', (docStatus) => {
        return docStatus
    }
)//callGetDocumentList

export const getDocumentList = createAsyncThunk(
    'document/doc-list', async (status) => {
        const response = await callGetDocumentList(status)
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
    selectedDocStatus: 0,
    docList: []
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
            }).addCase(selectDoc.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(selectDoc.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(selectDoc.fulfilled, (state, action) => {
                state.status = 'idle'
                state.selectedDocStatus = action.payload
            }).addCase(getDocumentList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getDocumentList.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(getDocumentList.fulfilled, (state, action) => {
                state.status = 'idle'
                state.docList = action.payload
            })
    },
})

export const docStatusList = (state) => state?.document?.docStatusList
export const docList = (state) => state?.document?.docList
export const isLoading = (state) => state?.document?.status === 'loading'
export const selectedDocStatusId = (state) => state?.document?.selectedDocStatusId

export default documentSlice.reducer
