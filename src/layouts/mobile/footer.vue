<template>
  <q-footer v-model='showFooter' reveal bordered class="bg-primary text-font mobile-footer" style="z-index:10000">
    <q-tabs
      v-model="tab"
      class="text-white items-center flex q-mt-xs row"
      no-caps
      outside-arrows
      mobile-arrows
      dense
      alignx="justify"
      content-class='ti-text-xs flex justify-around'
      indicator-color="accent"
      active-class='ti-active'
    >
      <profile class='q-mr-sm q-mb-xs no-border' :width='45' hasMenu noBadge></profile>
      <q-route-tab class='q-px-none col' to='/public' name="Courses" icon="school" label="Courses" :class="getColor('public')"/>
      <q-route-tab class='q-px-none col' to='/providers' name="Providers" icon="real_estate_agent" label="Providers" :class="getColor('providers')"/>
      <q-route-tab class='q-px-none col' to='/bookmarks' name="Bookmarks" icon="bookmarks" label="Bookmarks" :class="getColor('bookmarks')"/>

    </q-tabs>
    </q-footer>
</template>

<script>
import Profile from 'src/components/user/profile.vue'
export default {
  name: 'Layouts-Mobile-Footer',
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    },
    hide: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      tab: null,
      showFooter: true
    }
  },
  methods: {
    getColor (route) {
      let color = 'black'
      if (this.$route.matched.filter(x => x.path === '/' + route).length > 0) color = 'text-accent'
      return color
    }

  },
  computed: {
  },
  components: {
    Profile
  },
  created () {
    this.showFooter = !this.hide
  },
  watch: {
    hide (val) {
      this.showFooter = !val
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile-footer .ti-my-trips i, .mobile-footer .ti-todo i
  {
    font-size: 20px!important
  }
  // @import '~quasar-variables'
</style>
