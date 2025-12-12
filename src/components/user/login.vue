<template>
  <q-card
    class="flex bg-white x-login-card"
    :style="$q.platform.is.desktop ? 'width: 500px; max-width: 90vw;' : ''"
    :class='{"flex-center": $q.platform.is.desktop}'>
    <q-card-section class='full-width' :class='{"no-border no-shadow q-px-none": $q.platform.is.mobile}'>
      <q-tabs
        v-if='tab === "login" || tab==="signup"'
        v-model="tab"
        indicator-color="primary"
        content-class="x-text-heavy x-text-xl hidden"
        no-caps
      >
        <q-tab content-class="x-text-heavy x-text-xl" label="Sign Up" name='signup' />
        <q-tab label="Log In" name='login' v-if='!guest' />
      </q-tabs>
      <q-tab-panels v-model='tab' class='q-mt-none'>
        <q-tab-panel name='login' class="q-pt-none">
          <div @keyup.enter='submit'>
            <div class="row full-width justify-center flex items-center">
                <!-- src="~assets/logos/v3/smallTrans120x120.png" -->
              <q-img
                @click="$router.push('/')"
                src="~assets/logos/v3/smallTrans.png"
                spinner-color="white"
                fetchpriority="high"
                alt="LearnFlow Logo"
                no-native-menu
                fit="fill"
                heightx="48px"
                widthx="40px"
                style="heightx: 48px; max-width: 60px"
                class="q-mr-md qx-my-md"
              />
              <div class="x-name flex items-center text-bold text-black" style="font-size:34px!important"><span>Learn<span class="text-accent">Flow</span></span></div>
            </div>
            <q-separator class="q-mt-md"></q-separator>
            <h1 class="q-py-none no-margin hidden text-center full-width x-text-lg" style="height:30px; line-height:30px">Log in with</h1>
            <div class="row q-mt-md q-py-md">
                <div class="col">
                  <GoogleLogin :callback="googleCallback" prompt class="col-6"/>
                </div>
                <div class='col text-right'>
                  <q-btn @click='linkedin' no-shadow class="col-6 q-pa-none" flat style="max-height:38px!important">
                    <img style="max-height:38px!important; max-width:198px" src="~assets/logos/external/linkedin_signin.png" class="full-width">
                  </q-btn>
                </div>
              </div>
            <div class="row q-mt-md hidden">
                <div class="col text-center">
                  <GoogleLogin :callback="googleCallback" prompt class="col-6"/>
                </div>
            </div>
            <div class="row q-mt-none q-mb-md hidden">
              <div class='col text-center'>
                <q-btn @click='linkedin' no-shadow class="col-6 q-pa-none" flat style="max-height:38px!important">
                  <img style="max-height:38px!important; max-width:198px" src="~assets/logos/external/linkedin_signin.png" class="full-width">
                </q-btn>
              </div>
            </div>
          <div class="row flex items-center q-mb-md">
            <span class='col' style="height:1px; border:1px solid rgb(243, 243, 243)"></span>
            <span class="text-bold q-mx-sm">OR</span>
            <span class='col' style="height:1px; border:1px solid rgb(243, 243, 243)"></span>
          </div>
          <q-form>
              <q-input autofocus v-model="email" color="black" outlined placeholder="Username" type='text' class='q-mb-md x-text-dark-grey bg-white'/>
              <q-space />
              <div>
              <q-input autocomplete="current-password" color="black" outlined v-model="password" :type="isPwd ? 'password' : 'text'" placeholder="Password" class='x-text-dark-grey'>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer text-font"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              </div>
              <div class="row q-mt-md hidden">
                <div class="col">
                  <GoogleLogin :callback="googleCallback" prompt class="col-6"/>
                </div>
                <div class='col text-right'>
                  <q-btn @click='linkedin' no-shadow class="col-6 q-pa-none" flat style="max-height:38px!important">
                    <img style="max-height:38px!important; max-width:198px" src="~assets/logos/external/linkedin_signin.png" class="full-width">
                  </q-btn>
                </div>
              </div>
            </q-form>
            <!-- <q-field>
              <q-input v-model="password" type="password" float-label="Password" dark color="white"/>
            </q-field> -->
            <p class='row full-width flex-center x-text-heavy x-text-md q-mt-lg'>Don't have an account yet?<a clickable @click='tab="signup"' class='text-primary q-ml-sm'>Sign Up</a></p>
            <p @click='tab="reset"' class='row full-width flex-center x-text-heavy text-primary x-text-md q-mt-lg'>Forgot password?</p>
            <p class='text-red q-mb-none x-text-heavy text-center' v-if='error'>{{errorMessage}}</p>
            <q-btn rounded @click="submit" :disabled='busy' color="primary" label="Login" class='full-width q-mt-lg x-text-heavy x-text-md' style='height:50px'/>

          </div>
        </q-tab-panel>
        <q-tab-panel name='signup'>
          <div class="row full-width justify-center flex items-center">
                <!-- src="~assets/logos/v3/smallTrans120x120.png" -->
              <q-img
                @click="$router.push('/')"
                src="~assets/logos/v3/smallTrans.png"
                spinner-color="white"
                fetchpriority="high"
                alt="LearnFlow Logo"
                no-native-menu
                fit="fill"
                heightx="48px"
                widthx="40px"
                style="heightx: 48px; max-width: 60px"
                class="q-mr-md qx-my-md"
              />
              <div class="x-name flex items-center text-bold text-black" style="font-size:34px!important"><span>Learn<span class="text-accent">Flow</span></span></div>
            </div>
            <q-separator class="q-mt-md"></q-separator>
            <h1 class="q-py-none no-margin hidden text-center full-width x-text-lg" style="height:30px; line-height:30px">Log in with</h1>
            <div class="row q-mt-md q-py-md">
                <div class="col">
                  <GoogleLogin :callback="googleCallback" prompt class="col-6"/>
                </div>
                <div class='col text-right'>
                  <q-btn @click='linkedin' no-shadow class="col-6 q-pa-none" flat style="max-height:38px!important">
                    <img style="max-height:38px!important; max-width:198px" src="~assets/logos/external/linkedin_signin.png" class="full-width">
                  </q-btn>
                </div>
              </div>
            <div class="row q-mt-md hidden">
                <div class="col text-center">
                  <GoogleLogin :callback="googleCallback" prompt class="col-6"/>
                </div>
            </div>
            <div class="row flex items-center q-mb-md">
            <span class='col' style="height:1px; border:1px solid rgb(243, 243, 243)"></span>
            <span class="text-bold q-mx-sm">OR</span>
            <span class='col' style="height:1px; border:1px solid rgb(243, 243, 243)"></span>
          </div>
          <div @keyup.enter.stop='goSignup'>
            <q-input :autofocus='!this.guest ? true : false' v-model="signup.name" color="black" outlined placeholder="Name" type='text' class='q-mb-lg text-black' input-class='x-text-dark-grey'/>
            <q-space />
            <q-input :readonly='guest ? true : false' v-model="signup.email" color="black" outlined placeholder="Email" type='email' class='q-mb-lg' input-class='x-text-dark-grey bg-white'/>
            <q-space />
            <!-- https://stackoverflow.com/questions/12374442/chrome-ignores-autocomplete-off -->
            <q-input :autofocus='this.guest ? true : false' autocomplete="new-password" outlined color="black" v-model="signup.password" :type="isPwd ? 'password' : 'text'" placeholder="Password" input-class='x-text-dark-grey bg-white'>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer text-font"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <p class='row full-width flex-center x-text-heavy x-text-md q-mt-lg'>Already have an account?<a clickable @click='tab="login"' class='text-primary q-ml-sm'>Click here</a></p>
            <q-btn rounded :disabled='!canSignup' @click="goSignup" color="primary" label="Sign Up" class='full-width q-mt-lg x-text-heavy x-text-md' style='height:50px'/>
            <div class='x-text-heavy text-red full-width text-center q-mt-lg' v-if='signupErrorMessage'>{{signupErrorMessage}}</div>
          </div>
        </q-tab-panel>
        <q-tab-panel name='reset' style='height:322px'>
          <div @keyup.enter.stop='goReset'>
            <p class='x-text-heavy x-text-lg'>Reset your password</p>
            <q-input autofocus v-model="reset.email" color="black" outlined placeholder="Email Address" type='email' class='q-mb-lg' input-class='x-text-dark-grey bg-white'/>
            <p>We will email you instructions for resetting your password.</p>
            <q-space/>
            <q-btn rounded :disabled='reset.email.length === 0 || busy' @click="goReset" color="primary" label="Reset My Password" class='full-width q-mt-lg x-text-heavy x-text-md' style='height:50px'/>
            <p @click='tab="login"' class='row full-width flex-center x-text-heavy text-primary x-text-md q-mt-lg'>Back To Log In</p>
          </div>
        </q-tab-panel>
        <q-tab-panel name='resetSuccess' style='height:322px;' class='column q-pt-none'>
          <div class='col full-width flex justify-center items-center'>
            <div>
              <p class='x-text-heavy x-text-lg'>In the next 24 hours, you must follow these steps</p>
              <ul class='x-text-light x-text-md q-mb-xl'>
                <li>Open the email sent to {{reset.email}}</li>
                <li>Click the link in the email to be taken to the page where you will create a new password</li>
                <li>Save the new password.</li>
              </ul>
              <q-btn @click="tab='login'" color="primary" label="Back To Log In" class='full-width q-mt-lg x-text-heavy x-text-md' style='height:50px'/>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script>
