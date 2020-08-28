<template>
  <vx-card no-shadow>

    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="old_password"
      class="w-full mb-2"
      type="password"
      label-placeholder="Old Password"
      v-model="old_password" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('old_password') }}</span>

    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="password"
      class="w-full mb-2  mt-6"
      type="password"
      label-placeholder="New Password"
      v-model="password" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('password') }}</span>

    <vs-input
      v-validate="'required|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-name="confirm_password"
      class="w-full mb-2  mt-6"
      type="password"
      label-placeholder="Confirm Password"
      v-model="confirm_password" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('confirm_password') }}</span>


    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" :disabled="!validateForm" @click="changePassword">Save Changes</vs-button>
      <!-- <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button> -->
    </div>
  </vx-card>
</template>

<script>
import axios from '@/axios.js'

export default {
  data () {
    return {
      old_password: '',
      password: '',
      confirm_password: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.currentUser
    },
    validateForm () {
      return  this.errors.any() !== null && this.user.name !== '' && this.user.email !== '' && this.user.username !== ''
    },
  },
  methods: {
    changePassword () {

      const password = {
        old_password: this.old_password,
        password: this.password,
        confirm_password: this.confirm_password
      }

      axios.put('/users/change-password/'+this.user.id, password)
        .then(res => {
          if(res.data.res == true){
            this.$vs.notify({
              title: 'Updated Success',
              text: 'You password updated!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
          } else {
            this.$vs.notify({
              title: 'Error',
              text: res.data.error,
              iconPack: 'feather',
              icon: 'icon-info',
              color: 'danger'
            })
          }
        })

    }
  }
}
</script>
