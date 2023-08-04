import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getInfo, getStreet } from './operation'

export interface CounterState {
  value: number[]
  postData: object,
  data: string[]
}

const initialState: CounterState = {
  value: [],
  postData: {},
  data: []
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
     [getInfo.fulfilled](state, action: PayloadAction<{data:  object[] }>) {
       state.postData = action.payload.data[0]
     },
     [getStreet.fulfilled](state, action: PayloadAction<{ data: string[]  }>) {
       state.data = action.payload.data
    },
  }
})

export const { saveTtn, clearTtn } = slice.actions

export const reducer = slice.reducer 