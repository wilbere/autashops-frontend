<template>
  <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null" :subtitle="'Rellena todos los espacios'" finishButtonText="Enviar">
    <tab-content title="Datos del producto" class="mb-5" icon="feather icon-user-plus" :before-change="validateStep1">
      <!-- tab 1 content -->
      <form enctype="multipart/form-data" data-vv-scope="step-1">

        <div class="vx-row">
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input 
              class="w-full" 
              v-validate="'required'"
              data-vv-validate-on="blur"
              data-vv-name="name" 
              icon-pack="feather" 
              icon="icon-package" 
              icon-no-border 
              label-placeholder="Nombre del producto"  
              v-model="name" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.name') }}</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input 
              class="w-full" 
              icon-pack="feather" 
              icon="icon-info"  
              v-validate="'required|max:43'" 
              data-vv-validate-on="blur"
              icon-no-border 
              label-placeholder="Código de barras" 
              v-model="barcode" 
              data-vv-name="barcode" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.barcode') }}</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-select v-model="category" class="w-full select-large" label="Categoria del producto">
              <vs-select-item :key="id" :value="item.id" :text="item.name" v-for="(item,id) in categories" class="w-full" />
            </vs-select>
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.category') }}</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-select v-model="unit" :closeOnSelect="false" class="w-full select-large" label="Unidad del producto">
              <vs-select-item :key="id" multiple :value="item.id" :text="item.name" v-for="(item,id) in units" class="w-full" />
            </vs-select>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-select v-model="brand" class="w-full select-large" label="Marca del producto">
              <vs-select-item  :value="null" text="No Aplica"  class="w-full" />
              <vs-select-item :key="id" :value="item.id" :text="item.name" v-for="(item,id) in brands" class="w-full" />
            </vs-select>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input 
              label="Costo del Producto" 
              v-model="cost"  
              class="w-full" 
              icon-pack="feather" 
              icon="icon-dollar-sign" 
              icon-no-border 
              name="cost" 
              data-vv-name="cost"
              data-vv-validate-on="blur"
              v-validate="'required|decimal:2'" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.cost') }}</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input 
              label="Precio del Producto" 
              v-model="price"  
              class="w-full" 
              name="price" 
              icon-pack="feather" 
              icon="icon-dollar-sign" 
              icon-no-border 
              data-vv-name="price"
              data-vv-validate-on="blur"
              v-validate="'required|decimal:2'" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.price') }}</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input 
              label="Cantidad de alerta" 
              v-model="alert_qty"  
              class="w-full" 
              name="alert_qty" 
              icon-pack="feather" 
              icon="icon-alert-triangle" 
              icon-no-border 
              data-vv-name="alert_qty"
              data-vv-validate-on="blur"
              v-validate="'required|numeric'" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.alert_qty') }}</span>
          </div>
          <div class="vx-col md:w-1/3 w-full mt-5">
            <vs-input 
              label="Peso (Kg)" 
              v-model="weight"  
              class="w-full" 
              name="weight" 
              icon="fitness_center" 
              icon-no-border 
              data-vv-name="weight"
              data-vv-validate-on="blur"
              v-validate="'required|decimal:2'" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.weight') }}</span>
          </div>
          <div class="vx-col  w-full mt-5">
            <vs-checkbox v-model="wholesale">Este producto se vende al mayor</vs-checkbox>
          </div>   
          <div v-if="wholesale" class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  
              label="Precio al mayor" 
              v-model="wholesale_price"   
              class="w-full" 
              name="wholesale_price"
              icon-pack="feather" 
              icon="icon-dollar-sign" 
              icon-no-border 
              data-vv-name="wholesale_price"
              data-vv-validate-on="blur" 
              v-validate="wholesale ? 'required|decimal:2' : ''" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.wholesale_price') }}</span>
          </div>
          <div v-if="wholesale" class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  
              label="A partir de" 
              v-model="wholesale_qty"   
              class="w-full" 
              icon-pack="feather" 
              icon="icon-layers" 
              icon-no-border 
              name="wholesale_qty"
              data-vv-name="wholesale_qty"
              data-vv-validate-on="blur" 
              v-validate="wholesale ? 'required|numeric' : ''" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.wholesale_qty') }}</span>
          </div>
          <div class="vx-col  w-full mt-5">
            <vs-checkbox v-model="warranty">Este producto tiene garantia</vs-checkbox>
          </div>       
          <div v-if="warranty" class="vx-col md:w-1/3 w-full mt-5">
            <vs-input  
              label="Tiempo de garantía(dias)" 
              v-model="warranty_days"   
              class="w-full" 
              icon-pack="feather" 
              icon="icon-calendar" 
              icon-no-border 
              name="warranty_days"
              data-vv-name="warranty_days"
              data-vv-validate-on="blur" 
              v-validate="wholesale ? 'required|numeric' : ''" />
            <span class="text-danger w-full ml-3 text-sm">{{ errors.first('step-1.warranty_days') }}</span>
          </div>
        </div>
      </form>
    </tab-content>

    <!-- tab 2 content -->
    <tab-content title="Descriptción del producto" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep2">
      <form data-vv-scope="step-2" enctype="multipart/form-data">
        <!-- Img Row -->
        <div class="vx-row">
          <div class="vx-col md:w-1/1 w-full mt-5">
            <quill-editor v-model="description" :options="editorOption">
              <div id="toolbar" slot="toolbar">

                <!-- Add a bold button -->
                <button class="ql-bold">Bold</button>
                <button class="ql-italic">Italic</button>

                <!-- Add font size dropdown -->
                <select class="ql-size">
                  <option value="small"></option>
                  <!-- Note a missing, thus falsy value, is used to reset to default -->
                  <option selected></option>
                  <option value="large"></option>
                  <option value="huge"></option>
                </select>

                <select class="ql-font">
                  <option selected="selected"></option>
                  <option value="serif"></option>
                  <option value="monospace"></option>
                </select>

                <button class="ql-list" value="ordered"></button>
                <button class="ql-list" value="bullet"></button>

                <select class="ql-color">
                  <option selected="selected"></option>
                  <option value="red"></option>
                  <option value="yellow"></option>
                  <option value="blue"></option>
                </select>

                <!-- Add subscript and superscript buttons -->
                <button class="ql-script" value="sub"></button>
                <button class="ql-script" value="super"></button>

              </div>
            </quill-editor>
          </div>
        </div>
        
      </form>
     </tab-content>

    <!-- tab 2 content -->
    <tab-content title="Imagenes del producto" class="mb-5" icon="feather icon-briefcase" :before-change="validateStep3">
      <form data-vv-scope="step-2" enctype="multipart/form-data">
        <!-- Img Row -->
        <vx-card>
          <div class="vx-row">
            <div class="vx-col md:w-1/1 w-full mt-5">
              <vs-upload automatic fileName="image" name="image" text="Subir Fotos" :action="'http://127.0.0.1:8000/api/products/image/'+id_nuevo" @on-success="successUpload" />
            </div>
          </div>
        </vx-card>

        
      </form>
    </tab-content>

  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import axios from '@/axios.js'
