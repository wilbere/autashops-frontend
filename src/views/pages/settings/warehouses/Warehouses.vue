<template lang="html">
  <div>
    <vs-table
      max-items="10"
      pagination
      search
      :data="warehouses">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32">
              <span class="mr-2">Actions</span>
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
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="newWarehouse">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>


        
      </div>

      <template slot="thead">
        <vs-th>
          Name
        </vs-th>
        <vs-th>
          Address
        </vs-th>
        <vs-th>
          Nro
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
            <div class="con-expand-users">
              <div class="con-btns-user">
                <div class="con-userx">
                  <vs-avatar size="45px" :src="tr.attendant.image.url"/>
                  <span>
                    {{ tr.attendant.name }}
                  </span>
                </div>

                <div>
                  <warehouse-details :warehouse="tr"></warehouse-details>
                  <edit-warehouse :warehouse="tr" @success='getWarehouses'></edit-warehouse>
                  <vs-button vs-type="flat" size="small" color="danger" icon="delete_sweep"></vs-button>
                </div>
              </div>
              <vs-list>
                <vs-list-item icon="info" title="Warehouse" :subtitle="tr.name"></vs-list-item>
                <vs-list-item icon="phone" title="Phone" :subtitle="tr.phone"></vs-list-item>
                <vs-list-item icon="mail" title="Email" :subtitle="tr.email"></vs-list-item>
                <vs-list-item icon="info" title="Address" :subtitle="tr.address"></vs-list-item>
              </vs-list>
            </div>
          </template>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>

import axios from '../../../../axios.js'
import WarehouseDetails from './WarehouseDetails.vue'
import EditWarehouse from './EditWarehouse.vue'

export default {
  components: {
    WarehouseDetails,
    EditWarehouse
  },
  data: () => {
    return {
      warehouses: {}
    }
  },
  created() {
    this.getWarehouses()
  },
  methods: {

    getWarehouses(){
      axios.get('/warehouses')
        .then(res => {
          this.warehouses = res.data.data
        })
    },
    newWarehouse(){
      alert('new warehouse')
    }
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
