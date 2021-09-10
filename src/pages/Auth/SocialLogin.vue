<template>
  <div class="q-mt-md">
    <p class="text-center q-pt-md">Или используйте социальные сети</p>
    <div class="row justify-center">
      <q-btn class="q-mx-md" flat color="accent" type="button" round icon="fab fa-facebook"
             @click="useAuthProvider('facebook', null)"/>
      <q-btn class="q-mx-md" flat color="accent" type="button" round icon="fab fa-google"
             @click="useAuthProvider('google', null)"/>
    </div>
  </div>

</template>

<script>
import {Providers} from "universal-social-auth";

export default {
  data() {
    return {
      responseData: {},
      hash: '',
      data: {},
      fauth: false
    }
  },

  methods: {
    useAuthProvider(provider, proData) {
      const ProData = proData || Providers[provider]
      this.$Oauth.authenticate(provider, ProData).then((response) => {
        const rsp = response
        if (rsp.code) {
          this.responseData.code = rsp.code
          this.responseData.provider = provider
          this.useSocialLogin()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    useSocialLogin() {
      // otp from input Otp form
      // hash user data in your backend with Cache or save to database
      const pdata = {code: this.responseData.code, otp: this.data.tok, hash: this.hash}
      this.$axios.post('/social-login/' + this.responseData.provider, pdata).then(async (response) => {
        // `response` data base on your backend config
        if (response.data.status === 444) {
          this.hash = response.data.hash
          this.fauth = true // Option show Otp form incase you using 2fa or any addition security apply to your app you can handle all that from here

        } else if (response.data.status === 445) {
          //do something Optional

        } else {

          await this.useLoginFirst(response.data.u)
        }
      }).catch((err) => {

        console.log(err)
      })
    },
    async useLoginFirst(e) {
      // this sample of to pust user data to my myStore
      console.log('userdata', e)
    }
  }
}
</script>
<style scoped>

</style>
