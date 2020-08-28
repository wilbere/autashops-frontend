<template>
  <vx-card no-shadow>

    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="name"
      class="w-full mb-2 "
      label-placeholder="Name"
      v-model="name" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('name') }}</span>

    <vs-input
      v-validate="'required|numeric'"
      data-vv-validate-on="blur"
      data-vv-name="phone"
      class="w-full mb-2 mt-6"
      label-placeholder="Phone"
      v-model="phone" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('phone') }}</span>

    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      data-vv-name="email"
      class="w-full mb-2 mt-6"
      label-placeholder="Email"
      v-model="email" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('email') }}</span>

    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="rif"
      class="w-full mb-2 mt-6"
      label-placeholder="Rif"
      v-model="rif" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('rif') }}</span>

    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="country"
      class="w-full mb-2 mt-6"
      label-placeholder="Country"
      v-model="country" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('country') }}</span>

    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="city"
      class="w-full mb-2 mt-6"
      label-placeholder="City"
      v-model="city" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('city') }}</span>

    <vs-input
      v-validate="'required'"
      data-vv-validate-on="blur"
      data-vv-name="address"
      class="w-full mb-2 mt-6"
      label-placeholder="Address"
      v-model="address" />
    <span class="text-danger w-full mb-3 text-sm">{{ errors.first('address') }}</span>


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
      name: '',
      phone: '',
      email: '',
      rif: '',
      country: '',
      city: '',
      address: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.currentUser
    },
    validateForm () {
      return  this.errors.any() !== null && this.name !== '' && this.email !== '' && this.phone !== '' && this.rif !== '' && this.country !== '' && this.city !== '' && this.address !== ''
    },
  },
  created () {
    if (this.user.company) {
      this.name = this.user.company.name_company
      this.phone = this.user.company.phone_company
      this.email = this.user.company.email_company
      this.address = this.user.company.address_company
      this.city = this.user.company.city
      this.country = this.user.company.country
      this.rif = this.user.company.rif
      console.log(this.user.company)
    }
  },
  methods: {
    submitData () {

      const company = {
        name : this.name,
        email : this.email,
        phone : this.phone,
        rif : this.rif,
        address : this.address,
        city : this.city,
        country : this.phone,
      }

      if (this.user.company) {
        this.updateCompany(company)
      } else {
        this.createCompany(company)
      }


    },
    updateCompany(company) {
      axios.put('/account/'+this.user.company.id_company, company)
        .then(res => {
          if (res.data.res == true) {

            this.$vs.notify({
              title: 'Updated Success',
              text: 'You are successfully updated!',
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
    },
    createCompany(company) {
      axios.post('/account/'+this.user.id, company)
        .then(res => {
          if (res.data.res == true) {

            this.$vs.notify({
              title: 'Updated Success',
              text: 'You are successfully updated!',
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
