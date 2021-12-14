import {
  TEMPLATES_LIST_SUCCESS,
  TEMPLATES_LISTBYID_SUCCESS,
  GET_TEMPLATE_SUCCESS,
  ADD_TEMPLATE_SUCCESS,
  SAVE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_SUCCESS
} from './types';

import { listItems, getItem, addItem, saveItem, deleteItem } from './common';

const API = `${process.env.REACT_APP_API_URL}/templates`;

export const getHospitalsById = (id) => {
  return (dispatch) => {
    const path = `${API}/listbyid/${id}`;
    listItems(path, TEMPLATES_LISTBYID_SUCCESS, dispatch)
  }
};

export const getHospitals = () => {
  return (dispatch) => {
    const path = `${API}/list`;
    listItems(path, TEMPLATES_LIST_SUCCESS, dispatch)
  }
};

export const getHospital = (id) => {
  return (dispatch) => {
    const path = `${API}/${id}`;
    getItem(path, GET_TEMPLATE_SUCCESS, dispatch);
  }
};

export const addHospital = (data) => {
  return (dispatch) => {
    const path = `${API}/new`;

    addItem(data, path, ADD_TEMPLATE_SUCCESS, dispatch);
  }
};

export const saveHospital = (data) => {
  return (dispatch) => {
    const path = `${API}/save/${data._id}`;

    saveItem(data, path, SAVE_TEMPLATE_SUCCESS, dispatch);
  }
};

export const removeHospital = (id) => {
  return (dispatch) => {
    const path = `${API}/remove/${id}`;

    deleteItem(path, DELETE_TEMPLATE_SUCCESS, dispatch);
  }
};
