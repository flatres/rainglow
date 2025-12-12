<template>
  <q-header v-model='showHeader' bordered class="bg-primary text-white relative-position" reveal>
      <q-toolbar class='items-center text-center justify-center'>
        <q-btn
          class='q-ml-sm absolutex-left absolutex-top hidden'
          color='black'
          dense
          flat
          round
          icon="menu"
          @click="$router.push('/')"
        />
        <q-toolbar-title class=' row items-center justify-start q-pl-none' :class="{'q-pr-xl': !isLoggedIn}">
          <img alt='LearnFlow Logo' src="~assets/logos/v3/smallTransDark.png" height='35'/>
          <span class="x-name on-right text-white">LEARNFLOW</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
</template>

<script>
// import Profile from 'src/components/user/profile.vue'

export default {
  name: 'Layouts-Mobile-Header',
  props: {
    isLoggedIn: {
      required: true,
      type: Boolean
    },
    drawOpen: {
      type: Boolean
    },
    bannerIsOpen: {
      type: Boolean
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      left: false,
      ecologiOpen: true,
      showHeader: true
    }
  },
  methods: {
    closeBanner () {
      this.ecologiOpen = false
      this.$emit('update:bannerIsOpen', false)
    }
  },
  computed: {
    showEcologi () {
      return this.$route.path === '/' && this.ecologiOpen
    },
    isMobile () {
      return this.$q.platform.is.mobile
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
    this.showHeader = this.show
  },
  watch: {
    show () {
      console.log('show', this.show)
      this.showHeader = this.show
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import '~quasar-variables'
  .x-name {
    // font-family: "Montserrat", sans-serif;
    // font-family: Audiowide;
    font-family: Avenir-Heavy;
    font-size: 20px;
    color: $primary;
    font-weight:800;
  }
</style>
