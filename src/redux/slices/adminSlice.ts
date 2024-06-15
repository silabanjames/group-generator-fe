import axiosInstance from "@/lib/axios";
import { Admin } from "@/var/Admin.var";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminData {
  admin: Admin
}

const initialState: AdminData = {
  admin: {} as Admin,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.admin = {} as Admin
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDetailAdminAsync.fulfilled, (state, action) => {
      state.admin = action.payload
    })
  }
})

export const getDetailAdminAsync = createAsyncThunk(
  'group/getDetailAdminAsync',
  async (id: string) => {
    const response = await axiosInstance.get(`/admin/${id}`)
    const data = response.data
    return data
  }
)

export const { resetAdmin } = adminSlice.actions

export default adminSlice.reducer