import * as api from '../../API/contactsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

const postContact = createAsyncThunk('item/Add', async contact => {
  const responce = await api.postContact(contact);
  return responce.data;
});

const deleteContact = createAsyncThunk('item/delet', async id => {
  const responce = await api.deleteContact(id);
  return responce.data.id;
});

const fetchContacts = createAsyncThunk('item/download', async () => {
  const responce = await api.fetchContact();
  return responce.data;
});
export { postContact, deleteContact, fetchContacts };
