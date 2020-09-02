<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Autashops - POS, Inventory and eCommerce System
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "NUEVA" : "ACTUALIZAR" }} MARCA</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <form enctype="multipart/form-data">
    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">
        <!-- Product Image -->
        <template v-if="data.image || thumbnail">

          <!-- Image Container -->
          <div class="img-container w-64 mx-auto flex items-center justify-center">
            <img :src="thumbnail ? thumbnail : data.image.url" alt="img" class="responsive">
          </div>

          <!-- Image upload Buttons -->
          <div class="modify-img flex justify-between mt-5">
            <input type="file" class="hidden" name="image" ref="updateImgInput" @change="getImage" accept="image/*">
            <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Cambiar Imagen</vs-button>
            <vs-button type="flat" color="#999" @click="data.image ? data.image = null : img_min = null">Remover Imagen</vs-button>
          </div>
        </template>

        <!-- NAME -->
        <vs-input label="Nombre" v-model="data.name" class="mt-5 w-full" name="name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <!-- Upload -->
        <!-- <vs-upload text="Upload Image" class="img-upload" ref="fileUpload" /> -->

        <div class="upload-img mt-5" v-if="!data.image">
          <input type="file" class="hidden" name="image" ref="uploadImgInput" @change="getImage" accept="image/*">
          <vs-button @click="$refs.uploadImgInput.click()">Subir Imagen</vs-button>
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Enviar</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancelar</vs-button>
    </div>
    </form>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from '@/axios.js'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {},
  },
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {

      brand : {
        id: null,
        name: '',
      },
      image: null,
      img_min: '',

      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    thumbnail() {
      return this.img_min
    },
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        // const {id, image, name } = JSON.parse(JSON.stringify(this.data))
        this.id = this.data.id
        // this.image = this.data.image.url
        this.name = this.data.name
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.id, this.name, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    thumbnail() {
      return this.img_min
    },
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          this.$validator.reset()
          this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() && this.data.name != ''
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.id = null
      this.name = ''
      this.image = ''
    },
    submitData () {

      this.$validator.validateAll().then(result => {
        if (result) {
          let brand = new FormData()
          brand.append('name', this.data.name)
          brand.append('id', this.data.id)
          brand.append('data', new Blob([JSON.stringify(this.image)], { type: 'application/json'}))
          console.log('submitData formdata', this.image)
          brand.append('image', this.image)
          brand.append('image_id', this.data.image ? this.data.image.id : '')

          console.log('submitData()', brand)

          if (this.data.id !== null && this.data.id >= 0) {
            this.editBrand(brand);
          } else {
            this.newBrand(brand)
          }


        }
      })
    },
    editBrand(data){
      axios({
          method: "put",
          url: '/brands/'+this.data.id,
          data: data,
          config: { headers: {"Content-type": "multipart/form-data" }}
        })
        .then(res => {
          if (res.data.res) {
            this.$vs.notify({
              title: 'Aprobado!',
              text: 'Datos actualizados exitosamente!',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
            this.$emit('successUpdate')
            this.$emit('closeSidebar')
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
    newBrand(data){
      axios({
        method: "post",
        url: '/brands/',
        data: data,
        config: { headers: {"Content-type": "multipart/form-data" }}
      })
      .then(res => {
        if (res.data.res) {
          this.$vs.notify({
            title: 'Aprobado',
            text: 'Marca creada exitosamente!',
            iconPack: 'feather',
            icon: 'icon-check',
            color: 'success'
          })
          this.$emit('successUpdate')
          this.$emit('closeSidebar')
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

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
