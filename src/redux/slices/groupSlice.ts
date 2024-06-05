import axiosInstance from "@/lib/axios";
import { Mentor } from "@/var/Mentor.var";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Group {
  groups: Mentor[]
}

const initialState: Group = {
  groups: [],
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    resetGroup: (state) => {
      state.groups = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupAsync.fulfilled, (state, action) => {
      state.groups = action.payload
    })
  }
})

export const getGroupAsync = createAsyncThunk(
  'group/getGroupAsync',
  async () => {
    const response = await axiosInstance.get('/mentor')
    const data = response.data
    return data
  }
)

export const { resetGroup } = groupSlice.actions

export default groupSlice.reducer