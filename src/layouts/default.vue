<template>
  <q-layout :view="view" class="no-scroll overflow-hidden">
      <q-page-container class="x-scrollY xxs no-scroll overflow-hidden no-border">
        <router-view @scrollOn="hideMobileFooter=true" @scrollOff="hideMobileFooter=false" class="no-border"/>
    </q-page-container>
  </q-layout>
</template>

<script>

import { } from 'stores/user'
import { } from 'pinia'

export default {
  name: 'Layout-Default',
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  components: {
  }
}
</script>

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
  height: 256px;
}

.top-toolbar
{
    // border-bottom:1px solid $grey-4!important
}

.x-header-button-bordered
{
    border: 2px solid white;
    width: 95px;
    height: 40px;
    border-radius: 3px;
    color: white;
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
