import {
  SIGNUP_USER_REQUEST,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOG_OUT
} from '../actions';
import { HYDRATE } from 'next-redux-wrapper';
import { CreateUserType, LoginUserType, UserProfile } from '@type/Users';

export type UserReducerState = {
  token: string | null;
  profile: UserProfile | null;
  error: string | null;
  loading: boolean;
};

export type CreateUserReducerAction = {
  payload: CreateUserType;
  type: string;
};

export type LoginUserReducerAction = {
  payload: LoginUserType;
  type: string;
};

export type UserStateAction = {
  payload?: {
    user: UserProfile;
    jwt: string;
  };
  error?: string;
  loading?: boolean;
  type: string;
};

const initialState: UserReducerState = {
  error: null,
  profile: null,
  token: null,
  loading: false
};

export function userReducer(state = initialState, action: UserStateAction) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }
    case SIGNUP_USER_REQUEST:
      return {
        ...state,
        ...{ loading: true, error: null }
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        ...{ profile: action.payload, loading: false }
      };
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        ...{ error: action.error, loading: false }
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        ...{ loading: true, error: null, token: null, profile: null }
      };
    case LOGIN_USER_SUCCESS:
      if (action.payload !== undefined) {
        const { jwt, user } = action.payload;
        localStorage.setItem('token', jwt);
        return {
          ...state,
          ...{ profile: user, loading: false, token: jwt }
        };
      }
      return state;
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        ...{ error: action.error, loading: false }
      };

    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        ...{ loading: false, error: null, token: null, profile: null }
      };

    default:
      return state;
  }
}
