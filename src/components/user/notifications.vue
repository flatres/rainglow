<template>
    <q-card>
      <q-card-section :style="$q.platform.is.desktop ? '' : 'padding: 15px'">
        <q-list class='q-py-sm' :class="{'q-px-md': $q.platform.is.desktop}" :style="$q.platform.is.desktop ? 'min-width: 500px' : ''">
          <q-bar class='bg-white q-pa-none q-pt-md q-pb-md'>
            <q-space/>
            <q-btn @click='$emit("close")' icon='close' round flat class='bg-grey-2' dense v-close-popup/>
          </q-bar>
          <!-- <q-btn class='full-width q-mb-md ti-text-heavy' color='accent' label='Close' @click='menuOpen = false; notificationsOpen = false'/> -->
          <h2 v-if='unreadNotifications.length === 0' class='text-center full-width'>No Notifications</h2>
          <div v-for='(n,i) in unreadNotifications' :key='n.id' @click='showDialog(n)'>
            <q-item class="q-py-none q-my-xs q-px-xs" clickable v-ripple @click='markAsRead(n)'>
              <q-item-section avatar style='min-height:50px'>
                <q-icon name='fas fa-check' color='accent' class='q-ml-sm q-my-sm' v-if='!n.traveller_id'/>
                <div v-if='n.traveller_id' class='flex items-center justify-center text-center'>
                  <!-- <q-icon size='lg' name='fas fa-user-circle' color='grey-6' v-if='!n.traveller.profileUrl'/> -->
                  <profile :width='45' :forceUrl='n.traveller.profileUrl' v-if='n.traveller.profileUrl' guest>
                  </profile>

                  <profile :width='45' :forceName='n.traveller.name' v-if='!n.traveller.profileUrl' guest>
                  </profile>

                </div>
                <!-- <q-icon name='fas fa-check' color='accent' v-if='!n.traveller_id'/> -->
                <!-- <q-icon size='lg' name='fas fa-user-circle' color='grey-6' v-if='n.traveller_id'/> -->
              </q-item-section>

              <q-item-section class='ti-text-heavy ti-text-md'>
                <q-item-label class='ti-one-line'>{{n.message}}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon v-if='n.hasRead === 0' name="fas fa-circle" size='sm' color="accent"/>
                <q-icon v-if='n.hasRead === 1' name="fas fa-check-circle" size='sm' color="accent"/>
              </q-item-section>
            </q-item>

            <q-separator v-if='i < unreadNotifications.length - 1'/>
          </div>
        </q-list>
      </q-card-section>
      <q-dialog v-model='dialogOpen'>
        <q-card v-if='currentNotification'>
          <q-item class="q-px-sm" clickable v-ripple style='margin-top:0px; margin-bottom:0px;'>
            <q-item-section avatar>
              <q-icon name='fas fa-check' color='accent' v-if='!currentNotification.traveller_id' class='q-ml-sm'/>
              <!-- <div v-if='currentNotification.traveller_id' class='flex items-center justify-center text-center'>
                <profile :width='45' :forceUrl='currentNotification.traveller.profileUrl' v-if='currentNotification.traveller.profileUrl' guest>
                </profile>
                <profile :width='45' :forceName='currentNotification.traveller.name' v-if='!currentNotification.traveller.profileUrl' guest>
                </profile>
              </div> -->
            </q-item-section>

            <q-item-section class='ti-text-heavy ti-text-md'>
              <q-item-label class='' :class='!currentNotification.traveller_id ? "q-ml-xs" : null'>{{currentNotification.message}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </q-dialog>
    </q-card>
</template>

<script>
// import profile from 'src/components/user/profile_alt.vue'
import { useUserStore } from 'stores/user'
import { mapState } from 'pinia'
import Api from 'src/api/user/profileApi.js'
export default {
  name: 'Component-profile-notifications',
  props: {
    trip: {
      type: Object
    }
  },
  data () {
    return {
      dialogOpen: false,
      currentNotification: null
    }
  },
  methods: {
    markAsRead (notification) {
      notification.hasRead = 1
      if (this.unreadNotifications.length === 0) this.notificationsOpen = false
      Api.putNotificationAsRead(this.process, null, notification)
    },
    process () {
      this.$emit('update')
    },
    showDialog (n) {
      if (this.isPhone) {
        this.currentNotification = n
        this.dialogOpen = true
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['notifications']),
    unreadNotifications () {
      if (this.trip) return this.notifications.filter(x => x.trip_id === this.trip.id)
      return this.notifications.filter(x => x.hasRead === 0)
    },
    isPhone () {
      return !this.$q.screen.gt.xs
    }
  },
  watch: {
  },
  created () {
  },
  components: {
    // Profile: profile
  }
}
</script>

<style lang="scss">

</style>
