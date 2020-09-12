<template>
  <vx-card no-shadow>

    <form enctype="multipart/form-data">

    <!-- Img Row -->
    <div class="flex flex-wrap items-center mb-base">
      <vs-avatar :src="thumbnail ? thumbnail : user.image.url" size="70px" class="mr-4 mb-4" />
      <div>
        <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">
        <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.updateImgInput.click()">Subir Foto</vs-button>
        <vs-button type="border" color="danger">Remover</vs-button>
      </div>
    </div>

    <!-- Info -->
    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="username"
      class="w-full mb-2 "
      label-placeholder="Nombre de usuario"
      v-model="username">
    </vs-input>
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('username') }}</span>

    <vs-input
      v-validate="'required|alpha_spaces'"
      data-vv-validate-on="blur"
      data-vv-name="name"
      class="w-full mb-2  mt-6"
      label-placeholder="Nombre(s) y Apellido(s)"
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
      <vs-button class="ml-auto mt-2" :disabled="!validateForm" @click="submitData">Guardar</vs-button>
      <!-- <vs-button class="ml-4 mt-2" type="border" color="warning">Reset</vs-button> -->
    </div>
    </form>

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
      img_min: '',
      image: null
    }
  },
  watch: {
    thumbnail() {
      return this.img_min
    },
  },
  computed: {
    thumbnail() {
      return this.img_min
    },
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
    getImage (e) {
        let file = e.target.files[0]
        this.image = file
        this.uploadImage(file)
    },
    uploadImage(file){
      let reader = new FileReader()

      reader.onload = (e) => {
        this.img_min = e.target.result
      }

      reader.readAsDataURL(file)

    },
    submitData () {

      let data = new FormData()

      data.append('username', this.username)
      data.append('name', this.name)
      data.append('email', this.email)
      data.append('image', this.image)
      data.append('image_id', this.user.image.id)
       

      axios.post('/users/'+this.user.id+'?_method=PUT', data)
        .then(res => {
          if (res.data.res == true) {

            this.$vs.notify({
              title: 'Aprobado',
              text: 'Datos actualizados exitosamente!',
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