import { quillEditor } from 'vue-quill-editor'

import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


// For custom error message
import { Validator } from 'vee-validate';
const dict = {
  custom: {
    name: {
      required: 'El nombre del producto es requerido',
    },
    barcode: {
      required: 'El código de barras es requerido',
      max: 'Máximo 43 carácteres'
    },
    cost: {
      required: 'El costo es requerido',
      decimal: "El costo debe contener sólo números (10.00)"
    },
    price: {
      required: 'El precio es requerido',
      decimal: "El precio debe contener sólo números (10.00)"
    },
    wholesale_price: {
      required: 'El precio al mayor es requerido es requerido',
      decimal: "El precio al mayor debe contener sólo números (10.00)"
    },
    wholesale_qty: {
      required: 'La cantidad de venta al mayor es requerida',
      numeric: "Este campo debe contener sólo números (10)"
    },
    weight: {
      required: 'El peso es requerido',
      decimal: "El peso debe contener sólo números (10.00)"
    },
    alert_qty: {
      required: 'La cantidad de alerta es requerido',
      numeric: "Debe contener sólo números (10)"
    },
    warranty_days: {
      required: 'La cantidad de alerta es requerido',
      numeric: "Debe contener sólo números (10)"
    },
  }
};
// register custom messages
Validator.localize('es', dict);

export default {
  data() {
    return {

      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      },
      name: "",
      barcode: "",
      cost: "",
      category: "",
      categories: [],
      brand: "",
      brands: [],
      unit: "",
      units: [],
      price: '',
      weight: '',
      tags:[],
      optionsTag: [],
      wholesale_price: '',
      wholesale_qty: '',
      wholesale: false,
      alert_qty: '',
      warranty: false,
      warranty_days: '',
      description: '',
      id_nuevo: '',
      image: ''
    }
  },
  created(){
    this.getCategories()
    this.getBrands()
    this.getUnits()
  },
  methods: {
    getCategories(){
      axios.get('/categories')
        .then(res => {
          this.categories = res.data.categories
        })
    },
    getBrands(){
      axios.get('/brands')
        .then(res => {
          this.brands = res.data.brands
        })
    },
    getUnits(){
      axios.get('/units')
        .then(res => {
          this.units = res.data.units
        })
    },
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll('step-1').then(result => {
          if (result) {
            console.log(result)
            resolve(true)
          } else {
            console.log(this.$validator.errors.first('step-1.name'))
            reject("correct all values");
          }
        })
      })
    },
    validateStep2() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-2").then(result => {
          if (result) {

            let product = {
              name: this.name,
              barcode: this.barcode,
              category: this.category,
              unit: this.unit,
              brand: this.brand,
              cost: this.cost,
              price: this.price,
              alert_qty: this.alert_qty,
              weight: this.weight,
              wholesale_price: this.wholesale_price,
              wholesale_qty: this.wholesale_qty,
              warranty_days: this.warranty_days,
              description: this.description,
            }

            console.log(product)

            axios.post('/products', product)
              .then(res => {
                if (res.data.res) {
                  this.$vs.notify({
                    title: 'Aprobado',
                    text: 'Datos actualizados exitosamente!',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                  })
                  this.id_nuevo = res.data.product.id
                  resolve(true)
                } else {
                  this.$vs.notify({
                    title: 'Error',
                    text: res.data.error,
                    iconPack: 'feather',
                    icon: 'icon-info',
                    color: 'danger'
                  })
                  reject("correct all values");
                }

              })
            // console.log(this.description)
          } else {
            // console.log(this.description)
            reject("correct all values");
          }
        })
      })
    },
    validateStep3() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-3").then(result => {
          if (result) {
            resolve(true)
          } else {
            reject("correct all values");
          }
        })
      })
    },
    successUpload(){
      this.$vs.notify({color:'success',title:'Upload Success',text:'Lorem ipsum dolor sit amet, consectetur'})
    }
  },
  components: {
    FormWizard,
    TabContent,
    quillEditor
  }
}
</script>

<style lang="stylus" scoped>
.cursor-pointer
  cursor pointer
</style>
