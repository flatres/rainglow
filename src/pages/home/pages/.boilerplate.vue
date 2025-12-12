<template>
  <toolbar-page
    :elements='elements'
  ></toolbar-page>
</template>

<script>

import ToolbarPage from '@/components/toolbarPage/toolbarPage'
import Basic from '../components/crud/basic'

export default {

  name: 'PageLabCrud',
  data () {
    return {
      elements: [
        {
          name: 'basic',
          label: 'basic',
          component: Basic,
          shortcut: 'b'
        },
        {
          name: 'advanced',
          label: 'advanced',
          shortcut: 'a'
        },
        {
          name: 'options',
          label: 'basic',
          menu: [
            {
              name: 'basic',
              label: 'Basic',
              shortcut: 'b',
              icon: 'fal fa-child'
            }
          ]
        }

      ]
    }
  },
  components: {
    toolbarPage: ToolbarPage
  }

}
</script>

<style :scoped>
</style>
