<template lang="html">
  <div class="centerx">
    <vs-popup  classContent="popup-example"  :title="titleModal" :active.sync="isModalActiveLocal">

      <div class="vx-row mb-5">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="name"
            class="w-full"
            label-placeholder="Name"
            v-model="tax.name" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('name') }}</span>

        </div>
      </div>

      <div class="vx-row mb-5">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required|numeric'"
            data-vv-validate-on="blur"
            data-vv-name="rate"
            class="w-full"
            label-placeholder="rate"
            v-model="tax.rate" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('rate') }}</span>

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
    tax:{},
    isModalActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    validateForm () {
      return  this.errors.any() !== null && this.tax.name !== '' && this.tax.rate !== ''
    },
    titleModal(){
      return this.tax.id ? 'Edit tax' : 'New tax'
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
      rate: '',
      value: '',
      def: false,
    }
  },
  created() {
    // this.getUsers()
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.$validator.reset()
      } else {
        this.id = this.tax.id
        this.name = this.tax.name
        this.rate = this.tax.rate
      }
    }
  },
  methods: {
    initValues () {
      if (this.tax.id) return
      this.id = null
      this.name = ''
      this.rate = ''
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const data = {
            id: this.tax.id,
            name: this.tax.name,
            rate: this.tax.rate,
          }
          if (this.tax.id !== null && this.tax.id >= 0) {
            this.updatetax(data)
          } else {
            this.createtax(data)
          }


        }
      })
    },
    createtax(data){
      axios.post('/taxes/', data)
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
    updatetax(data) {
      axios.put('/taxes/'+this.tax.id, data)
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
