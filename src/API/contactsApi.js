import axios from 'axios';

axios.defaults.baseURL = 'https://61f9544869307000176f71ab.mockapi.io';

export async function postContact(contact) {
  try {
    const responce = await axios.post(`/contacts`, contact);
    return responce;
  } catch (error) {
    return error;
  }
}

export async function deleteContact(id) {
  try {
    const responce = await axios.delete(`/contacts/${id}`);
    return responce;
  } catch (error) {
    return error;
  }
}

export async function fetchContact() {
  try {
    const responce = await axios.get('/contacts');
    return responce;
  } catch (error) {
    return error;
  }
}
