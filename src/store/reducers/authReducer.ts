import {ActionParams, IAuthState} from '../types';
import {AuthActionsType} from '../types/authType';

const initialState: IAuthState = {
  email: '',
  firstName: '',
  lastName: '',
  mobile: '',
  gender: '',
  password: '',
  isLoading: false,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case AuthActionsType.LOGOUT:
      return {
        isLoading: false,
        isAuthenticated: false,
      };
    case AuthActionsType.LOGOUT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionsType.LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionsType.LOGIN_SUCCESS: {
      console.log('LOGIN_SUCCESS Payload:', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        phoneNumber: action.payload?.mobile,
        email: action.payload?.email,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        gender: action.payload?.gender,
      };
    }
    case AuthActionsType.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case AuthActionsType.SIGN_UP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionsType.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        phoneNumber: action.payload?.mobile,
        email: action.payload?.email,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        gender: action.payload?.gender,
      };
    case AuthActionsType.SIGN_UP_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
