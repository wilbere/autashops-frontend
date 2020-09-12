<template lang="html">
  <div class="centerx">
    <form enctype="multipart/form-data" data-vv-scope="step-1">

      <!-- Img Row -->
      <div class="vx-row">
        <div class="vx-col md:w-2/2 w-full mt-5">
          <div class="flex flex-wrap w-full items-center mb-base">
            <vs-avatar :src="thumbnail ? thumbnail : null" size="100px" class="mr-4 " />
            <div>
              <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">

              <vs-button class="mr-5 sm:mb-0 mb-2" @click="$refs.updateImgInput.click()">Subir foto</vs-button>
              <vs-button type="border" class="mr-5" color="danger"  @click="image ? image = null : img_min = null">Remover</vs-button>
              <p class="text-sm mt-2">Formatos permitidos: JPG or PNG.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col md:w-1/3 w-full mt-5">
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="blur"
            data-vv-name="name"
            class="w-full"
            :label-placeholder="!juridical ? 'Nombre(s) y Apellido(s)' : 'Razón Social'"
            v-model="name" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('name') }}</span>
        </div>
        <div class="vx-col  md:w-1/3 w-full mt-5">
          <vs-input
            label-placeholder="Email"
            type="email"
            v-model="email"
            class="w-full"
            v-validate="'required|email'"
            data-vv-name="email"
            data-vv-validate-on="blur"
          />
          <span class="text-danger">{{ this.$validator.errors.first('email') }}</span>
        </div>
        <div class="vx-col md:w-1/3 w-full mt-5">
          <vs-input
            v-mask="'(####)###-####'"
            label-placeholder="Teléfono"
            v-model="phone"
            class="w-full"
            v-validate="'required'"
            data-vv-name="phone"
            data-vv-validate-on="blur"/>
          <span class="text-danger">{{ errors.first('phone') }}</span>
        </div>
        <div v-if="juridical" class="vx-col mb-base md:w-1/3 w-full ">
          <vs-input
            v-mask="['J#########',]"
            label-placeholder="Rif"
            v-model="rif"
            class="w-full "
            data-vv-name="rif"
            data-vv-validate-on="blur"
            v-validate="'required'" />
          <span class="text-danger">{{ errors.first('rif') }}</span>
        </div>
        <vx-input-group v-if="!juridical" class="vx-col mb-base md:w-1/3 w-full mt-5">
          <template slot="prepend">
            <div class="prepend-text ">
              <span class="text-sm">Tipo</span>
            </div>
            <div class="prepend-text ">
              <vs-radio v-model="is_rif"  :vs-value="true">RIF</vs-radio>
            </div>
            <div class="prepend-text ">
              <vs-radio v-model="is_rif" :vs-value="false">C.I</vs-radio>
            </div>
            <div class="prepend-text ">
              <vs-radio v-model="type_rif"  vs-value="V">V</vs-radio>
            </div>
            <div class="prepend-text ">
              <vs-radio v-model="type_rif"  vs-value="E">E</vs-radio>
            </div>
          </template>

        </vx-input-group>
        <div v-if="!juridical" :class="isRif ? 'vx-col mb-base md:w-1/3 w-full mt-5' : 'vx-col mb-base md:w-2/3 w-full mt-5'">
          <vs-input
            v-mask="isRif ? ['########', '#########',] : ['#######', '########']"
            :label-placeholder="isRif ?'RIF' : 'C.I.'"
            v-model="rif"
            class="w-full "
            data-vv-name="rif"
            data-vv-validate-on="blur"
            :v-validate="isRif ? 'required|numeric|min:8' :'required|numeric|min:7'" />
          <span class="text-danger">{{ errors.first('rif') }}</span>
        </div>
        <div v-if="!juridical && isRif"  class="vx-col mb-base md:w-1/3 w-full mt-5">
          <vs-input
            v-mask="['#######', '########']"
            label-placeholder="C.I"
            disabled
            v-model="identity_card"
            class="w-full"
             />
        </div>
        <div :class="juridical ? 'vx-col w-full md:w-2/3' :'vx-col w-full md:w-1/2'">

          <div class="vx-row">
            <div :class="juridical ? 'vx-col mb-base md:w-1/2 w-full' : 'vx-col mb-base w-full'">
              <vs-input
                label-placeholder="Ciudad"
                v-model="city"
                class="w-full"
                name="city"
                data-vv-name="city"
                data-vv-validate-on="blur"
                v-validate="'required'" />
              <span class="text-danger">{{ errors.first('city') }}</span>
            </div>
            <div :class="juridical ? 'vx-col mb-base md:w-1/2 w-full' : 'vx-col mb-base w-full'">
              <vs-input
                label-placeholder="País"
                v-model="country"
                class="w-full"
                name="country"
                data-vv-name="country"
                data-vv-validate-on="blur"
                v-validate="'required'" />
              <span class="text-danger">{{ errors.first('country') }}</span>
            </div>
          </div>
        </div>
        <div  :class="juridical ? 'vx-col  md:w-1/1 w-full' : 'vx-col w-full mt-5 md:w-1/2 '">
          <vs-textarea
            label="Dirección"
            data-vv-name="address"
            data-vv-validate-on="blur"
            v-validate="'required'"
            v-model="address" />
            <span class="text-danger">{{ errors.first('address') }}</span>
        </div>
      </div>
      <vs-row vs-align="flex-end" vs-type="flex" vs-justify="flex-end">
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end">
          <vs-button class="mr-5" type="border" color="danger" @click="initValues">Cancelar</vs-button>
          <vs-button  @click="submitData" :disabled="!validateForm">Guardar</vs-button>

        </vs-col>
      </vs-row>
    </form>

  </div>
