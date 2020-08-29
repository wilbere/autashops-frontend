<template lang="html">
  <div>
    <vs-table :data="products">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">
          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="newProduct">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

      </div>

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
            <div class="con-expand-users">
              <div class="con-btns-user flex items-center justify-between">
                <div class="con-userx flex items-center justify-start">
                  <ul class="users-liked user-list">
                    <li v-if="tr.images.length > 0" v-for="(image, id) in tr.images" :key="id">
                        <vx-tooltip :text="tr.name" position="bottom">
                            <vs-avatar :src="image.url" size="80px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                        </vx-tooltip>
                    </li>
                  </ul>
                </div>
                <div class="flex">
                  <product-details :product="tr"></product-details>
                  <vs-button type="border" size="small" icon-pack="feather" icon="icon-edit" color="success" class="mr-2"></vs-button>
                  <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" color="danger"></vs-button>
                </div>
              </div>
              <div v-if="tr.tags.length > 0" class="demo-alignment">
                <vs-chip v-for="(tag, id) in tr.tags" class="m-0" :key="id" type="flex">
                  <vs-avatar icon-pack="feather"  icon="icon-tag" />
                  <span>{{ tag.name.en }}</span>
                </vs-chip>
              </div>

              <vs-list>
                <vs-list-item icon-pack="feather" icon="icon-package" :title="tr.name">
                  <div v-if="tr.warehouse.length > 0" class="demo-alignment">
                    <vs-chip  type="flex" color="success">In Stock</vs-chip>
                  </div>
                </vs-list-item>
                <vs-list-item icon-pack="feather" icon="icon-info" title="Barcode" :subtitle="tr.barcode"></vs-list-item>
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
import ProductDetails from './ProductDetails.vue'

export default {
  components : {
    ProductDetails
  },
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

    },
    newProduct(){
      console.log('newProduct()')
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
