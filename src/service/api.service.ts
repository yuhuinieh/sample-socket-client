import axios from 'axios';
import { User } from '@/states/userAtom';

const API_URL = import.meta.env.VITE_API_URL;

type UserRespond = {
  message: string;
  data: User;
};

export function getUser() {
  return new Promise<User>((resolve, reject) => {
    axios
      .get<UserRespond>(API_URL + '/user', { withCredentials: true })
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => {
        const statusCode = err.response.status;
        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
          reject(err.response.data);
        }
      });
  });
}
