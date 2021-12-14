import { getCookie, isAuth } from 'actions/auth';

const token = getCookie('token');
const bearerToken = `Bearer ${token}`;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Authorization': bearerToken
};

export const listItems = (path, dispatchType, dispatch) => {
    return fetch(path, {
      method: 'GET',
      headers
    })
    .then(response => {
        return response.json();
      })
      .then(result => {
        dispatch({ type: dispatchType, result })}
        )
      .catch(err => console.log(err));
}

export const getItem = (path, dispatchType, dispatch) => {
    return fetch(path, {
      method: 'GET',
      headers
    })
      .then(response => {
        return response.json();
      })
      .then(result => dispatch({ type: dispatchType, result }))
      .catch(err => console.log(err));
}

export const addItem = (data, path, dispatchType, dispatch) => {
  return fetch(path, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .then(result => dispatch({ type: dispatchType, result }))
    .catch(err => console.log(err));
}

export const saveItem = (data, path, dispatchType, dispatch) => {
  return fetch(path, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .then(result => dispatch({ type: dispatchType, result }))
    .catch(err => console.log(err));
}

export const deleteItem = (path, dispatchType, dispatch) => {
  return fetch(path, {
    method: 'DELETE',
    headers
  })
    .then(response => {
      return response.json();
    })
    .then(result => dispatch({ type: dispatchType, result }))
    .catch(err => console.log(err));
}