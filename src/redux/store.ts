import { configureStore } from "@reduxjs/toolkit"
import groupReducer from "./slices/groupSlice"
import mentorReducer from "./slices/mentorSlice"
import memberReducer from "./slices/memberSlice"
import adminReducer from "./slices/adminSlice"

export const store = configureStore({
  reducer: {
    group: groupReducer,
    mentor: mentorReducer,
    member: memberReducer,
    admin: adminReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch