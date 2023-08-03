import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getInfo } from './operation'

export interface CounterState {
  value: number[]
  data: string
}

const initialState: CounterState = {
  value: [],
  data: ''
}

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveTtn: (state, action: PayloadAction<number>) => {
      const newValue = action.payload;
      if (!state.value.includes(newValue)) {
        return {
          ...state,
          value: [...state.value, newValue]
        };
      }
      return state;
    },
    clearTtn: (state) => {
      state.value = []
    }
  },

   extraReducers: {
     [getInfo.fulfilled](state, action: PayloadAction<{data: { status: string }}>) {
       state.data = action.payload.data.status
    },
  }
})

export const { saveTtn, clearTtn } = slice.actions

export const reducer = slice.reducer 