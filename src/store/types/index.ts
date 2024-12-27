export interface ActionParams {
  type: string;
  payload?: Record<string, any>;
}

export interface IAuthState {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  isLoading: boolean;
}

export interface IStateReducers {
  auth: IAuthState;
}
