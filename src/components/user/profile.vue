<template>
  <!-- menuOpen = false; notificationsOpen = false -->
    <q-avatar
      size='xl'
      :color="$q.platform.is.desktop ? 'accent' : 'primary'"
      :text-color="$q.platform.is.desktop ? 'white' : 'white'"
      class="on-right">
      <span class="desktop-only"><q-icon name='menu'/></span>
      <q-icon class="mobile-only" name="menu"></q-icon>
      <q-menu
            v-if='hasMenu && !notificationsOpen'
            class='no-padding no-margin column'
            transition-show="scale"
            transition-hide="scale"
            v-model='menuOpen'
            fit
            anchor='bottom middle'
            >
            <q-list style="min-width: 265px; min-height:244px" class='q-py-none q-px-none x-text-heavy x-text-md' v-if='!notificationsOpen'>
              <q-item class="q-pt-md">
                <q-item-section avatar>
                  <q-avatar size='60px' color="accent" text-color="white" class="">{{initials}}</q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{name}}</q-item-label>
                  <q-item-label caption lines="2">{{email}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced/>
              <!-- <q-item class='q-px-xs hidden' clickable @click.stop='notificationsOpen=true; menuOpen = true'>
                <q-item-section>Notifications</q-item-section>
                <q-item-section side>
                  <q-badge v-if='unreadCount > 0 && !noBadge' class='z-max' round color="accent">{{unreadCount}}</q-badge>
                </q-item-section>
              </q-item> -->
              <q-item class='q-px-md' clickable @click.stop='menuOpen = false; $router.push({path: "/"})'>
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item v-if='isProvider' @click='$router.push({path: "/dashboard"})' class='q-px-md hidden' clickable>
                <q-item-section>Dashboard</q-item-section>
              </q-item>
              <q-item class='q-px-md' clickable @click.stop='menuOpen = false; $router.push({path: "/public"})'>
                <q-item-section>Courses</q-item-section>
              </q-item>
              <q-item class='q-px-md' clickable @click='$router.push({path: "/providers"})'>
                <q-item-section>Providers</q-item-section>
              </q-item>
              <q-item class='q-px-md' clickable @click='$router.push({path: "/bookmarks"})'>
                <q-item-section>Bookmarks</q-item-section>
              </q-item>
              <q-item @click='goBug(); menuOpen=false' class='q-px-md hidden' clickable>
                <q-item-section>Report a Bug</q-item-section>
              </q-item>
              <q-item @click='goAdmin(); menuOpen=false' class='q-px-md' clickable style="font-color:red">
                <q-item-section>Admin</q-item-section>
              </q-item>
              <q-separator/>
              <q-item @click='menuOpen = false; logoutUser()' class='q-px-md x-background-hint' clickable style="border-top:1px solid rgb(239, 239, 239)">
                <q-item-section>Log Out</q-item-section>
              </q-item>
              <!-- <q-item class="q-pt-md" style='max-height:20px'>{{geoCountry}}</q-item>
              <q-item class="q-py-none" style='max-height:20px'>{{geoIp}}</q-item>
              <q-item class="q-py-none" style='max-height:20px'>{{geoContinent}}</q-item> -->
            </q-list>
      </q-menu>
      <q-dialog v-if='isMobile' v-model='notificationsOpen' maximized>
        <notifications @close='menuOpen = false; notificationsOpen = false'></notifications>
      </q-dialog>
      <q-menu
        v-if='hasMenu && notificationsOpen && !isMobile'
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
        <q-dialog v-model="showBug">
          <q-card style="width: 700px; max-width: 80vw;" class='bg-white ada-bug-card'>
            <q-card-section>
              <div class="text-h6">Report Bug / Suggest Feature</div>
            </q-card-section>

            <q-card-section>
              <q-input filled label='Subject' v-model='subject'/>
              <q-input
                class='q-mt-md'
                v-model="message"
                filled
                type="textarea"
                label='Message'
              />
            </q-card-section>
            <q-card-section>
              <p>{{$route.path}}</p>
            </q-card-section>
            <q-card-actions align="right" class="text-font row">
              <q-btn label="Forget it" v-close-popup outline color='font' class='col-3'/>
              <q-btn label="Send" v-close-popup flat color='white' @click='sendBug' class='col bg-accent text-bold'/>
            </q-card-actions>
          </q-card>
        </q-dialog>
    </q-avatar>
</template>

<script>
import { useUserStore } from 'stores/user'
import { mapState, mapActions } from 'pinia'
import Api from 'src/api/user/profileApi.js'
import Notifications from './notifications.vue'
import { _axios } from 'boot/axios'

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
    },
    noBadge: {
      type: Boolean,
      default: false
    },
    isProvider: {
      type: Boolean
    }
  },
  data () {
    return {
      notificationsOpen: false,
      menuOpen: false,
      showBug: false
    }
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    goAdmin () {
      this.$router.push('/admin')
    },
    goProfilePage () {
      this.$router.push({ path: '/profile/' })
    },
    markAsRead (notification) {
      notification.hasRead = 1
      if (this.unreadNotifications.length === 0) this.notificationsOpen = false
      Api.putNotificationAsRead(null, null, notification)
    },
    logoutUser () {
      this.logout()
      this.$router.replace('/')
    },
    goBug () {
      this.showBug = true
    },
    sendBug () {
      const data = {
        path: this.$route.path,
        subject: this.subject,
        message: this.message
      }
      _axios.post('/auth/bug', data)
        .then(response => {
          this.message = ''
          this.subject = ''
        })
        .catch(error => {
          console.warn(error)
        })
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLoggedIn', 'name', 'email', 'notifications', 'profile', 'profileUrl', 'geoCountry', 'geoContinent', 'geoIp']),
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
      if (!this.name) return ''
      return this.name[0].toUpperCase()
      // return initials.length === 1 ? initials[0].toUpperCase() : initials[0].toUpperCase() + initials[1].toUpperCase()
    },
    forceProfileImgPath () {
      if (this.blank) return './assets/default.png'
      return this.forceProfileImg
    },
    isMobile () {
      return this.$q.platform.is.mobile
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

<style lang="scss">

.mobile .q-avatar__content {
  border: 0px solid white
}

.x-crown
{
  right: -10px;
  top: -10px;
  position: absolute
}

.x-notifications-badge
{
  right: -5px;
  top: -5px;
  position: absolute
}

.x-profile-container
{
  background: none!important;
  overflow: visible;
  box-shadowx: 0px 3px 6px #00000029;
  position: relative;
  padding: 0px!important;
}

.x-profile-pic
{
  overflow: visible!important;
}
</style>