</template>

<script>
import axios from '@/axios.js'
import vSelect from 'vue-select'
import {mask} from 'vue-the-mask'
import { Validator } from 'vee-validate';

const dict = {
  custom: {
    name: {
      required: 'Este campo es requerido',
    },
    email: {
      required: 'El email es requerido',
      email: 'Ingresa un email válido.'
    },
    phone: {
      required: 'El costo es requerido',
    },
    rif: {
      numeric: "Este debe poseer sólo números",
      min: "Minimo 8 dígitos"
    },
    identity_card: {
      required: 'La C.I. es requerida',
      min: "Minimo 7 dígitos"

    },
    city: {
      required: 'Ciudad requerida',
    },
    country: {
      required: 'País requerido',

    },
    address: {
      required: 'Dirección requerida',
    },
  }
};
// register custom messages
Validator.localize('es', dict);

export default {
  directives: {mask},
  components : {
    vSelect,
  },
  props: {
    client:{},
    isUpdate: {
      type: Boolean,
    },
    juridical: {
      type: Boolean,
    }
  },
  computed: {
    thumbnail() {
      return this.img_min
    },
    validateForm () {
      return  this.errors.any() !== null && this.name !== '' && this.phone !== '' && this.email !== '' && this.rif !== '' && this.city !== '' && this.country !== '' && this.address !== ''
    },
    isRif() {
      return this.is_rif
    },
    identity_card:{
      get() {
        return  this.rif != '' ? this.rif.slice(0, -1) : ''
      }
    },
  },
  data(){
    return {

      name: '',
      phone: "",
      email: "",
      rif : "",
      id_card: '',
      image: null,
      img_min: '',
      city: '',
      country: '',
      address: '',
      is_rif: true,
      type_rif: 'V',
    }
  },
  watch: {
    isUpdate (val) {
      if (!val) return
      if (Object.entries(this.client).length === 0) {
        this.$validator.reset()
      } else {
        this.id = this.client.id
        this.name = this.client.name
        this.phone = this.client.phone
        this.email = this.client.email
        this.rif = this.client.rif
        this.identity_card = this.client.identity_card
        this.city =  this.client.city
        this.country = this.client.country
        this.address = this.client.address
      }
    }
  },
  methods: {
    initValues () {
      if (this.client != null) return
      this.name = ''
      this.phone = ""
      this.email = ""
      this.rif  = ""
      this.image = null
      this.img_min = ''
      this.identity_card  = ""
      this.city = ''
      this.country = ''
      this.address = ''
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let client =  new FormData()

          client.append('type', this.juridical ? 1 : 0)
          client.append('image', this.image)
          client.append('name', this.name)
          client.append('phone', this.phone)
          client.append('rif', this.juridical ? this.rif : this.isRif ? this.type_rif+this.rif : undefined)
          client.append('email', this.email)
          client.append('identity_card', this.juridical ? '' : !this.juridical && this.isRif ? this.identity_card : this.rif )
          client.append('country', this.country)
          client.append('city', this.city)
          client.append('address', this.address)

          // console.log(client.get('rif'))
          // console.log(client.get('identity_card'))
          if (this.client !== null) {
            this.updateClient(client)
          } else {
            this.createClient(client)
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
            this.$router.push('/admin/clients').catch(() => {})
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
  },
  created() {
  }
}

</script>

<style lang="stylus" scoped>
.con-vs-popup
  .vs-popup
    width 70%

</style>
