<template lang="html">
  <div class="centerx">
    <vs-button vs-type="border" @click="popupWarehouse=true" size="small" icon="visibility"></vs-button>
    <vs-popup fullscreen :title="warehouse.name" :active.sync="popupWarehouse">
      <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
        <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-w="6">
          <vs-avatar size="45px" :src="warehouse.attendant.image.url"/>
          <span title="Attendant">
            {{ warehouse.attendant.name }}
          </span>
          <vs-button color="success" type="line" icon="edit"></vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="6">
          <vs-list>
            <vs-list-item icon="info" title="Warehouse" :subtitle="warehouse.name"></vs-list-item>
            <vs-list-item icon="phone" title="Phone" :subtitle="warehouse.phone"></vs-list-item>
            <vs-list-item icon="mail" title="Email" :subtitle="warehouse.email"></vs-list-item>
            <vs-list-item icon="info" title="Address" :subtitle="warehouse.address"></vs-list-item>
          </vs-list>
        </vs-col>
      </vs-row>
      <vs-divider></vs-divider>
      <vs-row vs-align="center" vs-type="flex" vs-justify="space-around" vs-w="12">
        <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="6">
          <h3>
            Products in {{ warehouse.name }}
          </h3>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="6">
          <vs-button vs-type="border"  size="small" icon="send"></vs-button>
        </vs-col>
      </vs-row>
      <vs-divider></vs-divider>
      <vs-table
        multiple
        max-items="10"
        pagination
        v-model="selected"
        :data="warehouse.products">

        <template slot="thead">
          <vs-th>
            Name
          </vs-th>
          <vs-th>
            Barcode
          </vs-th>
          <vs-th>
            Quantity
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
