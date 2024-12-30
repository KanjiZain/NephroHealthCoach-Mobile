export interface ActionParams {
  type: string;
  payload?: Record<string, any>;
}

export interface IAuthState {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  gender: string;
  password?: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  token?: string | null;
}

export interface IStateReducers {
  auth: IAuthState;
  bmi: IBmiState;
}

export interface IBmiState {
  age: number;
  weight: number;
  height: number;
  bmi: string;
  timestamp: string;
  gender?: string | null;
}
