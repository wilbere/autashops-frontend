<template lang="html">
  <div class="centerx">
    <vs-popup   :title="titleModal" :active.sync="isModalActiveLocal">
      <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="'Rellena todos los campos del formulario'" finishButtonText="Enviar">
        <tab-content title="Datos del proveedor" class="mb-5" icon="feather icon-user-plus" :before-change="validateStep1">

          <!-- tab 1 content -->
          <form enctype="multipart/form-data" data-vv-scope="step-1">

            <!-- Img Row -->
            <div class="vx-row">
              <div class="vx-col md:w-2/2 w-full mt-5">
                <div class="flex flex-wrap w-full items-center mb-base">
                  <vs-avatar :src="thumbnail ? thumbnail : supplier.image != null ? supplier.image.url : null" size="70px" class="mr-4 " />
                  <div>
                    <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">

                    <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.updateImgInput.click()">Subir foto</vs-button>
                    <vs-button type="border" color="danger"  @click="supplier.image ? supplier.image = null : img_min = null">Remover</vs-button>
                    <p class="text-sm mt-2">Formatos permitidos: JPG or PNG.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Nombre" v-model="supplier.name" class="w-full" name="name" v-validate="'required|alpha_spaces'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input label="Email" type="email" v-model="supplier.email" class="w-full" name="email" v-validate="'required|email'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Teléfono"  v-model="supplier.phone" class="w-full" name="phone" v-validate="'required|numeric'" />
                <span class="text-danger"></span>
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                <vs-input  label="Rif"  v-model="supplier.rif" class="w-full" name="rif" v-validate="'required'" />
                <span class="text-danger"></span>
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
                  <vs-avatar :src="thumbnail ? thumbnail : supplier.company != null && supplier.company.image_company != null  ? supplier.company.image_company.url : ''" size="70px" class="mr-4 " />
                  <div>
                    <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">

                    <vs-button class="mr-4 sm:mb-0 mb-2" @click="$refs.updateImgInput.click()">Subir foto</vs-button>
                    <vs-button type="border" color="danger"  @click="supplier.image ? supplier.image = null : img_min = null">Remover</vs-button>
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
    supplier:{},
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
      return this.supplier.id ? 'Editar Proveedor' : 'Nuevo Proveedor'
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
    }
  },
  watch: {
    thumbnail() {
      return this.img_min
    },
    isModalActive (val) {
      if (!val) return
      if (Object.entries(this.supplier).length === 0) {
        this.$validator.reset()
      } else {
        this.id = this.supplier.id
        this.name = this.supplier.name
        this.phone = this.supplier.phone
        this.email = this.supplier.email
        this.rif = this.supplier.rif
        this.name_company = this.supplier.company ? this.supplier.company.name_company : ''
        this.phone_company = this.supplier.company ? this.supplier.company.phone_company : ''
        this.email_company = this.supplier.company ? this.supplier.company.email_company : ''
        this.rif_company = this.supplier.company ? this.supplier.company.rif : ''
        this.city = this.supplier.company ? this.supplier.company.city : ''
        this.country = this.supplier.company ? this.supplier.company.country : ''
        this.address_company = this.supplier.company ? this.supplier.company.address_company : ''
      }
    }
  },
  methods: {
    initValues () {
      if (this.supplier.id) return
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
          if (this.supplier.id !== null && this.supplier.id >= 0) {
            this.updateSupplier(data)
          } else {
            this.createSupplier(data)
          }


        }
      })
    },
    createSupplier(data){
      axios.post('/suppliers/', data)
        .then(res => {
          if (res.data.res) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Proveedor creado con éxito!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.id_nuevo = res.data.supplier.id
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
    updateSupplier(data) {
      axios.post('/suppliers/'+this.supplier.id+'?_method=PUT', data)
        .then(res => {
          if (res.data.res === true) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Proveedor actualizado con éxito!',
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
    createSupplierAccount(data){
      axios.post('/account/', data)
        .then(res => {
          if (res.data.res) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Proveedor creado con éxito!',
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
    updateSupplierAccount(data) {
      axios.post('/account/'+this.supplier.company.id_company+'?_method=PUT', data)
        .then(res => {
          if (res.data.res === true) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Proveedor actualizado con éxito!',
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
            let supplier =  new FormData()

            supplier.append('image', this.image)
            supplier.append('name', this.supplier.name)
            supplier.append('phone', this.supplier.phone)
            supplier.append('rif', this.supplier.rif)
            supplier.append('email', this.supplier.email)

            //   name: this.name,
            //   phone: this.phone,
            //   email: this.email,
            //   rif: this.rif
            // }

            if(this.supplier.id) {
              this.updateSupplier(supplier)
            } else {
              this.createSupplier(supplier)
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
            let supplier =  new FormData()

            supplier.append('image', this.image)
            supplier.append('name', this.name_company)
            supplier.append('phone', this.phone_company)
            supplier.append('rif', this.rif_company)
            supplier.append('email', this.email_company)
            supplier.append('country', this.country)
            supplier.append('city', this.city)
            supplier.append('address', this.address_company)
            supplier.append('id', this.supplier.id ? this.supplier.id : this.id_nuevo)
            supplier.append('model', 'client')

            //   name: this.name,
            //   phone: this.phone,
            //   email: this.email,
            //   rif: this.rif
            // }

            if(this.supplier.id && this.supplier.company) {
              this.updateSupplierAccount(supplier)
            } else {
              this.createSupplierAccount(supplier)
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
