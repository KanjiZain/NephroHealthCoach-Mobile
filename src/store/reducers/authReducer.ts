import {ActionParams, IAuthState} from '../types';
import {AuthActionsType} from '../types/authType';

const initialState: IAuthState = {
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  mobile: '',
  gender: '',
  password: '',
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case AuthActionsType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    case AuthActionsType.LOGOUT_LOADING:
      return {
        ...state,
      };

    case AuthActionsType.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        phoneNumber: action.payload?.mobile,
        email: action.payload?.email,
        firstName: action.payload?.firstName,
        lastName: action.payload?.lastName,
        gender: action.payload?.gender,
        _id: action.payload?._id,
      };
    }
    case AuthActionsType.LOGIN_FAILED:
      return {
        ...state,
      };

    case AuthActionsType.SIGN_UP_LOADING:
      return {
        ...state,
      };
    case AuthActionsType.SIGN_UP_SUCCESS:
      return {
        ...state,
        email: action.payload?.email,
      };
    case AuthActionsType.SIGN_UP_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
