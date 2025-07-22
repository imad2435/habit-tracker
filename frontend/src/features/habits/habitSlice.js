import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import habitService from './habitService';

const initialState = {
  habits: [],
  isLoading: false,
  isError: false,
  message: '',
};

export const createHabit = createAsyncThunk('habits/create', async (habitData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await habitService.createHabit(habitData, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getHabits = createAsyncThunk('habits/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await habitService.getHabits(token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateHabit = createAsyncThunk('habits/update', async (habitData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await habitService.updateHabit(habitData, token);
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteHabit = createAsyncThunk('habits/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await habitService.deleteHabit(id, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const toggleHabit = createAsyncThunk('habits/toggle', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await habitService.toggleHabit(id, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHabit.pending, (state) => { state.isLoading = true; })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits.push(action.payload);
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getHabits.pending, (state) => { state.isLoading = true; })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(getHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteHabit.pending, (state) => { state.isLoading = true; })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = state.habits.filter((h) => h._id !== action.payload.id);
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateHabit.pending, (state) => { state.isLoading = true; })
      .addCase(updateHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = state.habits.map((h) => h._id === action.payload._id ? action.payload : h);
      })
      .addCase(updateHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleHabit.pending, (state) => { 
        // We don't set global loading true for this to avoid flashing
      })
      .addCase(toggleHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = state.habits.map((h) => h._id === action.payload._id ? action.payload : h);
      })
      .addCase(toggleHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = habitSlice.actions;
export default habitSlice.reducer;