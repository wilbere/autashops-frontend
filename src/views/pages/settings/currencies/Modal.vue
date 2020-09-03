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
            label-placeholder="Nombre"
            v-model="currency.name" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('name') }}</span>

        </div>
      </div>

      <div class="vx-row mb-5">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required|max:3'"
            data-vv-validate-on="blur"
            data-vv-name="symbol"
            class="w-full"
            label-placeholder="Simbolo"
            v-model="currency.symbol" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('symbol') }}</span>

        </div>
      </div>

      <div class="vx-row mb-5">
        <div class="vx-col w-full">
          <vs-input
            v-validate="'required|numeric'"
            data-vv-validate-on="blur"
            data-vv-name="value"
            class="w-full"
            label-placeholder="Valor"
            v-model="currency.value" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('value') }}</span>

        </div>
      </div>

      <div class="vx-row mb-5">
        <div class="vx-col w-full">
          <vs-checkbox class="ml-3"  v-model="currency.default">Usar moneda por defecto</vs-checkbox>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button class="ml-3 mb-2"  :disabled="!validateForm" @click="submitData">Enviar</vs-button>
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
    currency:{},
    isModalActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    validateForm () {
      return  this.errors.any() !== null && this.currency.name !== '' && this.currency.symbol !== ''  && this.currency.value !== ''
    },
    titleModal(){
      return this.currency.id ? 'Editar Moneda' : 'Nueva Moneda'
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
      symbol: '',
      value: '',
      def: false,
    }
  },
  created() {
    // this.getUsers()
  },
  watch: {
    isModalActive (val) {
      if (!val) return
      if (Object.entries(this.currency).length === 0) {
        this.$validator.reset()
      } else {
        this.id = this.currency.id
        this.name = this.currency.name
        this.symbol = this.currency.symbol
        this.value = this.currency.value
        this.def = this.currency.default
      }
    }
  },
  methods: {
    initValues () {
      if (this.currency.id) return
      this.id = null
      this.name = ''
      this.symbol = ''
      this.value = ''
      this.def = false
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const data = {
            id: this.currency.id,
            name: this.currency.name,
            symbol: this.currency.symbol,
            value: this.currency.value,
            default: this.currency.default ? true : false,
          }
          if (this.currency.id !== null && this.currency.id >= 0) {
            this.updateCurrency(data)
          } else {
            this.createCurrency(data)
          }


        }
      })
    },
    createCurrency(data){
      axios.post('/currencies/', data)
        .then(res => {
          if (res.data.res) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Moneda creada exitosamente',
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
    updateCurrency(data) {
      axios.put('/currencies/'+this.currency.id, data)
        .then(res => {
          if (res.data.res === true) {
            this.$vs.notify({
              title: 'Aprobado',
              text: 'Datos actualizados exitosamente!',
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
