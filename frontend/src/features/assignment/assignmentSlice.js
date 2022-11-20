import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

export const addAssignment = createAsyncThunk('assignment/addAssignment', async (params, thunkAPI) => {
  try {
    const response = await axios.post('/api/assignments/add-assignment/', params, {
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

export const getAssignments = createAsyncThunk('assignment/getAssignment', async (params, thunkAPI) => {
  try {
    const response = await axios.get('/api/assignments', {
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

export const updateAssignment = createAsyncThunk('assignment/updateAssignment', async (params, thunkAPI) => {
  try {
    const response = await axios.patch('/api/assignments/update-assignment/' + params.id, params, {
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

export const deleteAssignment = createAsyncThunk('assignment/deleteAssignment', async (params, thunkAPI) => {
  try {
    const response = await axios.delete('/api/assignments/' + params.id, {
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

export const assignmentSlice = createSlice({
  name: 'assignment',
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
      .addCase(addAssignment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAssignment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.assignments
      })
      .addCase(addAssignment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(getAssignments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.assignments
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(updateAssignment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.assignments
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })

      .addCase(deleteAssignment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.assignments
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = []
      })
  }
})

export const { reset } = assignmentSlice.actions
export default assignmentSlice.reducer