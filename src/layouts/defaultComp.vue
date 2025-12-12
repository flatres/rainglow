<script setup>

import { useUserStore } from 'stores/user'
import { ref, computed, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
// import Login from '../components/user/login.vue'
// import HeaderDesktop from './desktop/header.vue'
// import FooterDesktop from './desktop/footer.vue'
// import Drawer from './mobile/drawer.vue'
// import HeaderMobile from './mobile/header.vue'
// import FooterMobile from './mobile/footer.vue'

const $q = useQuasar()
const store = useUserStore()
const search = ref('')
const link = ref(null)
const loginOpen = ref(false)
const signupPanel = ref(false)
const loginKey = ref(false)
const hideFooter = ref(false)
const drawOpen = ref(false)

function navigate (route) { this.$router.push({ path: '/' + route }) }

function checkForceLogin (route) {
  const inTrips = this.$route.matched.find(x => x.path === '/trips')
  const inTrip = this.$route.matched.find(x => x.path === '/trip')
  const inPage = inTrips || inTrip

  if (inPage && !state.isLoggedIn) {
    this.loginOpen = true
    return true
  }
  if (this.guest && state.isLoggedIn) {
    this.loginOpen = false
    return false
  }
}

function checkRoute (to) {
  if (this.$q.loading.isActive) return true
  this.checkForceLogin(to)
  this.hideFooter = this.$route.matched.filter(x => x.path === '/search').length > 0 || this.$route.matched.filter(x => x.path === '/trips').length > 0 || this.$route.matched.filter(x => x.path === '/trip').length > 0
}

function goLogin () {
  console.log('ds')
  this.loginKey++
  this.signupPanel = false
  this.loginOpen = true
}

const view = computed(() => {
  if (this.isMobile) return 'hHh lpR fFf'
  return 'hHh lpR fFf'
})

const isMobile = computed(() => {
  return this.$q.platform.is.mobile
})

const hideMobileFooter = computed(() => {
  return this.$route.matched.filter(x => x.path === '/trip').length > 0
})

const route = useRoute()

watch(
  () => route.fullPath,
  async () => {
    console.log('route fullPath updated', route.fullPath)
  }
)

onMounted(() => {
  // this.checkForceLogin()
  // this.checkRoute()
  console.log('mounted', this)
})

return {loginKey}
</script>

<template>
  <q-layout :view="view">
    <header-desktop
      v-if='!isMobile'
      :isLoggedIn='isLoggedIn'
      @signup='loginKey++; signupPanel = true; loginOpen = true;'
      @login='goLogin()'
      @trip='newTripOpen = true'
      >
    </header-desktop>
    <header-mobile
      v-if='isMobile'
      :isLoggedIn='isLoggedIn'
      @signup='loginKey++; signupPanel = true; loginOpen = true;'
      @login='loginKey++; signupPanel = false; loginOpen = true'
      v-model:drawOpen='drawOpen'
      @trip='newTripOpen = true'
      >
    </header-mobile>

    <q-drawer v-if='isMobile' v-model="drawOpen" side="left" bordered class='q-pt-xl' style='z-index:10000' :breakpoint='10000'>
      <drawer
        class='z-max'
        :isLoggedIn='isLoggedIn'
        @signup='loginKey++; signupPanel = true; loginOpen = true; drawOpen=false'
        @login='loginKey++; signupPanel = false; loginOpen = true; drawOpen=false'
        @trip='newTripOpen = true; drawOpen=false; '
        ></drawer>
    </q-drawer>

    <q-page-container :style='!isMobile ? "min-width:1064px" : "padding-top:0px"' class='scroll' :class='{"bg-secondary" : hideFooter, "q-mb-xl" : isMobile && !hideMobileFooter, "q-mt-xl" : isMobile && bannerIsOpen}'>
      <router-view />
      <footer-desktop v-if='!isMobile' :hideFooter='hideFooter'></footer-desktop>
    </q-page-container>

    <footer-mobile v-if='isMobile && !hideMobileFooter' :isLoggedIn='isLoggedIn' @login='loginKey++; signupPanel = false; loginOpen = true' class='q-mt-xl'></footer-mobile>

    <q-dialog v-if='loginOpen && !isMobile' v-model="loginOpen" :persistent='checkForceLogin($route)' :loginKey='loginKey' :maximized='isMobile' class='items-start'>
      <login @close='loginOpen=false' :signupPanel='signupPanel' :guest='this.guest'></login>
    </q-dialog>

    <q-dialog v-if='loginOpen && isMobile' v-model="loginOpen" :persistent='checkForceLogin($route)' :loginKey='loginKey' :maximized='isMobile' class='items-start'>
      <q-card class='column no-shadow no-border'>
        <q-bar class='bg-white' style='border-bottom: 1px solid #E7E8E8; height: 50px'>
          <q-icon color='accent' name='fas fa-chevron-left' v-close-popup @click='loginOpen = false'/>
        </q-bar>
        <q-card-section class='col no-padding'>
          <login class='no-padding no-border no-padding no-shadow' @close='loginOpen=false' :signupPanel='signupPanel' :guest='this.guest'></login>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-sticky v-if='!cookiesAccepted' expand position="bottom" class='z-max'>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        >
          <q-banner dense class="bg-primary text-white absolute-bottom q-py-lg" style='border-top: 1px solid grey'>
            <div class='row justify-center full-width bg-white'>
              <div class='x-row row items-start'>
                <div class='desktop-only items-start flex col-2' style='min-width:180px'>
                  <img
                    src="src/assets/logo_trans_lg.png"
                    style="width: 150px"
                  >
                </div>
                <div class='col text-black'>
                  <div class='row x-text-heavy x-text-xl q-mb-sm'>We value your privacy</div>
                  <div class='row x-text-light' style='max-width:480px'>This site uses cookies and similar technologies to analyse traffic, personalise content and ads, and provide social media features.</div>
                  <div class='row q-my-md'>
                    <q-btn @click='acceptCookies' color='accent' label='accept' class='x-bstn x-text-heavy' style='width:300px'/>
                  </div>
                  <div class='row x-text-light'>
                    <q-btn to='/cookies' flat color='accent' label='Learn more and adjust settings' dense no-caps class='x-text-heavy'/>
                  </div>
                </div>
              </div>

            </div>
          </q-banner>
        </transition>
    </q-page-sticky>
    <q-dialog
       :maximized='$q.platform.is.mobile'
       class='no-padding'
       persistent
       position='top'
       v-model="newTripOpen">
       <new-trip @close='newTripOpen=false' style='margin-top:10vh'></new-trip>
     </q-dialog>
  </q-layout>
</template>

<style lang="scss">
.x-nav-tabs .q-tab__label {
  font-size:16px
}

.x-nav-links .block
{
  font-size: 16px!important
}

.x-footer
{
  height: 356px;
  background:#252638
}

.top-toolbar
{
    border-bottom:1px solid $grey-4!important
}

.x-header-button-bordered
{
    border: 2px solid black;
    width: 95px;
    height: 40px;
    border-radius: 3px;
    color: black;
    font-size: 16px;
}

.x-user-button .q-btn__content
{
  margin-top:-3px!important
}

.x-user-button .q-btn__wrapper
{
  height: 40px;
  padding-top:2px
}
</style>
