import axios, { AxiosResponse } from "axios";

export const requestBMI = async (
): Promise<AxiosResponse> => {
  try {
    const response = await axios.get('/');
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};


export const requestDietPlan = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get('/');
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};


export const requestTest = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get('/');
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error: any) {
    throw error;
  }
};
