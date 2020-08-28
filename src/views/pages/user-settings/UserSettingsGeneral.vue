<template>
  <vx-card no-shadow>

    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="user.image.url" size="70px" class="mr-4 mb-4" />
      <div>
        <vs-button class="mr-4 sm:mb-0 mb-2">Upload photo</vs-button>
        <vs-button type="border" color="danger">Remove</vs-button>
        <p class="text-sm mt-2">Allowed JPG, GIF or PNG. Max size of 800kB</p>
      </div>
    </div>

    <!-- Info -->
    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="username"
      class="w-full mb-2 "
      label-placeholder="Username"
      v-model="username">
    </vs-input>
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('username') }}</span>

    <vs-input
      v-validate="'required|alpha_spaces'"
      data-vv-validate-on="blur"
      data-vv-name="name"
      class="w-full mb-2  mt-6"
      label-placeholder="Name"
      v-model="name">
    </vs-input>
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('name') }}</span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      data-vv-name="email"
      class="w-full mt-6"
      label-placeholder="Email"
      v-model="email">
    </vs-input>
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('email') }}</span>

    <!-- <vs-alert icon-pack="feather" icon="icon-info" class="h-full my-4" color="warning">
      <span>Your account is not verified. <a href="#" class="hover:underline">Resend Confirmation</a></span>
    </vs-alert> -->

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2" :disabled="!validateForm" @click="submitData">Save Changes</vs-button>
      <!-- <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button> -->
    </div>
  </vx-card>
</template>

<script>
import axios from '@/axios.js'

export default {
  data () {
    return {
      username : '',
      email : '',
      name: '',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.currentUser
    },
    validateForm () {
      return  this.errors.any() !== null && this.user.name !== '' && this.user.email !== '' && this.user.username !== ''
    },
  },
  created () {
    if (this.user) {
      console.log(this.user)
      this.name = this.user.name
      this.username = this.user.username
      this.email = this.user.email
    }
  },
  methods: {
    submitData () {

      const user = {
        username : this.username,
        name : this.name,
        email : this.email,
      }

      axios.put('/users/'+this.user.id, user)
        .then(res => {
          if (res.data.res == true) {

            this.$vs.notify({
              title: 'Updated Success',
              text: 'You are successfully created!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.$emit('success')
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
