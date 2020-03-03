import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  // Load User
  const loadUser = () => console.log('load user');

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', formData, config); // calling server side --- user.js post
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data }); // return token
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.msg });
    }
  };

  // Login User
  const login = () => console.log('login user');
  // Logout
  const logout = () => console.log('logout user');
  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
