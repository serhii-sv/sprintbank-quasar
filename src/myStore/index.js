import {reactive} from 'vue'
import {Screen} from "quasar";
import axios from "axios";
import jwt_decode from "jwt-decode";

const api = process.env.API_URL
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "access_token")
const state = reactive({

  navItems: [
    {
      root: '/',
      to: '/',
      icon: 'fas fa-chart-line',
      label: 'Дашборд'
    },
    {
      root: '/transactions',
      to: '/transactions',
      icon: 'fas fa-exchange-alt',
      label: 'Операции'
    },
    {
      root: '/referal',
      to: '/referal',
      icon: 'fas fa-users',
      label: 'Партнеры'
    },

  ],
  transactions: null,
  exchangeresult: null,
  exchangewallets: null,
  transactionsChart: null,
  deposits: null,
  wallets: null,
  referrals: null,
  userStatistics: null,
  token: null,
  access_token: localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('user')),
  usePageTransition: false,
  iosBrowserSwipingBack: false
})
const actions = {
  async GetTransactions() {
    return await axios
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
  async GetTransactionsChart() {
    return await axios
      .get(`${api}/graphs/transactions`)
      .then(response => {
        if (response.data) {
          state.transactionsChart = response.data
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetWallets: () => {
    return axios
      .get(`${api}/wallets`)
      .then(response => {
        if (response.data) {
          state.wallets = response.data.data
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetToken: () => {
    return axios
      .get(`${api}/graphs/token`)
      .then(response => {
        if (response.data) {
          state.token = response.data.data
          return response.data.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetExchangeResult: (body) => {
    return axios
      .get(`${api}/exchange-result?wallet_from=${body.wallet_from}&wallet_to=${body.wallet_id}&amount=${body.amount}
`)
      .then(response => {
        if (response.data) {
          state.exchangeresult = response.data
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  Exchange: (body) => {
    return axios
      .post(`${api}/exchange`, body)
      .then(response => {
        if (response.data) {
          state.exchangeresult = response.data
         actions.GetExchangeWallets().then(r => console.log(r))
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetExchangeWallets: () => {
    return axios
      .get(`${api}/exchange
`)
      .then(response => {
        if (response.data) {
          state.exchangewallets = response.data.data
          return response.data.data;
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
  GetNews: () => {
    return axios
      .get(`${api}/news`)
      .then(response => {
        if (response.data) {
          state.news = response.data.data.data
          return response.data.data.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetUserStatistics: () => {
    return axios
      .get(`${api}/user/statistic`)
      .then(response => {
        if (response.data) {
          state.userStatistics = response.data
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetReferrals: () => {
    return axios
      .get(`${api}/referrals/referrals-list`)
      .then(response => {
        if (response.data) {
          state.referrals = response.data
          return response.data;
        }
        return false;
      })
      .catch(error => {
        return {error};
      });
  },
  GetNewsById: (id) => {
    return axios
      .get(`${api}/news`, id)
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
  GetReferalLink: () => {
    return axios
      .get(`${api}/referal`)
      .then(response => {
        if (response.data) {
          return response.data
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
  Update: body => {
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
  UpdateWallet: (id, body) => {
    return axios
      .put(`${api}/wallets/${id}`, body)
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
    return new Promise((resolve, reject) => {
      axios.post(`${api}/password-change`, password)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  ForgetPassword: email => {
    return new Promise((resolve, reject) => {
      axios.post(`${api}/password/forget`, email)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  ResetPassword: body => {
    return new Promise((resolve, reject) => {
      axios.post(`${api}/password/reset`, body)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err)
        })
    })
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
                    return "err"
                  });
                resolve();
                return response.data;
              })
            }
          }
        )
        .catch(err => {
          reject(err);
          return err
        });
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
  isAuthenticated: () => state.access_token,
  getUser: () => state.user,
}
const store = {
  state,
  getters,
  actions
}
export default store
