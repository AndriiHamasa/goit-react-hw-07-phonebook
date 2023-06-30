import { initialState } from './initialState';

export const reducer = (state = initialState, action) => {
  if (action.type === 'deleteContact') {
    return {
      ...state,
      filter: state.filter.filter(contact => contact.id !== action.payload),
    };
  }
};
