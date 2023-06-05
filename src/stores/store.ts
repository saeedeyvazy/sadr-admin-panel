import { configureStore } from '@reduxjs/toolkit'
import styleReducer from './styleSlice'
import mainReducer from './mainSlice'
import organReducer from '../features/organ/organ.slice'
import documentSlice from '../features/document/document.slice'
import bankSlice from '../features/bank/bank.slice'
import subbankSlice from '../features/subbank/subbank.slice'
import repairSlice from '../features/repair/repair.slice'
import loginSlice from '../features/login/login.slice'
import boardDirectorSlice from '../features/institution/director/director.slice'
import founderGroupSlice from '../features/institution/founder/founder.slice'
import activitySlice from '../features/institution/activity/activity.slice'
import regClassSlice from "../features/institution/class/register/regClass.slice"
import insuranceSlice from "../features/institution/insurance/insurance.slice"

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    organ: organReducer,
    document: documentSlice,
    bank: bankSlice,
    subbank: subbankSlice,
    repair: repairSlice,
    login: loginSlice,
    director: boardDirectorSlice,
    founder: founderGroupSlice,
    activity: activitySlice,
    regClass: regClassSlice,
    insurance: insuranceSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
