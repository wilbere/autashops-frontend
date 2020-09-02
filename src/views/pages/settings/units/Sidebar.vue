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
        <h4>{{ Object.entries(this.data).length === 0 ? "NUEVA" : "ACTUALIZAR" }} UNIDAD</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- NAME -->
        <vs-input label="Nombre" v-model="data.name" class="mt-5 w-full" name="item-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-name') }}</span>

        <vs-input label="Codigo" v-model="data.code" class="mt-5 w-full" name="item-code" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-code')">{{ errors.first('item-code') }}</span>

        <!-- DESCRIPTION -->
        <vs-input label="Descripción" v-model="data.description" class="mt-5 w-full" name="description" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Enviar</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancelar</vs-button>
    </div>
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

      id: null,
      name: '',
      code: '',
      description: '',

      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        // const {id, description, name } = JSON.parse(JSON.stringify(this.data))
        this.id = this.data.id
        this.name = this.data.name
        this.code = this.data.code
        this.description = this.data.description
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.id, this.name, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() && this.data.name != '' && this.data.code != '' && this.data.description != ''
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.id = null
      this.name = ''
      this.code = ''
      this.description = ''
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const unit = {
            id: this.data.id,
            name: this.data.name,
            code: this.data.code,
            description: this.data.description,
          }
          if (this.data.id !== null && this.data.id >= 0) {
            axios.put('/units/'+this.data.id, unit)
              .then(res => {
                if (res.data.res) {
                  this.$vs.notify({
                    title: 'Aprobado',
                    text: 'Se ha actualizado la unidad con éxito!',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                  })
                  this.$emit('success')
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
          } else {
            axios.post('/units/', unit)
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
                } else {
                  this.$vs.notify({
                    title: 'Error',
                    text: res.data.errors,
                    iconPack: 'feather',
                    icon: 'icon-alert',
                    color: 'danger'
                  })
                }
              })
          }

          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },
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
