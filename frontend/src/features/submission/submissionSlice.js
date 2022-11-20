import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const addSubmission = createAsyncThunk('submission/addSubmission', async (params, thunkAPI) => {
  try {

    const response = await axios.post('/api/submission', params, {
      headers: { authorization: `Bearer ${params.token}` },
    })

    if (response.data) {
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const checkSubmission = createAsyncThunk('submission/checkSubmission', async (params, thunkAPI) => {
  try {
    const response = await axios.get('/api/submission/' + params.assignmentID, {
      headers: { authorization: `Bearer ${params.token}` },
    })

    if (response.data) {
      return response.data
    }

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getSubmissions = createAsyncThunk('submission/getSubmissions', async (params, thunkAPI) => {
  try {
    const response = await axios.get('/api/submission/get-submissions/' + params.assignmentID, {
      headers: { authorization: `Bearer ${params.token}` },
    })

    if (response.data) {
      return response.data
    }

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const submissionSlice = createSlice({
  name: 'submission',
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
      .addCase(addSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.submission
      })
      .addCase(addSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(checkSubmission.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkSubmission.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.submission
      })
      .addCase(checkSubmission.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(getSubmissions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubmissions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.submission
      })
      .addCase(getSubmissions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
  }
})

export const { reset } = submissionSlice.actions
export default submissionSlice.reducer