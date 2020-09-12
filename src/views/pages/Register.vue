<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/register.jpg" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Registrate</h4>
                  <p>Rellena los campos y regístrate.</p>
                </div>

                <div>
                  <vs-input
                    v-validate="'required|alpha_spaces|min:3'"
                    data-vv-validate-on="blur"
                    label-placeholder="Nombre"
                    name="name"
                    placeholder="Nombre"
                    v-model="name"
                    class="w-full" />
                  <span class="text-danger text-sm">{{ errors.first('name') }}</span>

                  <vs-input
                    v-validate="'required|alpha_dash|min:3'"
                    data-vv-validate-on="blur"
                    label-placeholder="Usuario"
                    name="username"
                    placeholder="Usuario"
                    v-model="username"
                    class="w-full" />
                  <span class="text-danger text-sm">{{ errors.first('username') }}</span>

                  <vs-input
                    v-validate="'required|email'"
                    data-vv-validate-on="blur"
                    name="email"
                    type="email"
                    label-placeholder="Email"
                    placeholder="Email"
                    v-model="email"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('email') }}</span>

                  <vs-input
                    ref="password"
                    type="password"
                    data-vv-validate-on="blur"
                    v-validate="'required|min:6|max:10'"
                    name="password"
                    label-placeholder="Contraseña"
                    placeholder="Contraseña"
                    v-model="password"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                  <vs-input
                    type="password"
                    v-validate="'min:6|max:10|confirmed:password'"
                    data-vv-validate-on="blur"
                    data-vv-as="password"
                    name="confirm_password"
                    label-placeholder="Confirma la contraseña"
                    placeholder="Confirma la contraseña"
                    v-model="confirm_password"
                    class="w-full mt-6" />
                  <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>

                  <!-- <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">I accept the terms & conditions.</vs-checkbox> -->
                  <vs-button  type="border" to="/admin/login" class="mt-6">Iniciar sesión</vs-button>
                  <vs-button class="float-right mt-6" @click="registerUser" :disabled="!validateForm">Registrate</vs-button>

                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
// import router from '../../router.js'

export default{
  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      isTermsConditionAccepted: true
    }
  },
  computed: {
    validateForm () {
      return  this.errors.any() !== null && this.name !== '' && this.username !== ''  && this.email !== '' && this.password !== '' && this.confirm_password !== ''&& this.confirm_password == this.password && this.isTermsConditionAccepted === true
    },
    ...mapGetters(["currentUser", "errors", "isLogin"]),
    // checkLogin() {
    //   return this.errors
    // }
  },
  created () {
    this.checkLogin()
  },

  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isLogin) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        this.$router.push('/admin/')
        return false
      }
      return true
    },
    registerUser () {

      this.$vs.loading()
      // If form is not validated or user is already login return
      this.$validator.validate()
        .then(() => {
          if (!this.validateForm) return

          const payload = {
            userDetails: {
              name: this.name,
              username: this.username,
              email: this.email,
              password: this.password,
              confirm_password: this.confirm_password
            },
            notify: this.$vs.notify,
            closeAnimation: this.$vs.loading.close
          }

          this.$store.dispatch('auth/registerUser', payload)

        })
    },

  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
  }
}
</style>
