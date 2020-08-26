<template lang="html">
  <div class="centerx">
    <div @click="createWarehouse=true" class="flex items-center">
      <feather-icon icon="UserIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
      <span>Profile</span>
    </div>
    <vs-popup classContent="popup-example"  title="Lorem ipsum dolor sit amet" :active.sync="createWarehouse">
      <div class="vx-row mb-3">
        <div class="vx-col w-full">
          <v-select
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="attendant"
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
            <span class="text-danger w-full text-sm">{{ errors.first('name') }}</span>

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
            <span class="text-danger w-full text-sm">{{ errors.first('email') }}</span>

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
            <span class="text-danger w-full text-sm">{{ errors.first('phone') }}</span>
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
            <span class="text-danger w-full text-sm">{{ errors.first('address') }}</span>

        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button class="mr-3 mb-2" @click="this.updateWarehouse" :disabled="!validateForm">Submit</vs-button>
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
  computed: {
    validateForm () {
      return  this.errors.any() !== null && this.warehouse.name !== '' && this.warehouse.phone !== ''  && this.warehouse.email !== '' && this.warehouse.address !== ''
    },
  },
  data(){
    return {
      createWarehouse:false,
      attendants : [],
      attendant : {},
      warehouse: {}
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    updateWarehouse() {
      this.warehouse.attendant = this.attendant.value
      axios.put('/warehouses/'+this.warehouse.id, this.warehouse)
        .then(res => {
          if (res.data.res === true) {
            this.$vs.notify({
              title: 'Update Success',
              text: 'You are successfully updated!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.createWarehouse = false
            location.reload()
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
    width 50%
    margin-bottom 10px
</style>
