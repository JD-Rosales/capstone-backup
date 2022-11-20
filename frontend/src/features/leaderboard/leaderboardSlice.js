import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const addLeaderboard = createAsyncThunk('leaderboard/addLeaderboard', async (params, thunkAPI) => {
  try {
    const response = await axios.put('/api/leaderboard', params, {
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

export const getLeaderboard = createAsyncThunk('leaderboard/getLeaderboard', async (params, thunkAPI) => {
  try {
    const response = await axios.post('/api/leaderboard', params, {
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

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
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
      .addCase(addLeaderboard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.leaderboards
      })
      .addCase(addLeaderboard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(getLeaderboard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.leaderboards
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
  }
})

export const { reset } = leaderboardSlice.actions
export default leaderboardSlice.reducer