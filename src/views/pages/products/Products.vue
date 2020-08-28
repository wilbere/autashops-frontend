<template lang="html">
  <div>
    <vs-table :data="products">

      <template slot="thead">
        <vs-th>Name</vs-th>
        <vs-th>Barcode</vs-th>
        <vs-th>Description</vs-th>
        <vs-th>Price</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.name">
            {{ tr.name }}
          </vs-td>
          <vs-td :data="tr.barcode">
            {{ tr.barcode }}
          </vs-td>
          <vs-td :data="tr.description">
            {{ tr.description }}
          </vs-td>
          <vs-td :data="tr.price">
            {{ tr.price }}
          </vs-td>

            <template class="expand-user" slot="expand">
              <div class="con-expand-users w-full">
                <div class="con-btns-user flex items-center justify-between">
                  <div class="con-userx flex items-center justify-start">
                    <!-- <vs-avatar :badge="tr.id" size="45px" :src="`https://randomuser.me/api/portraits/women/${indextr}.jpg`" /> -->
                    <span>{{ tr.name }}</span>
                  </div>
                  <div class="flex">
                    <vs-button type="border" size="small" icon-pack="feather" icon="icon-phone" class="mr-2"></vs-button>
                    <vs-button type="border" size="small" icon-pack="feather" icon="icon-send" color="success" class="mr-2"></vs-button>
                    <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" color="danger"></vs-button>
                  </div>
                </div>
                <vs-list>
                  <vs-list-item icon-pack="feather" icon="icon-mail" :title="tr.name"></vs-list-item>
                  <vs-list-item icon-pack="feather" icon="icon-globe" :title="tr.barcode"></vs-list-item>
                </vs-list>
              </div>
            </template>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import axios from '@/axios.js'

export default {
  data() {
    return {
      products: []
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts(){
      axios.get('/products')
        .then(res => {
          this.products = res.data.products
          console.log(this.products)
        })

    }
  }

}
</script>
