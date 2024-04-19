import { configureStore } from '@reduxjs/toolkit'

import documentReducer from './sign/documentSlice'

export const store = configureStore({
  reducer: {
    document: documentReducer,
  },
})
