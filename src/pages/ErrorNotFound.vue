<template>
  <div class="fullscreen bg-white text-white text-center q-pa-md flex flex-center">
    <div class="row q-col-gutter-md justify-start content-start items-start col-12 q-pr-sm q-pt-md items-stretch">
      <div class='full-width'>
        <div class="full-width text-center q-mt-xl">
          <q-img
            @click="$router.push('/')"
            src="~assets/logos/v3/smallWhite.png"
            spinner-color="white"
            fit="fill"
            style="heightx: 48px; max-width: 190px"
            class="q-mr-md qx-my-md"
          />
        </div>
        <h1 class="full-width text-bold text-grey-7 q-mt-none text-center" style="font-size:25px">Nothing here</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
