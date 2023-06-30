import { createSlice } from '@reduxjs/toolkit';
import { initialState } from 'redux/initialState';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { deleteContact, addContact, changeFilter } =
  contactsSlice.actions;
