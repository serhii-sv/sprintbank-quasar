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
      root: '/',
      to: '/',
      icon: 'fas fa-chart-line',
      label: 'Статистика'
    },
    {
      root: '/deposits',
      to: '/deposits',
      icon: 'fas fa-wallet',
      label: 'Депозиты'
    },
    {
      root: '/transactions',
      to: '/transactions',
      icon: 'fas fa-exchange-alt',
      label: 'Транзакции'
    }
  ],
  transactions: null,
  deposits: null,
  access_token: localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('user')),
  usePageTransition: false,
  iosBrowserSwipingBack: false
})
const actions = {
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
  GetTransactions: () => {
    return axios
      .get(`${api}/transactions`)
      .then(response => {
        if (response.data) {
          state.transactions = response.data
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetDeposits: () => {
    return axios
      .get(`${api}/deposits`)
      .then(response => {
        if (response.data) {
          state.deposits = response.data
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
  DeleteUser: () => {
    return axios.delete(`${api}/user`)
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
