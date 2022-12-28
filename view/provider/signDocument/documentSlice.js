import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unsignedDocument: null,
  signedDocument: null,
  sign: null,
  idDocument: null,
}

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    setUnsignedDocument: (state, action) => {
      state.unsignedDocument = action.payload
    },
    setSignedDocument: (state, action) => {
      state.signedDocument = action.payload
    },
    setSign: (state, action) => {
      state.sign = action.payload
    },
  },
})
export const { setUnsignedDocument, setSignedDocument, setSign } = documentSlice.actions

export const selectDocument = (state) => state.document

export default documentSlice.reducer
