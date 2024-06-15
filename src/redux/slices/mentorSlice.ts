import axiosInstance from "@/lib/axios";
import { Mentor } from "@/var/Mentor.var";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MentorData {
  mentor: Mentor
}

const initialState: MentorData = {
  mentor: {} as Mentor
} 

export const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {
    resetMentor: (state) => {
      state.mentor = {} as Mentor
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailMentorAsync.fulfilled, (state, action) => {
      state.mentor = action.payload
    })
  }
})


export const getDetailMentorAsync = createAsyncThunk(
  'mentor/getDetailMentorAsync',
  async (id: string) => {
    const response = await axiosInstance.get(`/mentor/${id}`)
    const data = response.data
    return data
  }
)

export const { resetMentor } = mentorSlice.actions
export default mentorSlice.reducer