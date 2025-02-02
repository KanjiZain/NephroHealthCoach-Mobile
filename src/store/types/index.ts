export interface ActionParams {
  type: string;
  payload?: Record<string, any>;
}

export interface IAuthState {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  gender: string;
  password?: string;
  isAuthenticated: boolean;
  token?: string | null;
}

export interface IStateReducers {
  auth: IAuthState;
}
