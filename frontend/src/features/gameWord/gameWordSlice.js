import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const addGameWord = createAsyncThunk('gameWord/addGameWord', async (params, thunkAPI) => {
  try {
    const response = await axios.post('/api/game-word', params, {
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

export const getGameWord = createAsyncThunk('gameWord/getGameWord', async (params, thunkAPI) => {
  try {
    const response = await axios.get('/api/game-word/' + params.gameType, {
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

export const getWords = createAsyncThunk('gameWord/getWords', async (params, thunkAPI) => {
  try {
    const response = await axios.post('/api/game-word/getWords', params, {
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

export const deleteGameWord = createAsyncThunk('gameWord/deleteGameWord', async (params, thunkAPI) => {
  try {
    const response = await axios.delete('/api/game-word/' + params.id, {
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

export const updateGameWord = createAsyncThunk('gameWord/updateGameWord', async (params, thunkAPI) => {
  try {
    const response = await axios.patch('/api/game-word/' + params.id, params, {
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

export const gameWordSlice = createSlice({
  name: 'gameWord',
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
      .addCase(addGameWord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addGameWord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(addGameWord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(getGameWord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGameWord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(getGameWord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(deleteGameWord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGameWord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(deleteGameWord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(updateGameWord.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGameWord.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(updateGameWord.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(getWords.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWords.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(getWords.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
  }
})

export const { reset } = gameWordSlice.actions
export default gameWordSlice.reducer