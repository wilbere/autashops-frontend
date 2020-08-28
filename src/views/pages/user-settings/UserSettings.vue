<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'General' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <user-settings-general @success="updateData" />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? 'Change Password' : ''">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <user-settings-change-password @success="updateData" />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-briefcase" :label="!isSmallerScreen ? 'Company' : ''">
      <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
        <user-settings-company @success="updateData" />
      </div>
    </vs-tab>

  </vs-tabs>
</template>

<script>
import UserSettingsGeneral from './UserSettingsGeneral.vue'
import UserSettingsChangePassword from './UserSettingsChangePassword.vue'
import UserSettingsCompany from './UserSettingsCompany.vue'
import * as Cookie from 'js-cookie'
import axios from '@/axios'

export default {
  components: {
    UserSettingsGeneral,
    UserSettingsChangePassword,
    UserSettingsCompany,
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    },
    user () {
      return this.$store.state.auth.currentUser
    }
  },
  methods: {
    updateData () {
      console.log(this.user)
      console.log('ejecutando updateData()')
      axios.get('/users/' + this.user.id)
        .then(res => {
          console.log('response ', res.data.user)
          Cookie.remove('userInfo')
          Cookie.set('userInfo', res.data.user)
          console.log('Cookie '+Cookie.get('userInfo'))
          location.reload()
        })
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
