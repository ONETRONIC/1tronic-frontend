import { createSlice } from '@reduxjs/toolkit'
import { GeneralState } from '../types'

const initialState: GeneralState = { currency: null }

export const generalCurrency = createSlice({
  name: 'General',
  initialState,
  reducers: {
    setGeneralCurrency: (state, action) => {
      state.currency = action.payload
    },
  },
})

export const { setGeneralCurrency } = generalCurrency.actions

export default generalCurrency.reducer

