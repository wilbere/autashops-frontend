<template>
  <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="null" finishButtonText="Submit">
    <tab-content title="Datos del producto" class="mb-5" icon="feather icon-user-plus" :before-change="validateStep1">
      <!-- tab 1 content -->
      <form enctype="multipart/form-data" data-vv-scope="step-1">

        <div class="vx-row">
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input label="Nombre del producto" v-model="name" class="w-full" name="name" v-validate="'required'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input label="Email" type="email" v-model="email" class="w-full" name="email" v-validate="'required|email'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <!-- ADDONS APPEND -->
            <vx-input-group class="w-full vx-col mt-5">
              <template slot="append">
                <div class="append-text bg-primary">
                  <span class="cursor-pointer">$</span>
                </div>
              </template>

              <vs-input  label="Código de producto"  v-model="barcode" class="w-full" name="barcode" v-validate="'required'" />
            </vx-input-group>
            <!-- /ADDONS APPEND -->
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  label="Teléfono"  v-model="phone" class="w-full" name="phone" v-validate="'required|numeric'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  label="Rif"  v-model="rif" class="w-full" name="rif" v-validate="'required'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col  w-full mt-5">
            <vs-checkbox v-model="is_supplier">Este  también es nuestro proveedor</vs-checkbox>
          </div>
        </div>
      </form>
    </tab-content>

    <!-- tab 2 content -->
    <tab-content title="Datos de la empresa" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep2">
      <form data-vv-scope="step-2" enctype="multipart/form-data">
        <!-- Img Row -->
        <div class="vx-row">
          <div class="vx-col md:w-1/3 w-full mt-5">
            <div class="flex flex-wrap w-full items-center mb-base">
              <vs-avatar :src="thumbnail ? thumbnail : company != null && company.image_company != null  ? company.image_company.url : ''" size="70px" class="mr-4 " />
              <div>
                <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">

                <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.updateImgInput.click()">Subir foto</vs-button>
                <vs-button type="border" color="danger"  @click="image ? image = null : img_min = null">Remover</vs-button>
                <p class="text-sm mt-2">Formatos permitidos: JPG or PNG.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="vx-row">
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input label="Nombre" v-model="name_company" class="w-full" name="name" v-validate="'required|alpha_spaces'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input label="Email" type="email" v-model="email_company" class="w-full" name="email" v-validate="'required|email'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  label="Teléfono"  v-model="phone_company " class="w-full" name="phone" v-validate="'required|numeric'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  label="Rif"  v-model="rif_company" class="w-full" name="rif" v-validate="'required'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  label="País"  v-model="country " class="w-full" name="rif" v-validate="'required'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  label="Ciudad"  v-model="city" class="w-full" name="rif" v-validate="'required'" />
            <span class="text-danger"></span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  label="Dirección"  v-model="address_company" class="w-full" name="rif" v-validate="'required'" />
            <span class="text-danger"></span>
          </div>
        </div>
      </form>
    </tab-content>
  </form-wizard>
</template>

<script>
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
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      city: "new-york",
      proposalTitle: "",
      jobTitle: "",
      textarea: "",
      eventName: "",
      eventLocation: "san-francisco",
      status: "plannning",
      cityOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" },
      ],
      statusOptions: [
        { text: "Plannning", value: "plannning" },
        { text: "In Progress", value: "in progress" },
        { text: "Finished", value: "finished" },
      ],
      LocationOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" },
      ],
    }
  },
  methods: {
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
  },
  components: {
    FormWizard,
    TabContent
  }
}
</script>

<style lang="stylus" scoped>
.cursor-pointer
  cursor pointer
</style>