import SignupApi from 'src/api/user/signupApi.js'
import { useUserStore } from 'stores/user'
import { mapActions } from 'pinia'
import { LocalStorage } from 'quasar'

export default {
  name: 'Page-Login',
  emits: ['close'],
  props: {
    signupOn: {
      required: true
    },
    isProvider: {
      required: false
    },
    guest: {
      type: Object
    },
    suppressRouter: {
      type: Boolean
    }
  },
  components: {

  },
  data () {
    return {
      tab: 'login',
      isPwd: true,
      email: '',
      password: '',
      busy: false,
      error: false,
      errorMessage: false,
      signup: {
        name: '',
        email: '',
        password: '',
        hash: null
      },
      reset: {
        email: ''
      },
      signupBusy: false,
      signupErrorMessage: ''
      // isPwd: true
    }
  },
  methods: {
    ...mapActions(useUserStore, ['login', 'loginWithKey', 'saveData']),
    googleCallback (data) {
      SignupApi.postGoogle(this.processGoogle, this.$errorFunction, data)
    },
    processGoogle (data) {
      this.saveData(data)
      this.$emit('close', data)
      this.busy = false
    },
    submit () {
      this.busy = true
      const formData = {
        login: this.email,
        password: this.password
      }
      this.login(formData)
        .then(response => {
          this.$emit('close', response.data)
          this.busy = false
        })
        .catch(error => {
          this.error = true
          this.busy = false
          console.log(error)
          this.errorMessage = error.response.data.message.message
          console.warn(error)
        })
      // this.$router.replace('/')
    },
    goSignup () {
      this.busy = true
      SignupApi.postSignup(
        (loginObject) => {
          this.busy = false
          this.saveData(loginObject)
          this.$emit('close', loginObject)
          if (!this.suppressRouter) this.$router.push('/successful-signup')
        },
        (error) => {
          console.error(error)
          this.busy = false
          this.signupErrorMessage = 'Email address already registered'
        },
        this.signup)
    },
    goReset () {
      this.busy = true
      SignupApi.postReset(
        () => {
          this.busy = false
          this.tab = 'resetSuccess'
        },
        (error) => {
          console.error(error)
          this.busy = false
        },
        this.reset)
    },
    errorHandler (data) {
      this.error = true
      this.errorMessage = data.message
    },
    goStart () {
      this.$emit('close')
      this.$router.push('/start')
    },
    setGuest () {
      if (this.guest) {
        this.tab = 'signup'
        this.signup.name = this.guest.name
        this.signup.email = this.guest.email
      }
    },
    linkedin () {
      let state = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const length = 10
      let counter = 0
      while (counter < length) {
        state += characters.charAt(Math.floor(Math.random() * characters.length))
        counter += 1
      }
      LocalStorage.set('linkedin_state', state)
      LocalStorage.set('linkedin_location', window.location.href)
      const redirect = window.location.origin + '/linkedin'
      const url = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78oqnbi4db4s0g&redirect_uri=' + redirect + '&state=' + state + '&scope=r_liteprofile%20r_emailaddress'
      window.location.href = url
    }
  },
  computed: {
    canSignup () {
      return this.signup.email.length > 0 && this.signup.name.length > 0 && this.signup.password.length > 0
    }
  },
  watch: {
    guest () {
      this.setGuest()
    }
  },
  created () {
    this.tab = this.signupOn ? 'signup' : 'login'
    this.setGuest()
  }

}
</script>

<style lang="scss" scoped>
.x-login-card .q-input
{
  padding-left:0px!important
}
// @import '~quasar-variables'

  .q-field__native
    // background-color:green!important
  .q-if {
          margin: 16px 0px;
        }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
      -webkit-transition-delay: 9999s;
  }
</style>
