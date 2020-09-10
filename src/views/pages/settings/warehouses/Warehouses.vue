<template lang="html">
  <div>
    <modal :isModalActive="addNewDataModal" @closeModal="toggleDataModal" :warehouse="modalData" @success="getWarehouses" />

    <confirm-delete :isModalActive="activeConfirm" @closeModal="toggleDeleteModal" :id="deleteData" @success="getWarehouses" />

    <vs-table
      max-items="10"
      pagination
      search
      v-if="warehouses.length > 0"
      :data="warehouses">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">
          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="newWarehouse">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Almacen</span>
          </div>
        </div>



      </div>

      <template slot="thead">
        <vs-th>
          Nombre
        </vs-th>
        <vs-th>
          Dirección
        </vs-th>
        <vs-th>
          Nro.
        </vs-th>
      </template>

      <template id="warehouses" slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="tr.name">
            {{tr.name}}
          </vs-td>

          <vs-td :data="tr.address">
            {{tr.address}}
          </vs-td>

          <vs-td :data="tr.phone">
            {{tr.phone}}
          </vs-td>
          <template class="expand-user" slot="expand">
            <div class="con-expand-users ">
              <div class="con-btns-user flex items-center justify-between">
                <div class="con-userx flex items-center justify-start">
                  <vs-avatar v-if="tr.attendant.image != null"  size="45px" :src="tr.attendant.image.url" />
                  <span>{{ tr.attendant.name }}</span>
                </div>
                <div class="flex">
                  <warehouse-details :warehouse="tr"></warehouse-details>

                  <vs-button type="border" size="small" @click="editWarehouse(tr)" icon-pack="feather" icon="icon-edit" color="success" class="mr-2"></vs-button>
                  <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" color="danger" @click="deleteWarehouse(tr.id)"></vs-button>
                </div>
              </div>
              <vs-list>
                <vs-list-item icon="info" title="Almacén" :subtitle="tr.name"></vs-list-item>
                <vs-list-item icon="phone" title="Teléfono" :subtitle="tr.phone"></vs-list-item>
                <vs-list-item icon="mail" title="Email" :subtitle="tr.email"></vs-list-item>
                <vs-list-item icon="info" title="Dirección" :subtitle="tr.address"></vs-list-item>
              </vs-list>
            </div>
          </template>
        </vs-tr>
      </template>
    </vs-table>
    <vs-alert v-else :active="true" color="danger" icon-pack="feather" icon="icon-alert-triangle">
      <span>No hay almacenes registrados. Registra uno nuevo <a @click="newWarehouse"><b>aqui</b></a> para continuar.</span>
    </vs-alert>
  </div>
</template>
<script>

import axios from '../../../../axios.js'
import WarehouseDetails from './WarehouseDetails.vue'
import Modal from './Modal.vue'
import ConfirmDelete from './ConfirmDelete.vue'

export default {
  components: {
    WarehouseDetails,
    Modal,
    ConfirmDelete
  },
  data: () => {
    return {
      warehouses: {},
      addNewDataModal: false,
      modalData: {},
      deleteData: '',
      activeConfirm: false,
    }
  },
  created() {
    this.getWarehouses()
  },
  methods: {

    getWarehouses(){
      axios.get('/warehouses')
        .then(res => {
          this.warehouses = res.data.warehouses
        })
    },
    editWarehouse(warehouse){
      this.modalData = warehouse
      this.toggleDataModal(true)
    },
    newWarehouse(){
      this.modalData = {}
      this.toggleDataModal(true)
    },
    toggleDataModal (val = false) {
      this.addNewDataModal = val
    },
    toggleDeleteModal (val = false) {
      this.activeConfirm = val
    },
    deleteWarehouse(id){
      this.deleteData = id
      this.toggleDeleteModal(true)
    },
  }
}
</script>

<style lang="stylus">
.con-expand-users
  width : 90%
  .con-btns-user
    display flex
    padding 10px
    padding-bottom 0px
    align-items center
    justify-content space-between
    .con-userx
      display flex
      align-items center
      justify-content flex-start
  .list-icon
    i
      font-size .9rem !important
</style>
