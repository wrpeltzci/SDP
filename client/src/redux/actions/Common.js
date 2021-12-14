import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from './ActionTypes';

export const fetchSuccess = message => dispatch =>
  dispatch({
    type: FETCH_SUCCESS,
    payload: message || '',
  });

export const fetchError = error => dispatch =>
  dispatch({
    type: FETCH_ERROR,
    payload: error,
  });

export const fetchStart = () => dispatch =>
  dispatch({
    type: FETCH_START,
  });
