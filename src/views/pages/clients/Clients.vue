<template>
  <div>

    <confirm-delete :isModalActive="activeConfirm" @closeModal="toggleDeleteModal" :id="deleteData" @success="getClients" />

    <vs-table v-if="clients.length > 0" :data="clients" search>

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">
          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="$router.push('/admin/clients/create').catch(() => {})">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Cliente</span>
          </div>
        </div>

      </div>

      <template slot="thead">

        <vs-th>ID</vs-th>
        <vs-th>Cliente</vs-th>
        <vs-th>RIF ó C.I.</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Teléfono</vs-th>
        <vs-th>Tipo</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.slug">
            {{ tr.slug }}
          </vs-td>


          <vs-td :data="tr.name" class="con-userx flex items-center justify-start">
            <vx-tooltip :text="tr.name" v-if="tr.image != null" position="bottom">
              <vx-tooltip :text="tr.name" position="bottom">
                <vs-avatar :src="tr.image.url" size="40px" class="border-2 border-white border-solid -m-1"></vs-avatar>
              </vx-tooltip>
            </vx-tooltip>
            <span v-else>{{ tr.name }}</span>
          </vs-td>


          <vs-td :data="tr.rif">
            {{ tr.rif ? tr.rif : tr.identity_card }}
          </vs-td>

          <vs-td :data="tr.email">
            {{ tr.email }}
          </vs-td>
          <vs-td :data="tr.phone">
            {{ tr.phone }}
          </vs-td>

          <vs-td :data="tr.type">
            {{ tr.type }}
          </vs-td>
          <!-- <template class="expand-user"  slot="expand">
            <div class="con-expand-users ">
              <div class="con-btns-user flex items-center justify-between">
                <div class="con-userx flex items-center justify-start">
                  <vs-avatar v-if="tr.image != null"  size="45px" :src="tr.image.url" />
                  <span>{{ tr.name }}</span>
                </div>
                <div class="flex">
                  <!- <warehouse-details :warehouse="tr"></warehouse-details> --

                  <vs-button type="border" size="small"  icon-pack="feather" icon="icon-edit" color="success" class="mr-2" @click="editClient(tr)"></vs-button>
                  <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" color="danger" @click="deleteClient(tr.id)"></vs-button>
                </div>
              </div>
              <vs-list v-if="tr.company != null">
                <vs-list-item icon="info" title="Nombre de la empresa" :subtitle="tr.company.name_company">
                  <img v-if="tr.company.image_company != null" width="65px" :src="tr.company.image_company.url">

                </vs-list-item>
                <vs-list-item icon="phone" title="Teléfono de la empresa" :subtitle="tr.company.  phone_company"></vs-list-item>
                <vs-list-item icon="mail" title="Email de la empresa" :subtitle="tr.company.email_company"></vs-list-item>
                <vs-list-item icon="info" title="Dirección de la empresa" :subtitle="tr.company.address_company"></vs-list-item>

              </vs-list>
            </div>
          </template> -->
        </vs-tr>
      </template>
    </vs-table>
    <vs-alert v-else :active="true" color="danger" icon-pack="feather" icon="icon-alert-triangle">
      <span>No hay clientes registrados. Registra uno nuevo <a @click="$router.push('/admin/clients/create').catch(() => {})"><b>aqui</b></a> para continuar.</span>
    </vs-alert>
  </div>
</template>

<script>
import axios from '@/axios.js'
import ConfirmDelete from './ConfirmDelete.vue'

export default {
  components : {
    ConfirmDelete
  },
  data() {
    return {
      clients: [],
      modalData: {},
      addNewDataModal: false,
      deleteData: '',
      activeConfirm: false,
    }
  },
  created () {
    this.getClients()
  },
  methods: {
    getClients(){
      axios.get('/clients')
        .then(res => {
          this.clients = res.data.clients
        })

    },
    // editClient(client){
    //   this.modalData = client
    //   this.toggleDataModal(true)
    // },
    // newClient(){
    //   this.modalData = {}
    //   this.toggleDataModal(true)
    // },
    // toggleDataModal (val = false) {
    //   this.addNewDataModal = val
    // },
    // toggleDeleteModal (val = false) {
    //   this.activeConfirm = val
    // },
    deleteClient(id){
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
