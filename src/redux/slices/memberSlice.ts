import axiosInstance from "@/lib/axios";
import { Member } from "@/var/Member.var";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MemberData {
  member: Member
}

const initialState: MemberData = {
  member: {} as Member,
}

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    resetGroup: (state) => {
      state.member = {} as Member
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailMemberAsync.fulfilled, (state, action) => {
      state.member = action.payload
    })
  }
})

export const getDetailMemberAsync = createAsyncThunk(
  'group/getDetailMemberAsync',
  async (id: string) => {
    const response = await axiosInstance.get(`/member/${id}`)
    const data = response.data
    return data
  }
)

export const { resetGroup } = memberSlice.actions

export default memberSlice.reducer