import {AxiosResponse} from 'axios';
import axios from '@/config/request';
import {ILoginData, ISignUp} from '@/types';

export const requestLogin = async (
  requestData: ILoginData,
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post('/user/login', requestData);
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};

export const requestSignUp = async (
  requestPayload: ISignUp,
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post('/user/register', requestPayload);
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};
