import { configureStore } from '@reduxjs/toolkit'
import styleReducer from './styleSlice'
import mainReducer from './mainSlice'
import organReducer from '../features/organ/organ.slice'
export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    organ: organReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
