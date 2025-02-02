import {AxiosResponse} from 'axios';
import axios from '@/config/request';

export const requestAllTestRecords = async (_id: string) => {
  try {
    if (!_id) {
      throw new Error('User ID not found');
    }
    const response = await axios.post('/user/getAllTestRecords', {
      user_id: _id,
    });

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No test records found');
    }
    if (response.status === 200) {
      return response?.data?.data;
    } else {
      return response?.data?.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const requestTestRecordById = async (
  test_id: string,
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post('/user/getTestRecordById', {test_id});
    if (response.status === 200) {
      return response?.data?.data;
    } else {
      return response?.data?.data;
    }
  } catch (error: any) {
    throw error;
  }
};
