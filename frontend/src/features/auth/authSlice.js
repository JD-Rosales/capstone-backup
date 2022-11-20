import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Get user from local storage
const localUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: localUser ? localUser.user : null,
  token: localUser ? localUser.token : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

// Register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
      const response = await axios.post('/api/users', userData)

      if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
      }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Login user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('/api/users/login', userData)

    if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Update user profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (params, thunkAPI) => {
  try {
    console.log(params)
    const response = await axios.patch('/api/users/update-profile/' + params.userData.id, params.userInputs, {
      headers: { Authorization: `Bearer ${params.userData.token}` },
    })
    
    if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Update user settings
export const updateUserSettings = createAsyncThunk('auth/updateUserSettings', async (params, thunkAPI) => {
  try {
    const response = await axios.patch('/api/users/update-userSettings/' + params.userData.id, params.userInputs, {
      headers: { Authorization: `Bearer ${params.userData.token}` },
    })

    if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Change user password
export const changePassword = createAsyncThunk('auth/changePassword', async (params, thunkAPI) => {
  try {
    const response = await axios.patch('/api/users/change-password/' + params.userData.id, params.userInputs, {
      headers: { Authorization: `Bearer ${params.userData.token}` },
    })

    if(response.data) {
      return response.data.user
    }
    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Delete user account
export const deleteAccount = createAsyncThunk('auth/deleteAccount', async (id, thunkAPI) => {
  try {
    const response = await axios.delete('/api/users/delete-account/' + id, {
      headers: { authorization: `Bearer ${localUser.token}` },
    })

    if(response.data) {
      return response.data
    }
    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//Update user  lesson progress
export const updateProgress = createAsyncThunk('auth/updateProgress', async (params, thunkAPI) => {
  try {
    const response = await axios.patch('/api/users/update-progress/' + params.id, params, {
      headers: { Authorization: `Bearer ${params.token}` },
    })
    
    if(response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    resetAll: (state) => {
      state.user = null
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    },
    logOut: (state, action) => {
      localStorage.clear()
      state.user = null
      state.token = null
    },
    updateMessage: (state, action) => {
      state.message = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(updateUserSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(updateProgress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset, resetAll, updateMessage } = authSlice.actions
export default authSlice.reducer