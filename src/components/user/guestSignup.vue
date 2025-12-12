<template>
  <q-card class="flex flex-center bg-white" style="width: 500px; max-width: 90vw;">
    <q-card-section class='full-width'>
      <q-tabs
        v-model="tab"
        indicator-color="accent"
        content-class="ti-text-heavy ti-text-xl"
        no-caps
      >
        <q-tab content-class="ti-text-heavy ti-text-xl" label="Sign Up" name='signup' />
        <q-tab label="Log In" name='login' />
      </q-tabs>
      <q-tab-panels v-model='tab' class='q-mt-lg'>
        <q-tab-panel name='login'>
          <div @keyup.enter='submit'>
            <q-form>
              <q-input autofocus v-model="login" color="black" outlined placeholder="Username" type='text' class='q-mb-md ti-text-dark-grey bg-white'/>
              <q-space />
              <div>
              <q-input autocomplete="current-password" color="black" outlined v-model="password" :type="isPwd ? 'password' : 'text'" placeholder="Password" class='ti-text-dark-grey'>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer text-font"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              </div>
            </q-form>
            <!-- <q-field>
              <q-input v-model="password" type="password" float-label="Password" dark color="white"/>
            </q-field> -->
            <p class='row full-width flex-center ti-text-heavy ti-text-md q-mt-lg'>Don't have an account yet?<a clickable @click='tab="signup"' class='text-accent q-ml-sm'>Sign Up</a></p>
            <p class='row full-width flex-center ti-text-heavy text-accent ti-text-md q-mt-lg'>Forgot password?</p>
            <p class='text-red q-mb-none ti-text-heavy text-center' v-if='error'>{{errorMessage}}</p>
            <q-btn @click="submit" :disabled='busy' color="accent" label="Login" class='full-width q-mt-lg ti-text-heavy ti-text-md' style='height:50px'/>
            <q-btn @click="submit" :disabled='busy' rounded outline label="Log in with google" class='full-width q-mt-lg hidden'/>

          </div>
        </q-tab-panel>
        <q-tab-panel name='signup'>
          <q-form autocomplete="off" @keyup.enter='goSignup'>
            <q-input autofocus v-model="signup.name" color="black" outlined placeholder="Name" type='text' class='q-mb-lg text-black' input-class='ti-text-dark-grey'/>
            <q-space />
            <q-input v-model="signup.email" color="black" outlined placeholder="Email" type='email' class='q-mb-lg' input-class='ti-text-dark-grey bg-white'/>
            <q-space />
            <!-- https://stackoverflow.com/questions/12374442/chrome-ignores-autocomplete-off -->
            <q-input autocomplete="new-password" outlined color="black" v-model="signup.password" :type="isPwd ? 'password' : 'text'" placeholder="Password" input-class='ti-text-dark-grey bg-white'>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer text-font"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn @click="goSignup" color="accent" label="Sign Up" class='full-width q-mt-lg ti-text-heavy ti-text-md' style='height:50px'/>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script>
import SignupApi from '@/api/user/signupApi'

export default {
  name: 'Page.Login',
  props: {
    signupPanel: {
      required: true
    }
  },
  data () {
    return {
      tab: 'login',
      isPwd: true,
      login: '',
      password: '',
      busy: false,
      error: false,
      errorMessage: false,
      signup: {
        name: 'Simon Flatres',
        email: 'admin@trip-in.com',
        password: 'mmondcol'
      },
      signupBusy: false
      // isPwd: true
    }
  },
  methods: {
    submit () {
      // this.busy = true
      const formData = {
        login: this.login,
        password: this.password
      }
      this.$store.dispatch('user/login', formData)
        .then(response => {
          this.$emit('close')
        })
        .catch(error => {
          this.error = true
          this.errorMessage = 'Incorrect email address / password'
          console.warn(error)
        })
      // this.$router.replace('/')
    },
    goSignup () {
      SignupApi.postSignup(() => { this.$router.push('/successful-signup') }, this.$errorHandler, this.signup)
    },
    errorHandler (data) {
      this.error = true
      this.errorMessage = data.message
    }
  },
  created () {
    this.tab = this.signupPanel ? 'signup' : 'login'
  }

}
</script>

<style lang="stylus" scoped>
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
