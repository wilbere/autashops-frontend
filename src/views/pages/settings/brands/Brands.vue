<!-- =========================================================================================
  File Name: Brands.vue
  Description: Brand List
  ----------------------------------------------------------------------------------------
  Item Name: Autashops - POS, Inventory and eCommerce System
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
========================================================================================== -->

<template>
  <div id="data-list-thumb-view" class="data-list-container">

    <confirm-delete :isModalActive="activeConfirm" @closeModal="toggleDataModal" :id="modalData" @success="getBrands" />

    <sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" @successUpdate="getBrands" />

    <vs-table v-if="brands.length > 0" ref="table" v-model="selected" pagination max-items="6" search :data="brands">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32">
              <span class="mr-2">Opciones</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="LayoutIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Excel</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="FileTextIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>PDF</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="PrinterIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Print</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="newBrand">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Marca</span>
          </div>
        </div>



      </div>

      <template slot="thead">
        <vs-th>Imagen</vs-th>
        <vs-th sort-key="name">Nombre</vs-th>
        <vs-th>Acción</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td class="img-container">
              <img v-if="tr.image != null" :src="tr.image.url" class="product-img" />
              <p v-else >N/A</p>
            </vs-td>

            <vs-td>
              <p class="product-name font-medium truncate">{{ tr.name }}</p>
            </vs-td>



            <vs-td class="whitespace-no-wrap">
              <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editBrand(tr)" />
              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click="openConfirm(tr.id)" />
            </vs-td>

          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <vs-alert v-else :active="true" color="danger" icon-pack="feather" icon="icon-alert-triangle">
      <span>No hay marcas registradas. Registra una nueva <a @click="newBrand"><b>aqui</b></a> para continuar.</span>
    </vs-alert>
  </div>
</template>

<script>
import axios from '@/axios.js'
import Sidebar from './Sidebar.vue'
import ConfirmDelete from './ConfirmDelete.vue'

export default {
  components: {
    Sidebar,
    ConfirmDelete
  },
  data () {
    return {
      selected: [],
      brands: [],
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
      activeConfirm: false,
      modalData: ''
    }
  },
  created(){
    this.getBrands()
  },
  methods: {
    getBrands() {
      axios.get('/brands')
        .then(res => {
          console.log(this.brands)
          this.brands = res.data.brands
        })
    },
    newBrand(){
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    editBrand (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    openConfirm(id) {
      this.modalData = id
      this.toggleDataModal(true)
    },
    toggleDataModal (val = false) {
      this.activeConfirm = val
    },
  },
}
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;


      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            &.img-container {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: flex-start;
              }

              .product-img {
                height: 110px;
              }
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
