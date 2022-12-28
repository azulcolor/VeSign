import { configureStore } from '@reduxjs/toolkit'
import documentReducer from './signDocument/documentSlice'

export const store = configureStore({
  reducer: {
    document: documentReducer,
  },
})
