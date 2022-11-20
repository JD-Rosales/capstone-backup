import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const getGameLogs = createAsyncThunk('gameLogs/getGameLogs', async (params, thunkAPI) => {
  try {
    const response = await axios.get('/api/game-logs', {
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

export const gameLogsSlice = createSlice({
  name: 'gameLogs',
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
      .addCase(getGameLogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGameLogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.gameLogs
      })
      .addCase(getGameLogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
  }
})

export const { reset } = gameLogsSlice.actions
export default gameLogsSlice.reducer