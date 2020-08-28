<!-- =========================================================================================
    File Name: Currencies.vue
    Description: Manage Currencies
    ----------------------------------------------------------------------------------------
    Item Name: Autashops - POS, Inventory and eCommerce System
    Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <div>
      <vs-alert active="true" class="mb-4">
        Manage your store taxes.
      </vs-alert>
      <modal :isModalActive="addNewDataModal" @closeModal="toggleDataModal" :tax="modalData" @success="getTaxes" />

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="newtax">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>



      </div>
      <!-- Currencies -->
      <div class="vx-row">
        <div v-for="tax in this.taxes" :key="tax.id" class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
            <statistics-card-line
              @set-default="setDefault(tax.id)"
              @deleted="deleteTax(tax.id)"
              @edit="editTax(tax)"
              hideChart
              class="mb-base "
              icon="PercentIcon"
              :statistic="tax.rate"
              :statisticTitle="tax.name"
              color="primary" >

            </statistics-card-line>
        </div>
      </div>

  </div>
</template>

<script>
import axios from '@/axios.js'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import Modal from './Modal.vue'

export default{
  components: {
    StatisticsCardLine,
    Modal
  },
  data () {
    return {
      taxes : [],
      addNewDataModal: false,
      modalData: {}
    }
  },
  created () {
    this.getTaxes()
  },
  methods : {
    getTaxes(){
      axios.get('/taxes')
        .then(res => {
          this.taxes = res.data.taxes
        })
    },
    editTax(tax){
      this.modalData = tax
      this.toggleDataModal(true)
    },
    newtax(){
      this.modalData = {}
      this.toggleDataModal(true)
    },
    toggleDataModal (val = false) {
      this.addNewDataModal = val
    },
    deleteTax(tax){
      axios.delete('/taxes/'+tax)
        .then(() => {
          this.$vs.notify({
            title: 'Success',
            text: 'tax default change',
            iconPack: 'feather',
            icon: 'icon-trash2',
            color: 'success'
          })
          this.getTaxes()
        })
    },

  }
}
</script>

