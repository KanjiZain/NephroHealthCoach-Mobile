import axios from '@/config/request';

export const requestAllDietPlans = async (_id: string) => {
  try {
    if (!_id) {
      throw new Error('User ID not found');
    }
    const response = await axios.post('/user/getAllDietPlans', {
      user_id: _id,
    });

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No Diet Plans found');
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

export const requestDietPlan = async (diet_plan_id: string) => {
  try {
    const response = await axios.post('/user/getDietPlan', {diet_plan_id});
    if (response.status === 200) {
      return response?.data?.data;
    } else {
      return response?.data?.data;
    }
  } catch (error: any) {
    throw error;
  }
};
