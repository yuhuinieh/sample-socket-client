import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export type ErrorResponse = {
  message: string;
};

type LoginPayload = {
  username: string;
  password: string;
};
type LoginRespond = {
  message: string;
  token: string;
};
export function login(credentials: LoginPayload) {
  return new Promise<LoginRespond>((resolve, reject) => {
    axios
      .post<LoginRespond>(API_URL + '/api/login', credentials, {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const statusCode = err.response.status;
        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
          reject(err.response.data as ErrorResponse);
        }
      });
  });
}

type RegisterPayload = {
  username: string;
  password: string;
};
type RegisterRespond = {
  message: string;
  token: string;
};
export function register(credentials: RegisterPayload) {
  return new Promise<RegisterRespond>((resolve, reject) => {
    axios
      .post<RegisterRespond>(API_URL + '/api/register', credentials, {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const statusCode = err.response.status;
        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
          reject(err.response.data);
        }
      });
  });
}

type LogoutRespond = {
  message: string;
};
export function logout() {
  return new Promise<LogoutRespond>((resolve, reject) => {
    axios
      .post<LogoutRespond>(API_URL + '/logout', {}, { withCredentials: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        const statusCode = err.response.status;
        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
          reject(err.response.data);
        }
      });
  });
}


type KeyRespond = {
  message: string;
  publicKey: string;
};
type KeyPayload = {
  publicKey: string
}
export function exchangeKeys(key: KeyPayload) {
  return new Promise<KeyRespond>((resolve, reject) => {
    axios
      .post<KeyRespond>(API_URL + '/api/exchangekeys', key, { withCredentials: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        const statusCode = err.response.status;
        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
          reject(err.response.data);
        }
      });
  });
}