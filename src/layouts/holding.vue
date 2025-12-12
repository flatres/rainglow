<template>
    <q-layout view="hHh lpR fFf">

    <q-page-container>
        <q-page style="background:#2f476f" class="flex flex-center">
            <router-view class='q-px-md' />
            <img
                alt="Quasar logo"
                src="~assets/logoTextHolding.svg"
                style="width: 50%; height: 50%"
            >

        </q-page>
    </q-page-container>

  </q-layout>

</template>

<script>
export default {
  name: 'Holding-Page'
}

</script>

<style lang="scss">

</style>
