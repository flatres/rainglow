<template>
    <q-page class="">
      <div class='row fit'>

      </div>
    </q-page>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'PageResults',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('sockets', [
      'clearConsoleLog'
    ])
  },
  computed: {
  },
  components: {
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
  // @import '~quasar-variables'
</style>
