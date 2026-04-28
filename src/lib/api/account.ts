import axios from 'axios';

export const deleteAccount = async () => {
  const { data } = await axios.post('/api/delete-user', {}, { withCredentials: true });
  return data;
};
