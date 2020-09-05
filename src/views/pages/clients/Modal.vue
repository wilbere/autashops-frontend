<template lang="html">
  <div class="centerx">
    <vs-popup   :title="titleModal" :active.sync="isModalActiveLocal">
      <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="'Rellena todos los campos del formulario'" finishButtonText="Enviar">
        <tab-content title="Datos del cliente" class="mb-5" icon="feather icon-user-plus" :before-change="validateStep1">

          <!-- tab 1 content -->
          <form enctype="multipart/form-data" data-vv-scope="step-1">

            <!-- Img Row -->
            <div class="vx-row">
              <div class="vx-col md:w-2/2 w-full mt-5">
                <div class="flex flex-wrap w-full items-center mb-base">
                  <vs-avatar :src="thumbnail ? thumbnail : client.image != null ? client.image.url : null" size="70px" class="mr-4 " />
                  <div>
                    <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">

                    <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.updateImgInput.click()">Subir foto</vs-button>
                    <vs-button type="border" color="danger"  @click="client.image ? client.image = null : img_min = null">Remover</vs-button>
                    <p class="text-sm mt-2">Formatos permitidos: JPG or PNG.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Nombre" v-model="client.name" class="w-full" name="name" v-validate="'required|alpha_spaces'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Email" type="email" v-model="client.email" class="w-full" name="email" v-validate="'required|email'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Teléfono"  v-model="client.phone" class="w-full" name="phone" v-validate="'required|numeric'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Rif"  v-model="client.rif" class="w-full" name="rif" v-validate="'required'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col  w-full mt-5">
                <vs-checkbox v-model="is_supplier">Este cliente también es nuestro proveedor</vs-checkbox>
              </div>
            </div>
          </form>
        </tab-content>

        <!-- tab 2 content -->
        <tab-content title="Datos de la empresa" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep2">
          <form data-vv-scope="step-2" enctype="multipart/form-data">
            <!-- Img Row -->
            <div class="vx-row">
              <div class="vx-col md:w-2/2 w-full mt-5">
                <div class="flex flex-wrap w-full items-center mb-base">
                  <vs-avatar :src="thumbnail ? thumbnail : client.company != null && client.company.image_company != null  ? client.company.image_company.url : ''" size="70px" class="mr-4 " />
                  <div>
                    <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">

                    <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.updateImgInput.click()">Subir foto</vs-button>
                    <vs-button type="border" color="danger"  @click="client.image ? client.image = null : img_min = null">Remover</vs-button>
                    <p class="text-sm mt-2">Formatos permitidos: JPG or PNG.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Nombre" v-model="name_company" class="w-full" name="name" v-validate="'required|alpha_spaces'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Email" type="email" v-model="email_company" class="w-full" name="email" v-validate="'required|email'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Teléfono"  v-model="phone_company " class="w-full" name="phone" v-validate="'required|numeric'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Rif"  v-model="rif_company" class="w-full" name="rif" v-validate="'required'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="País"  v-model="country " class="w-full" name="rif" v-validate="'required'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Ciudad"  v-model="city" class="w-full" name="rif" v-validate="'required'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Dirección"  v-model="address_company" class="w-full" name="rif" v-validate="'required'" />
                <span class="text-danger"></span>
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

