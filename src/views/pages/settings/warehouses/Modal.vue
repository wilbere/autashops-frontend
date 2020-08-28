<template lang="html">
  <div class="centerx">
    <vs-popup  classContent="popup-example"  :title="titleModal" :active.sync="isModalActiveLocal">

      <div class="vx-row mb-5">
        <div class="vx-col w-full">
          <v-select
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="attendant"
            v-model="attendant"
            :options="attendants"  />
        </div>
      </div>
      <div class="vx-row mb-5">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="name"
            class="w-full"
            label-placeholder="Name"
            v-model="warehouse.name" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('name') }}</span>

        </div>
      </div>
      <div class="vx-row mb-3">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required|email'"
            data-vv-validate-on="blur"
            data-vv-name="email"
            class="w-full"
            type="email"
            label-placeholder="Email"
            v-model="warehouse.email" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('email') }}</span>

        </div>
      </div>
      <div class="vx-row mb-3">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required|numeric|min:3'"
            data-vv-validate-on="blur"
            data-vv-name="phone"
            class="w-full"
            label-placeholder="Phone"
            v-model="warehouse.phone" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('phone') }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="address"
            class="w-full"
            label-placeholder="Address"
            v-model="warehouse.address" />
            <span class="text-danger w-full ml-3  text-sm">{{ errors.first('address') }}</span>

        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button class="ml-3 mb-2"  :disabled="!validateForm" @click="submitData">Submit</vs-button>
        </div>
      </div>


    </vs-popup>
  </div>
</template>

<script>
import axios from '../../../../axios.js'
import vSelect from 'vue-select'

export default {
  components : {
    vSelect
  },
  props: {
    warehouse:{},
    isModalActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    validateForm () {
      return  this.errors.any() !== null && this.warehouse.name !== '' && this.warehouse.phone !== '' && this.warehouse.email !== '' && this.warehouse.address !== ''
    },
    titleModal(){
      return this.warehouse.id ? 'Edit warehouse' : 'New warehouse'
    },
    isModalActiveLocal: {
      get () {
        return this.isModalActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeModal')
          this.$validator.reset()
          this.initValues()
        }
      }
    },
  },
  data(){
    return {
      name: '',
      phone: '',
      emal: '',
      address: '',
      attendants : [],
      attendant : {
        label : '',
        value : '',
      },
    }
  },
  created() {
    this.getUsers()
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.$validator.reset()
      } else {
        this.id = this.warehouse.id
        this.name = this.warehouse.name
        this.phone = this.warehouse.phone
        this.email = this.warehouse.email
        this.address = this.warehouse.address
      }
    }
  },
  methods: {
    initValues () {
      if (this.warehouse.id) return
      this.id = null
      this.name = ''
      this.phone = ''
      this.email = ''
      this.address = ''
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const data = {
            id: this.warehouse.id,
            name: this.warehouse.name,
            phone: this.warehouse.phone,
            email: this.warehouse.email,
            address: this.warehouse.address,
            attendant: this.attendant.value,
          }
          if (this.warehouse.id !== null && this.warehouse.id >= 0) {
            this.updateWarehouse(data)
          } else {
            this.createWarehouse(data)
          }


        }
      })
    },
    createWarehouse(data){
      axios.post('/warehouses/', data)
        .then(res => {
          if (res.data.res) {
            this.$vs.notify({
              title: 'Created Success',
              text: 'You are successfully created!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.$emit('success')
            this.$emit('closeModal')
            this.initValues()
          } else {
            this.$vs.notify({
              title: 'Error',
              text: res.data.error,
              iconPack: 'feather',
              icon: 'icon-alert',
              color: 'danger'
            })
          }
        })
    },
    updateWarehouse(data) {
      axios.put('/warehouses/'+this.warehouse.id, data)
        .then(res => {
          if (res.data.res === true) {
            this.$vs.notify({
              title: 'Update Success',
              text: 'You are successfully updated!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.isModalActive = false
            this.$emit('success')
            this.$emit('closeModal')
            this.initValues()
          } else {
            this.$vs.notify({
              title: 'Error',
              text: res.data.error,
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'danger'
            })
          }
        })
    },
    getUsers() {
      axios.get('/warehouses/attendants')
        .then(res => {
          this.attendants = res.data.attendants
        })
    }
  }
}
</script>

<style lang="stylus">
.popup-example
  .vs-input
    float left
    width 50%
    margin 10px
    margin-top 5px
  .con-select
    margin-left 10px
    width 100%
    margin-bottom 10px
</style>
