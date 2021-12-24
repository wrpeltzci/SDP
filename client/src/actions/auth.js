import axios from 'axios';
import cookie from 'js-cookie';

const API = `${process.env.REACT_APP_API_URL}`;

export const signup = async user => {
  return axios.post(`${API}/signup`, user, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response
    });
};

export const signin = async user => {
  return axios.post(`${API}/signin`, user, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
};

export const getUser = async () => {
  const authInfo = isAuth();

  if (process.browser && authInfo) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      return axios.get(`${API}/user/${authInfo.id}`, {uid: authInfo.id}, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookieChecked}`,
            body: {id: authInfo.id}
          }
        })
          .then(response => {
            return response.data;
          })
          .catch(err => console.log(err));
      }
    }
  }

export const signout = () => {
  removeCookie('token');
  removeLocalStorage('user');

  return axios.get(`${API}/signout`)
    .then(response => {
    console.log("🚀 ~ file: auth.js ~ line 40 ~ signout ~ response", response)
      console.log('signout success');
    })
    .catch(err => console.log(err));
};

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};
// get cookie
export const getCookie = key => {
  if (process.browser) {
    return cookie.get(key);
  }
};
// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', {email: data.email, id: data.id });
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        console.log('no dice')
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem('user')) {
      let auth = JSON.parse(localStorage.getItem('user'));
      auth = user;
      localStorage.setItem('user', JSON.stringify(auth));
      next();
    }
  }
};

export const forgotPassword = email => {
  return axios.put(`${API}/forgot-password`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
  return axios.put(`${API}/reset-password`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetInfo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const loginWithGoogle = user => {
  return axios.post(`${API}/google-login`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};