import {reactive} from 'vue'
import {Screen} from "quasar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useI18n} from "vue-i18n";

const api = process.env.API_URL
// if (!process.env.SERVER) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "access_token")
// }
const state = reactive({

  navItems: [
    {
      root: '/home',
      to: '/home',
      icon: 'las la-home',
      label: 'Home'
    },
    {
      root: '/courses',
      to: '/courses',
      icon: 'las la-image',
      label: 'Courses'
    },
    {
      root: '/authors',
      to: '/authors',
      icon: 'las la-image',
      label: 'Authors'
    },
    // {
    //   root: '/settings',
    //   to: '/settings',
    //   icon: 'settings',
    //   label: 'Settings'
    // }
  ],
  access_token: localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('user')),
  usePageTransition: false,
  iosBrowserSwipingBack: false
})
const actions = {
  setIt:(service, data) =>{
    this.state[service] = this[service].filter(el => el._id === data._id)
    // console.log(this[service].filter(el => el._id === data._id))
  },
// Common Services
  GetAll: (service) => {
    return axios
      .get(`${api}/${service}`)
      .then(response => {
        if (response.data) {
          // if (service === 'users'){
          state[service] = response.data
          // console.log(response.data)
          // }
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetUserData: () => {
    return axios
      .get(`${api}/user`)
      .then(response => {
        if (response.data) {
          store.state.user = response.data.data;
          localStorage.setItem("user", JSON.stringify(response.data.data));
          return response.data
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  Add: (service, body) => {
    const userId = jwt_decode(localStorage.getItem("access_token")).sub;
    return axios
      .post(`${api}/${service}/add/`, !body ? {owner: userId, name: 'default'} : body)
      .then(response => {
        if (response.data) {
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  Update:  body => {
    return axios
      .put(`${api}/user/`, body)
      .then(response => {
        if (response.data) {
          store.actions.GetUserData()
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  Delete: (service, id) => {
    return axios.delete(`${api}/${service}/` + id);
  },
  // Author
  authRequest: payload => {
    let actionUrl = api + "/login";
    let data = {
      email: payload.email,
      password: payload.password
    };
    return new Promise((resolve, reject) => {
      axios
        .post(actionUrl, data)
        .then(resp => {
          let access_token = "Bearer " + resp.data.api_token;
          state.access_token = access_token;
          state.user = JSON.stringify(resp.data);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("user", JSON.stringify(resp.data));
          axios.defaults.headers.common["Authorization"] = access_token;
          resolve(access_token);
        })
        .catch(err => {
          console.log(err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          reject(err);
        });
    });
  },
  async GetUserInfo() {
    await axios
      .get(`${api}/users/current`)
      .then(response => {
          return response;
      })
      .catch(err => {
        if (
          err.response &&
          err.response.status &&
          err.response.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        )
          throw err;
      });
  },
  UpdatePassword: password => {
    const userId = jwt_decode(localStorage.getItem("access_token")).sub;
    return axios.put(`${api}/users/` + userId, password);
  },
  authLogout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    state.access_token = null;
    state.user = null;
  },
  authRegister: payload => {
    return new Promise((resolve, reject) => {
      axios
        .post(api + "/register", payload)
        .then(response => {
            if (response.data) {
              let actionUrl = api + "/login";
              let data = {
                email: payload.email,
                password: payload.password
              };
              return new Promise((resolve, reject) => {
                axios
                  .post(actionUrl, data)
                  .then(resp => {
                    let access_token = "Bearer " + resp.data.api_token;
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("user", JSON.stringify(resp.data));
                    axios.defaults.headers.common["Authorization"] = access_token;
                    state.user = resp.data;
                    state.access_token = access_token;

                    resolve(access_token);
                  })
                  .catch(err => {
                    console.log(err);
                    reject(err);
                  });
                resolve();
                return response.data;
              })
            }
          }
        )
        .catch(err => {
          reject(err);
        });
    });
  },
// Admin Services
  UpdateUserProf: (profile, userId) => {
    return axios
      .put(`${api}/users/put/` + userId, profile)
      .then(response => {
        if (response.data) {
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  UpdateUserPass: (password, userId) => {
    return axios.put(`${api}/users/` + userId, password);
  },
  SendEmail: body => {
    return axios
      .put(`${api}/users/sendemail`, body)
      .then(response => {
        if (response.data) {
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  Upload: file => {
    return axios
      .post(`${api}/users/upload`, file, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Allow-Credentials': 'true',
          'Content-Type': 'multipart/form-data',
          Accept: "multipart/form-data",
        }
      })
      .then(response => {
        if (response.data) {
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  // Page transitions
  initSettings() {
    this.resetSectionActive()
    this.handleWindowResize()
  },
  resetSectionActive(page) {
    if (Screen.gt.sm && !state.sectionActive) {
      state.sectionActive = Object.keys(`state.${page}.sections`)[0]
    }
  },
  handleWindowResize() {
    let resizeTimer
    window.resize = () => {
      clearTimeout(resizeTimer)
    }
  }
}
const getters = {
  isAuthenticated: () => !!state.access_token,
  isAdmin: () => state.user?.role === 'admin',
  getUser: () => state.user,
}
const store = {
  state,
  getters,
  actions
}
export default store
