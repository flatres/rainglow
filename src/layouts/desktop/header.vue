<template>
  <q-header class="bg-white text-black " style='height:70px: z-index:9999'>
  </q-header>
</template>

<script>

export default {
  name: 'Layouts-Desktop-Header',
  props: {
  },
  emits: [],
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  components: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
    $route: {
      deep: true,
      handler (to, from) {
        this.checkRoute()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
