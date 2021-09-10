import axios from 'axios'
import UniversalSocialauth from "universal-social-auth";
import { boot } from 'quasar/wrappers'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const options = {
  providers: {
    // apple: {
    //   nonce: '**************',
    //   state: '**************',
    //   clientId: '**************',
    //   redirectUri: 'https://myapp.com/auth/github/callback'
    // },
    github: {
      clientId: '78bfc07e1f25b5e22c26',
      redirectUri: 'https://diadal.com.ng/auth/github/callback'
    },
    // google: {
    //   clientId: '***************',
    //   redirectUri: 'https://myapp.com/auth/google/callback'
    // },
    // facebook: {
    //   clientId: '************',
    //   redirectUri: 'https://myapp.com/auth/facebook/callback'
    // },
    // twitter: {
    //   url: 'https://myapp.com/auth/twitter',
    //   clientId: '********',
    //   redirectUri: 'https://myapp.com/auth/twitter/callback'
    // }
  }
}

const Oauth = new UniversalSocialauth(axios, options)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$Oauth = Oauth
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { Oauth }
