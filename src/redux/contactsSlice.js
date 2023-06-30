import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
import { handleAddFulfilled, handleDeleteFulfilled, handleFetchFulfilled, handlePending, handleRejected } from './extraredusersfunctions';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: { items: [], isLoading: false, error: null },
    filter: '',
  },
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, handleFetchFulfilled)
      .addCase(addContact.fulfilled, handleAddFulfilled)
      .addCase(deleteContact.fulfilled, handleDeleteFulfilled)
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { changeFilter } = contactsSlice.actions;
