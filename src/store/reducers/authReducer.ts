import { ActionParams, IAuthState } from '../types';
import { AuthActionsType } from '../types/authType';

const initialState: IAuthState = {
   email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  gender: '',
   isLoading: true,
};

export const authReducer = (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case AuthActionsType.LOGOUT:
      return {
        ...state,
       email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  gender: ''
      };
    case AuthActionsType.LOGOUT_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActionsType.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        phoneNumber: action.payload?.user.phoneNumber,
        email: action.payload?.user.email,
        firstName: action.payload?.user.firstName,
        lastName: action.payload?.user.lastName,
        gender: action.payload?.user.gender,

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
