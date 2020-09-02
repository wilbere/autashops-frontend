<template lang="html">
  <div class="centerx">
    <vs-popup   :title="titleModal" :active.sync="isModalActiveLocal">
      <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="'Fill out the form'" finishButtonText="Submit">
        <tab-content title="Step 1" class="mb-5" icon="feather icon-home" :before-change="validateStep1">

          <!-- tab 1 content -->
          <form data-vv-scope="step-1">
            <div class="vx-row">
              <div class="vx-col md:w-1/3 w-full mt-5">
                <vs-select v-model="city" class="w-full select-large" label="City">
                  <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
                </vs-select>
              </div>
              <div class="vx-col md:w-1/3 w-full mt-5">
                <vs-input label="First Name" v-model="name" class="w-full" name="first_name" v-validate="'required|alpha'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/3 w-full mt-5">
                <vs-input label="Last Name"  v-model="lastName" class="w-full" name="last_name" v-validate="'required|alpha'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/3 w-full mt-5">
                <vs-input type="email" label="Email"  v-model="email" class="w-full" name="email" v-validate="'required|email'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/3 w-full mt-5">
                <vs-select v-model="city" class="w-full select-large" label="City">
                  <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
                </vs-select>
              </div>
            </div>
          </form>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content title="Step 2" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep2">
          <form data-vv-scope="step-2">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <vs-input label="Proposal Title" v-model="proposalTitle" class="w-full mt-4" name="proposal_title" v-validate="'required|alpha_spaces'" />
                <span class="text-danger">Proposal title name is required</span>

                <vs-input label="Job Title"  v-model="jobTitle" class="w-full mt-4" name="job_title" v-validate="'required|alpha_spaces'" />
                <span class="text-danger">Job title name is required</span>
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <vs-textarea v-model="textarea" label="Short discription" class="md:mt-10 mt-6 mb-0" rows="3" />
              </div>
            </div>
          </form>
        </tab-content>

        <!-- tab 3 content -->
        <tab-content title="Step 3" class="mb-5" icon="feather icon-image" :before-change="validateStep3">
          <form data-vv-scope="step-3">
            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full">
                <vs-input label="Event Name" v-model="eventName" class="w-full mt-5" name="event_name" v-validate="'required|alpha_spaces'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full">
                <vs-select v-model="city" class="w-full select-large mt-5" label="Event Location">
                  <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
                </vs-select>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-select v-model="status" class="w-full select-large" label="Event Status">
                  <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in statusOptions" class="w-full" />
                </vs-select>
              </div>
              <div class="vx-col md:w-1/2 w-full md:mt-8">
                <div class="demo-alignment">
                  <span>Requirements:</span>
                  <div class="flex">
                    <vs-checkbox>Staffing</vs-checkbox>
                    <vs-checkbox>Catering</vs-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </tab-content>
      </form-wizard>



    </vs-popup>
  </div>
</template>

<script>
import axios from '@/axios.js'
import vSelect from 'vue-select'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

// For custom error message
import { Validator } from 'vee-validate';
const dict = {
  custom: {
    first_name: {
      required: 'First name is required',
      alpha: "First name may only contain alphabetic characters"
    },
    last_name: {
      required: 'Last name is required',
      alpha: "Last name may only contain alphabetic characters"
    },
    email: {
      required: 'Email is required',
      email: "Please enter valid email"
    },
    job_title: {
      required: 'Job title name is required',
      alpha: "Job title may only contain alphabetic characters"
    },
    proposal_title: {
      required: 'Proposal title name is required',
      alpha: "Proposal title may only contain alphabetic characters"
    },
    event_name: {
      required: 'Event name is required',
      alpha: "Event name may only contain alphabetic characters"
    },
  }
};

// register custom messages
Validator.localize('en', dict);

export default {
  components : {
    vSelect,
    FormWizard,
    TabContent
  },
  props: {
    product:{},
    isModalActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    // validateForm () {
      // return  this.errors.any() !== null && this.warehouse.name !== '' && this.warehouse.phone !== '' && this.warehouse.email !== '' && this.warehouse.address !== ''
    // },
    titleModal(){
      return this.product.id ? 'Edit product' : 'New product'
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
      cost: "",
      price: "",
      barcode: "",
      description: "",
      alert_qty: "",
      units: [],
      categories: [],
      taxes: [],
      brands: []
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
        // this.id = this.product.id
        // this.name = this.product.name
        // this.phone = this.product.phone
        // this.email = this.product.email
        // this.address = this.product.address
      }
    }
  },
  methods: {
    initValues () {
      if (this.product.id) return
      // this.id = null
      // this.name = ''
      // this.phone = ''
      // this.email = ''
      // this.address = ''
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const data = {
            // id: this.warehouse.id,
            // name: this.warehouse.name,
            // phone: this.warehouse.phone,
            // email: this.warehouse.email,
            // address: this.warehouse.address,
            // attendant: this.attendant.value,
          }
          if (this.product.id !== null && this.product.id >= 0) {
            this.updateProduct(data)
          } else {
            this.createProduct(data)
          }


        }
      })
    },
    createProduct(data){
      axios.post('/products/', data)
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
    updateProduct(data) {
      axios.put('/products/'+this.product.id, data)
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
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          if (result) {
            resolve(true)
          } else {
            reject("correct all values");
          }
        })
      })
    },
    validateStep2() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-2").then(result => {
          if (result) {
            resolve(true)
          } else {
            reject("correct all values");
          }
        })
      })
    },
    validateStep3() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-3").then(result => {
          if (result) {
            alert("Form submitted!");
            resolve(true)
          } else {
            reject("correct all values");
          }
        })
      })
    }
    // getUsers() {
    //   axios.get('/products/attendants')
    //     .then(res => {
    //       this.attendants = res.data.attendants
    //     })
    // }
  }
}
</script>

<style lang="stylus" scoped>
.con-vs-popup
  .vs-popup
    width 70%
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
