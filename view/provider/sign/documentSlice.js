import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  unsignedDocument: null,
  signedDocument: null,
  sign: null,
  idDocument: null,
  signed: false,
}

export const documentSlice = createSlice({
  name: 'document',
  initialState,

  reducers: {
    setIdDocument: (state, action) => {
      state.idDocument = action.payload
    },
    setUnsignedDocument: (state, action) => {
      state.unsignedDocument = action.payload
    },
    setSignedDocument: (state, action) => {
      state.signedDocument = action.payload
    },
    setSign: (state, action) => {
      state.sign = action.payload
    },
    setSigned: (state, action) => {
      state.signed = action.payload
    },
  },
})

export const {
  setIdDocument,
  setUnsignedDocument,
  setSignedDocument,
  setSign,
  setSigned,
} = documentSlice.actions

export const selectDocument = (state) => state.document

export default documentSlice.reducer
