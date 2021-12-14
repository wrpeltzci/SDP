import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import {
  ADD_USER,
  DELETE_BULK_USERS,
  DELETE_USER,
  EDIT_USER,
  GET_USERS,
  SET_USER_DETAILS,
} from '../actions/ActionTypes';

export const getUsers = (filterOptions = [], searchTerm = '', callbackFun) => async dispatch => {
  dispatch(fetchStart());
  try {
    const data = await axios.get('/users', { params: { filterOptions: JSON.stringify(filterOptions), searchTerm } });
    if (data.status === 200) {
      dispatch(fetchSuccess());
      dispatch({ type: GET_USERS, payload: data.data });
      if (callbackFun) callbackFun(data.data);
    } else {
      dispatch(fetchError('There was an issue with responding server.'));
    }
  } catch (error) {
    dispatch(fetchError('There was an issue with responding server'));
  }
};

export const setCurrentUser = user => async dispatch => {
  dispatch({ type: SET_USER_DETAILS, payload: user });
};

export const addNewUser = (user, callbackFun) => async dispatch => {
  dispatch(fetchStart());
  try {
    const data = await axios.post('/users', user);
    if (data.status === 200) {
      console.log('TCL: addNewUser -> data.status', data.status);
      dispatch(fetchSuccess('New user was added successfully.'));
      dispatch({ type: ADD_USER, payload: data.data });
      if (callbackFun) callbackFun(data.data);
    } else {
      console.log('TCL: addNewUser -> data.status', data.status);
      dispatch(fetchError('Problem adding user to store.'));
    }
  } catch (error) {
    console.log('TCL: addNewUser -> error', error);
    dispatch(fetchError('Problem creating new User'));
  }
};

export const sentMailToUser = () => async dispatch => {
  dispatch(fetchSuccess('Email has been sent to user successfully'));
};

export const updateUser = (user, callbackFun) => async dispatch => {
  dispatch(fetchStart());
  try {
    const data = await axios.put('/users', user);
    if (data.status === 200) {
      dispatch(fetchSuccess('Selected user was updated successfully.'));
      dispatch({ type: EDIT_USER, payload: data.data });
      if (callbackFun) callbackFun(data.data);
    } else {
      dispatch(fetchError('There was an issue with responding server.'));
    }
  } catch (error) {
    dispatch(fetchError('There was an issue with responding server'));
  }
};

export const updateUserStatus = (data, callbackFun) => async dispatch => {
  dispatch(fetchStart());
  try {
    const response = await axios.put('/users/update-status', data);
    if (response.status === 200) {
      dispatch(fetchSuccess('User status was updated successfully.'));
      dispatch({ type: EDIT_USER, payload: response.data });
      if (callbackFun) callbackFun(response.data);
    } else {
      dispatch(fetchError('There was an issue with responding server.'));
    }
  } catch (error) {
    dispatch(fetchError('There was an issue with responding server'));
  }
};

export const deleteBulkUsers = (userIds, callbackFun) => async dispatch => {
  dispatch(fetchStart());
  try {
    const response = await axios.put('/users/bulk-delete', { userIds });
    if (response.status === 200) {
      dispatch(fetchSuccess('Selected users were deleted successfully.'));
      dispatch({ type: DELETE_BULK_USERS, payload: userIds });
      if (callbackFun) callbackFun();
    } else {
      dispatch(fetchError('There was an issue with responding server.'));
    }
  } catch (error) {
    dispatch(fetchError('There was an issue with responding server'));
  }
};

export const deleteUser = (userId, callbackFun) => async dispatch => {
  dispatch(fetchStart());
  try {
    const data = await axios.delete('/users', { params: { id: userId } });
    if (data.status === 200) {
      dispatch(fetchSuccess('Selected user was deleted successfully.'));
      dispatch({ type: DELETE_USER, payload: userId });
      if (callbackFun) callbackFun();
    } else {
      dispatch(fetchError('There was an issue with responding server.'));
    }
  } catch (error) {
    dispatch(fetchError('There was an issue with responding server'));
  }
};
