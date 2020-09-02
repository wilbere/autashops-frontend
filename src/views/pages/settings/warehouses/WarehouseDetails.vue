<template lang="html">
  <div class="centerx">
    <vs-button type="border" @click="popupWarehouse=true" size="small"  icon="visibility" class="mr-2"></vs-button>
    <vs-popup fullscreen :title="warehouse.name" :active.sync="popupWarehouse">
      <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
        <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="6">
          <vs-avatar size="45px" :src="warehouse.attendant.image.url"/>
          <span title="'Attendant'">
            {{ warehouse.attendant.name }}
          </span>
          <vs-button color="success" type="line" icon="edit"></vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="6">
          <vs-list>
            <vs-list-item icon="info" title="Almacén" :subtitle="warehouse.name"></vs-list-item>
            <vs-list-item icon="phone" title="Teléfono" :subtitle="warehouse.phone"></vs-list-item>
            <vs-list-item icon="mail" title="Email" :subtitle="warehouse.email"></vs-list-item>
            <vs-list-item icon="info" title="Dirección" :subtitle="warehouse.address"></vs-list-item>
          </vs-list>
        </vs-col>
      </vs-row>
      <vs-divider></vs-divider>
      <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
        <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="12">
          <h3>
            Productos en {{ warehouse.name }}
          </h3>
        </vs-col>

      </vs-row>
      <vs-divider></vs-divider>
      <div v-if="warehouse.products.length > 0">
        <vs-table
          multiple
          max-items="10"
          pagination
          search
          v-model="selected"
          :data="warehouse.products">

          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

            <div class="flex flex-wrap-reverse items-center">

              <!-- TRANSFER -->
              <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" >
                  <feather-icon icon="SendIcon" svgClasses="h-4 w-4" />
                  <span class="ml-2 text-base text-primary">Transferir </span>
              </div>
            </div>




          </div>

          <template slot="thead">
            <vs-th>
              Nombre
            </vs-th>
            <vs-th>
              Codigo de Barras
            </vs-th>
            <vs-th>
              Cantidad
            </vs-th>

          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr].name">
                {{data[indextr].name}}
              </vs-td>

              <vs-td :data="data[indextr].barcode">
                {{data[indextr].barcode}}
              </vs-td>

              <vs-td :data="data[indextr].pivot.qty">
                {{data[indextr].pivot.qty}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <div v-else>
        <vs-alert active="true">
          Actualmente no existén productos en este almacén.
        </vs-alert>
      </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
  props: {
    warehouse: {}
  },
  data(){
    return {
      popupWarehouse:false,
      selected: []
    }
  }
}
</script>
