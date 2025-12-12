<template>
  <div class='column window-height'>
    <q-toolbar class='items-center q-mt-md  ' :class="{'justify-start': isLoggedIn, 'justify-around': !isLoggedIn}">
      <q-toolbar-title v-if='isLoggedIn' class='q-mt-sm'>
        <img src="statics/logo_c.png" height='35'/>
      </q-toolbar-title>
      <!-- <q-space/> -->
      <q-btn v-if='!isLoggedIn' @click='$emit("signup")' class='ti-user-button q-ml-md ti-header-button-bordered' label="Sign up" no-caps style='min-width:87px'/>
      <q-btn v-if='!isLoggedIn' @click='$emit("login")' class='ti-user-button q-ml-lg ti-header-button-bordered' label='Log in' no-caps style='min-width:87px'></q-btn>
      <profile :style='!isLoggedIn ? "visibility:hidden" : ""' class='q-mr-sm absolute-right absolute-top' :width='55' hasMenuX noBadge style='right:10px!important; transform: scale(0.8); '></profile>
    </q-toolbar>
    <q-list class='q-mt-md'>
      <q-separator/>
      <q-item>
          <router-link to="/" exact>
            <template v-slot="props">
              <q-btn
                flat
                class='block ti-text-light ti-text-tab ti-nav-tabs'
                no-caps
                label='Home'
                to='/'
                v-bind="buttonProps(props)"
              ></q-btn>
            </template>
          </router-link>
      </q-item>
      <q-separator/>
      <q-item>
          <q-btn
            flat
            class='block ti-text-light ti-text-tab ti-nav-tabs text-grey-7'
            no-caps
            label='Plan A Trip'
            @click='goTrip'
          ></q-btn>
      </q-item>
      <q-separator/>
      <q-item>
          <router-link to="/trips">
            <template v-slot="props">
              <q-btn
                flat
                class='block ti-text-light ti-text-tab ti-nav-tabs'
                no-caps
                label='My Trips'
                to='/trips'
                v-bind="buttonProps(props)"
              ></q-btn>
            </template>
          </router-link>
      </q-item>
      <q-separator/>
      <q-item>
          <router-link to="/how">
            <template v-slot="props">
              <q-btn
                flat
                class='block ti-text-light ti-text-tab ti-nav-tabs'
                no-caps
                label='How It Works'
                to='/howitworks'
                v-bind="buttonProps(props)"
              ></q-btn>
            </template>
          </router-link>
      </q-item>
      <q-separator/>
      <!-- <q-item>
          <router-link to="/about">
            <template v-slot="props">
              <q-btn
                flat
                class='block ti-text-light ti-text-tab ti-nav-tabs'
                no-caps
                label='About'
                to='/about'
                v-bind="buttonProps(props)"
              ></q-btn>
            </template>
          </router-link>
      </q-item>
      <q-separator/> -->
      <q-item>
          <router-link to="/inspiration">
            <template v-slot="props">
              <q-btn
                flat
                class='block ti-text-light ti-text-tab ti-nav-tabs'
                no-caps
                label='Inspiration'
                to='/inspiration'
                v-bind="buttonProps(props)"
              ></q-btn>
            </template>
          </router-link>
      </q-item>
      <q-separator/>
      <q-item>
          <router-link to="/faq">
            <template v-slot="props">
              <q-btn
                flat
                class='block ti-text-light ti-text-tab ti-nav-tabs'
                no-caps
                label='FAQ'
                to='/faq'
                v-bind="buttonProps(props)"
              ></q-btn>
            </template>
          </router-link>
      </q-item>
    </q-list>
    <q-space/>
    <div class='row flex items-center full-width justify-around q-mb-md'>
      <q-btn size='md' to='/privacy' flat color='grey-7' label='Privacy Policy' dense no-caps class='ti-text-light q-mr-md q-mt-sm'/>
      <q-btn size='md' to='/cookies' flat color='grey-7' label='Cookie Policy' dense no-caps class='ti-text-light q-mt-sm'/>
    </div>

    </div>
</template>

<script>
import Profile from 'src/components/user/profile.vue'
export default {
  name: 'Layouts-Desktop-Header',
  props: {
    isLoggedIn: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
    }
  },
  methods: {
    buttonProps ({ href, route, isActive, isExactActive }) {
      const props = {}
      if (isActive === true) {
        props.color = 'accent'
      } else {
        props.color = 'grey-7'
      }
      return props
    },
    goTrip () {
      this.$emit('trip')
    }
  },
  computed: {
  },
  components: {
    Profile
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  // @import '~quasar-variables'
</style>
