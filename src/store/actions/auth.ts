import { ILoginData, ISignUp } from "@/types";
import { ActionParams } from "../types";
import {Dispatch} from 'react';
import { AuthActionsType } from "../types/authType";
import { requestLogin, requestSignUp } from "@/services";

export const loginAction =
  (requestData: ILoginData) =>
  async (dispatch: Dispatch<ActionParams | any>) => {
    const {email, password} = requestData;
    try {
      let response: any;
     
        response = await requestLogin({email, password} as any);
      

      await dispatch({
        type: AuthActionsType.LOGIN_SUCCESS,
        payload: {
          user: response?.data,
        },
      });
    
    
      return {success: true, data: response.data};
    } catch (error: any) {
      dispatch({
        type: AuthActionsType.LOGIN_FAILED,
        payload: error,
      });
      return {success: false, error: error?.response.data.message};
    }
  };

// Sign Up action
export const signUpAction =
  (requestPayload: ISignUp) =>
  async (dispatch: Dispatch<ActionParams | any>) => {
    try {
      dispatch({
        type: AuthActionsType.SIGN_UP_LOADING,
      });
      const response = await requestSignUp(requestPayload);
      dispatch({
        type: AuthActionsType.SIGN_UP_SUCCESS,
        payload: response,
      });
      return {success: true};
    } catch (error: any) {
      dispatch({
        type: AuthActionsType.SIGN_UP_FAILED,
        payload: error,
      });
      return {success: false, error: error.response.data.message};
    }
  };
