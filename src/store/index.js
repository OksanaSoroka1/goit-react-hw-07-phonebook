import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './items/reducer';

const rootReducer = combineReducers({ contacts: contactsReducer });

const store = configureStore({ reducer: rootReducer });
export { store };