export default {
  components : {
    vSelect,
    FormWizard,
    TabContent
  },
  props: {
    client:{},
    isModalActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    thumbnail() {
      return this.img_min
    },
    // validateForm () {
      // return  this.errors.any() !== null && this.warehouse.name !== '' && this.warehouse.phone !== '' && this.warehouse.email !== '' && this.warehouse.address !== ''
    // },
    titleModal(){
      return this.client.id ? 'Editar Cliente' : 'Nuevo Cliente'
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
      phone: "",
      email: "",
      rif : "",
      image: null,
      img_min: '',
      name_company: '',
      phone_company: "",
      email_company: "",
      rif_company : "",
      city: '',
      country: '',
      address_company: '',
      id_nuevo: '',
      is_supplier: false
    }
  },
  watch: {
    thumbnail() {
      return this.img_min
    },
    isModalActive (val) {
      if (!val) return
      if (Object.entries(this.client).length === 0) {
        this.$validator.reset()
      } else {
        this.id = this.client.id
        this.name = this.client.name
        this.phone = this.client.phone
        this.email = this.client.email
        this.rif = this.client.rif
        this.name_company = this.client.company ? this.client.company.name_company : ''
        this.phone_company = this.client.company ? this.client.company.phone_company : ''
        this.email_company = this.client.company ? this.client.company.email_company : ''
        this.rif_company = this.client.company ? this.client.company.rif : ''
        this.city = this.client.company ? this.client.company.city : ''
        this.country = this.client.company ? this.client.company.country : ''
        this.address_company = this.client.company ? this.client.company.address_company : ''
      }
    }
  },
  methods: {
    initValues () {
      if (this.client.id) return
      this.name = ''
      this.phone = ""
      this.email = ""
      this.rif  = ""
      this.image = null
      this.img_min = ''
      this.name_company = ''
      this.phone_company = ""
      this.email_company = ""
      this.rif_company  = ""
      this.city = ''
      this.country = ''
      this.address_company = ''
      this.id_nuevo = ''
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
          if (this.client.id !== null && this.client.id >= 0) {
            this.updateClient(data)
          } else {
            this.createClient(data)
          }


        }
      })
    },
    createClient(data){
      axios.post('/clients/', data)
        .then(res => {
          if (res.data.res) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Cliente creado con éxito!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.id_nuevo = res.data.client.id
            // this.$emit('success')
            // this.$emit('closeModal')
            // this.initValues()
          } else {
            this.$vs.notify({
              title: 'Ha ocurrido un error',
              text: res.data.error,
              iconPack: 'feather',
              icon: 'icon-alert',
              color: 'danger'
            })
          }
        })
    },
    updateClient(data) {
      axios.post('/clients/'+this.client.id+'?_method=PUT', data)
        .then(res => {
          if (res.data.res === true) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Cliente actualizado con éxito!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            // this.isModalActive = false
            // this.$emit('success')
            // this.$emit('closeModal')
            // this.initValues()
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
    createClientAccount(data){
      axios.post('/account/', data)
        .then(res => {
          if (res.data.res) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Cliente creado con éxito!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.$emit('success')
            this.$emit('closeModal')
            this.initValues()
          } else {
            this.$vs.notify({
              title: 'Ha ocurrido un error',
              text: res.data.error,
              iconPack: 'feather',
              icon: 'icon-alert',
              color: 'danger'
            })
          }
        })
    },
    updateClientAccount(data) {
      axios.post('/account/'+this.client.company.id_company+'?_method=PUT', data)
        .then(res => {
          if (res.data.res === true) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Cliente actualizado con éxito!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            // this.isModalActive = false
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
            let client =  new FormData()

            client.append('image', this.image)
            client.append('name', this.client.name)
            client.append('phone', this.client.phone)
            client.append('rif', this.client.rif)
            client.append('email', this.client.email)
            client.append('is_supplier', this.is_supplier ? 1 : 0)

            //   name: this.name,
            //   phone: this.phone,
            //   email: this.email,
            //   rif: this.rif
            // }

            if(this.client.id) {
              this.updateClient(client)
            } else {
              this.createClient(client)
            }

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
            let client =  new FormData()

            client.append('image', this.image)
            client.append('name', this.name_company)
            client.append('phone', this.phone_company)
            client.append('rif', this.rif_company)
            client.append('email', this.email_company)
            client.append('country', this.country)
            client.append('city', this.city)
            client.append('address', this.address_company)
            client.append('id', this.client.id ? this.client.id : this.id_nuevo)
            client.append('model', 'client')

            //   name: this.name,
            //   phone: this.phone,
            //   email: this.email,
            //   rif: this.rif
            // }

            if(this.client.id && this.client.company) {
              this.updateClientAccount(client)
            } else {
              this.createClientAccount(client)
            }

            resolve(true)
          } else {
            reject("correct all values");
          }
        })
      })
    },
    // Imagenes
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

    }
  }
}
</script>

<style lang="stylus" scoped>
.con-vs-popup
  .vs-popup
    width 70%

</style>
