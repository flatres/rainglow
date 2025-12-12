<template>
  <!-- menuOpen = false; notificationsOpen = false -->
    <div class='no-shadow flex items-center justify-start' style='position: relative; z-index:997'>
      <q-btn
        class='bg-white shadow '
        round
        outlixne
        @click='notificationsOpen = false; menuOpen=true'
        color='white'
        :style='dimensions'
        >
        <q-avatar :style='!url && !forceProfileImgPath ? "border: 3px solid white" : ""' :size="widthPixels" class='text-white ti-text-heavy' font-size='40%' :class='!url && !forceProfileImgPath ? "bg-gradient" : ""'>
          <img :src="require(`${forceProfileImgPath}`)" v-if='forceProfileImgPath' style='padding:3px'>
          <img :src="url" v-if='url.length > 1' style='padding:3px'>
          <div v-if='!url && !forceProfileImgPath' class='fit items-center justify-center flex' style='margin-left:-6px; margin-top: -3px'>{{initials}}</div>
          <q-menu
            v-if='hasMenu && !notificationsOpen'
            class='no-padding'
            transition-show="scale"
            transition-hide="scale"
            v-model='menuOpen'
            fit
            anchor='bottom middle'
            style='height:194px; min-height:194px'
            >
            <q-list style="min-width: 265px; min-height:194px" class='q-py-sm q-px-md ti-text-heavy ti-text-md' v-if='!notificationsOpen'>
              <q-item class='q-px-xs' clickable @click.stop='notificationsOpen=true; menuOpen = true'>
                <q-item-section>Notifications</q-item-section>
                <q-item-section side>
                  <q-badge v-if='unreadCount > 0' class='z-max' round color="accent">{{unreadCount}}</q-badge>
                </q-item-section>
              </q-item>
              <q-separator spaced/>
              <q-item @click='goProfilePage(); menuOpen=false' class='q-px-xs' clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item @click='logout' class='q-px-xs' clickable>
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-menu
            v-if='hasMenu && notificationsOpen'
            class='no-padding'
            transition-show="scale"
            transition-hide="scale"
            v-model='notificationsOpen'
            :persistent='notificationsOpen'
            content-style='min-width:300px!important'
            anchor='bottom right'
            >
              <notifications @close='menuOpen = false; notificationsOpen = false'></notifications>
            </q-menu>
        </q-avatar>
      </q-btn>
      <q-badge v-if='hasUnread && hasMenu' class='z-max ti-notifications-badge ti-text-heavy text-white' color="accent" style='border: 1px solid white'>{{unreadCount}}</q-badge>
      <q-btn v-if='leader' class='bg-white ti-crown flat z-max' filled icon='fas fa-crown fa-xs' round text-color='accent' size='sm'/>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from 'stores/user'
import Api from 'src/api/user/profileApi.js'
import Notifications from './notifications.vue'
export default {
  name: 'Component-profile',
  props: {
    width: {
      type: Number,
      default: 216
    },
    leader: {
      type: Boolean,
      default: false
    },
    hasMenu: {
      type: Boolean,
      default: false
    },
    blank: {
      type: Boolean
    },
    forceUrl: {
      type: String
    },
    forceName: {
      type: String
    },
    forceProfileImg: {
      type: String
    },
    forceProfileUrl: {
      type: String
    },
    guest: {
      type: Boolean
    }
  },
  data () {
    return {
      notificationsOpen: false,
      menuOpen: false
    }
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    goProfilePage () {
      this.$router.push({ path: '/profile/' })
    },
    markAsRead (notification) {
      notification.hasRead = 1
      if (this.unreadNotifications.length === 0) this.notificationsOpen = false
      Api.putNotificationAsRead(null, null, notification)
    }
  },
  computed: {
    ...mapState(useUserStore, ['name', 'notifications', 'profile', 'profileUrl']),
    unreadNotifications () {
      return this.notifications.filter(x => x.hasRead === 0)
    },
    hasUnread () {
      return this.notifications.filter(x => x.hasRead === 0).length > 0
    },
    unreadCount () {
      const count = this.notifications.filter(x => x.hasRead === 0).length
      if (count > 9) return '9+'
      const unreadCount = count === 0 ? '' : count
      return unreadCount
    },
    widthPixels () {
      return this.width + 'px'
    },
    dimensions () {
      return `width: ${this.width}px; height: ${this.width}px;`
    },
    url () {
      if (this.forceProfileUrl) return this.forceProfileUrl
      if (this.forceName || this.forceProfileImg) return ''
      let url = this.forceUrl ? this.forceUrl : this.profileUrl
      url = this.blank ? '' : url
      return url
    },
    initials () {
      if (this.blank) return ''
      const str = this.forceName ? this.forceName : this.name
      // https://stackoverflow.com/questions/8279859/get-first-letter-of-each-word-in-a-string-in-javascript
      const initials = str.split(' ').map(i => i.charAt(0)) // Uppercase each letter
      return initials.length === 1 ? initials[0].toUpperCase() : initials[0].toUpperCase() + initials[1].toUpperCase()
    },
    forceProfileImgPath () {
      if (this.blank) return './assets/default.png'
      return this.forceProfileImg
    }
  },
  watch: {
  },
  components: {
    Notifications
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.ti-crown
{
  right: -10px;
  top: -10px;
  position: absolute
}

.ti-notifications-badge
{ right: -5px;
  top: -5px;
  position: absolute
}

.ti-profile-container
{
  background: none!important;
  overflow: visible;
  box-shadow: 0px 3px 6px #00000029;
  position: relative;
  padding: 0px!important
}

.ti-profile-pic
{
  /* top: 0px */
  /* left: 0px */
  overflow: visible!important;
}
</style>
