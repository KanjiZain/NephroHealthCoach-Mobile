import axios from '@/config/request';

export const requestAllBmi = async (_id: string) => {
  try {
    if (!_id) {
      throw new Error('User ID not found');
    }
    const response = await axios.post('/user/getAllBmi', {
      user_id: _id,
    });

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No BMI records found');
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

export const requestBmi = async (bmi_id: string) => {
  try {
    const response = await axios.post('/user/getBmi', {bmi_id});
    if (response.status === 200) {
      return response?.data?.data;
    } else {
      return response?.data?.data;
    }
  } catch (error: any) {
    throw error;
  }
};
