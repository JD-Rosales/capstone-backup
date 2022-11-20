import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const getUnactivated = createAsyncThunk('admin/getUnactivated', async (thunkAPI) => {
  try {
    const response = await axios.get('/api/admin/get-unactivated')
    if (response.data) {
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateAccountStatus = createAsyncThunk('admin/updateAccountStatus', async (id, thunkAPI) => {
  try {
    const response = await axios.patch('/api/teacher/update-status/' + id)
    if (response.data) {
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnactivated.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUnactivated.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(getUnactivated.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
      .addCase(updateAccountStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAccountStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(updateAccountStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = adminSlice.actions
export default adminSlice.reducer