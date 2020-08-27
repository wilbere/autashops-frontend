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
        The system uses the currency that is activated with the main color.
      </vs-alert>
      <modal :isModalActive="addNewDataModal" @closeModal="toggleDataModal" :currency="modalData" @success="getCurrencies" />

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="newCurrency">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>


        
      </div>
      <!-- Currencies -->
      <div class="vx-row">
        <div v-for="currency in this.currencies" :key="currency.id" class="vx-col w-1/2 md:w-1/3 xl:w-1/5">
            <statistics-card-line
              @set-default="setDefault(currency.id)"
              @deleted="deleteCurrency(currency.id)"
              @edit="editCurrency(currency)"
              hideChart
              class="mb-base "
              icon="DollarSignIcon"
              :statistic="currency.value"
              :statisticTitle="currency.name +' ('+currency.symbol+')'"
              :color="currency.default ? 'primary' : 'secondary'" >
              
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
      currencies : [],
      addNewDataModal: false,
      modalData: {}
    }
  },
  created () {
    this.getCurrencies()
  },
  methods : {
    getCurrencies(){
      axios.get('/currencies')
        .then(res => {
          this.currencies = res.data.currencies
        })
    },
    editCurrency(currency){
      this.modalData = currency
      this.toggleDataModal(true)
    },
    newCurrency(){
      this.modalData = {}
      this.toggleDataModal(true)
    },
    toggleDataModal (val = false) {
      this.addNewDataModal = val
    },
    deleteCurrency(currency){
      axios.delete('/currencies/'+currency)
        .then(res => {
          this.$vs.notify({
            title: 'Success',
            text: 'Currency default change',
            iconPack: 'feather',
            icon: 'icon-trash2',
            color: 'success'
          })
        })
        this.getCurrencies()
    },
    setDefault(currency){
      axios.get('/currencies/activate/'+currency)
        .then(res => {
          if (res.data.res == true) {
            this.$vs.notify({
              title: 'Success',
              text: 'Currency default change',
              iconPack: 'feather',
              icon: 'icon-check',
              color: 'success'
            })
          } 
        })
      this.getCurrencies()
    }
  }
}
</script>

