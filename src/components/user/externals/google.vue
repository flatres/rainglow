<!-- https://stackoverflow.com/questions/71757310/sign-in-with-google-gis-on-vue-js-application -->
<template>
 <div ref="googleLoginBtn" />
 <div id="g_id_onload"
     data-client_id="803494328504-enqp2ld3lvhvf7pt52k80333kcnr8sod.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="responseHandler"
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="outline"
     data-text="signin"
     data-size="large"
     data-logo_alignment="left">
</div>
</template>
<script>
export default {
  name: 'google-button',
  mounted () {
    const gClientId = '803494328504-enqp2ld3lvhvf7pt52k80333kcnr8sod.apps.googleusercontent.com'
    window.google.accounts.id.initialize({
      client_id: gClientId,
      callback: this.handleCredentialResponse,
      auto_select: true
    })
    window.google.accounts.id.renderButton(
      this.$refs.googleLoginBtn, {
        size: 'large', // or 'small' | 'medium'
        width: '366', // max width 400
        theme: 'outline', // or 'filled_black' |  'filled_blue'
        logo_alignment: 'left' // or 'center'
      }
    )
  },
  methods: {
    handleCredentialResponse (response) {
      console.log(response.credential)
      // Put your backend code in here
    }
  }
}
</script>
function handleCredentialResponse(response) {
          console.log("Encoded JWT ID token: " + response.credential);
        }
        window.onload = function () {
          google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID",
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
          google.accounts.id.prompt(); // also display the One Tap dialog
        }
<style lang="scss">

</style>
