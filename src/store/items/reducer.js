import * as operations from './operations';
import * as actions from './actions';
import { createReducer, combineReducers, createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(operations.postContact.fulfilled, (state, action) => [
      ...state,
      action.payload,
    ]);
    builder.addCase(
      operations.fetchContacts.fulfilled,
      (_, action) => action.payload,
    );
    builder.addCase(operations.deleteContact.fulfilled, (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    });
  },
});

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      operations.fetchContacts.pending,
      (state, action) => (state = true),
    );
    builder.addCase(
      operations.fetchContacts.fulfilled,
      (state, action) => (state = false),
    );
    builder.addCase(
      operations.fetchContacts.rejected,
      (state, action) => (state = false),
    );
  },
});

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      operations.deleteContact.rejected ||
        operations.postContact.rejected ||
        operations.fetchContacts.rejected,
      (state, action) => (state = action.error),
    );
    builder.addCase(
      operations.deleteContact.fulfilled ||
        operations.postContact.fulfilled ||
        operations.fetchContacts.fulfilled,
      state => (state = null),
    );
    builder.addCase(
      operations.deleteContact.pending ||
        operations.postContact.pending ||
        operations.fetchContacts.pending,
      state => (state = null),
    );
  },
});

const filterReducer = createReducer('', {
  [actions.changeFilter]: (state, action) => action.payload,
});

export default combineReducers({
  items: itemsSlice.reducer,
  filter: filterReducer,
  loading: loadingSlice.reducer,
  error: errorSlice.reducer,
});
