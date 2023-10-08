import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { store } from '../stores/store';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:5070/api';

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          //push to not found
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        break;
      case 401:
        toast.error('unauthorised');
        break;
      case 404:
        //push to not found
        toast.error('not found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        break;
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (item: Activity) => requests.post<void>('/activities', item),
  update: (item: Activity) =>
    requests.put<void>(`/activities/${item.id}`, item),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const agent = {
  Activities: Activities,
};

export default agent;
