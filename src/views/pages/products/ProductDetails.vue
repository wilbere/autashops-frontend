<template lang="html">
  <div class="centerx ">
    <vs-button type="border" @click="popupProduct=true" size="small"  icon="visibility" class="mr-2"></vs-button>
    <vs-popup fullscreen class="item-detail-page" :title="'Product '+product.name" :active.sync="popupProduct">
      <vx-card v-if="product" no-shadow :key="product.id">


        <template slot="no-body">

          <div class="item-content">

            <!-- Item Main Info -->
            <div class="product-details p-6">
              <div class="vx-row mt-6">
                <div class="vx-col md:w-1/2 w-full flex items-center justify-center">
                  <div class="product-img-container w-full mx-auto mb-10 md:mb-0">
                    <carousel :images="product.images" />

                  </div>
                </div>

                <!-- Item Content -->
                <div class="vx-col md:w-1/2 w-full">

                  <h3>{{ product.name }}</h3>

                  <p class="my-2">
                    <span class="mr-2">by</span>
                    <span>{{ product.brand.name }}</span>
                  </p>
                  <p class="flex items-center flex-wrap">
                    <span class="text-2xl leading-none font-medium text-primary mr-4 mt-2">${{ product.price }}</span>
                    <!-- <span class="pl-4 mr-2 mt-2 border border-solid d-theme-border-grey-light border-t-0 border-b-0 border-r-0"><star-rating :show-rating="false" :rating="50" :star-size="20" read-only /></span> -->
                    <span class="cursor-pointer leading-none mt-2">424 ratings</span>
                  </p>

                  <vs-divider />

                  <p>{{ product.description }}</p>

                  <vs-list class="product-sales-meta-list px-0 pt-4">
                    <vs-list-item
                      class="p-0 border-none"
                      title="Free Sheeping"
                      icon-pack="feather"
                      icon="icon-truck" />
                    <vs-list-item
                      class="p-0 border-none"
                      title="EMI options available"
                      icon-pack="feather"
                      icon="icon-dollar-sign">
                    </vs-list-item>
                  </vs-list>

                  <vs-divider v-if="product.tags.length > 0" />

                  <div class="vx-row" v-if="product.tags.length > 0">
                    <div class="vx-col w-full">
                      <vs-list-item
                      class="p-0 border-none"
                      title="Tags"
                      icon-pack="feather"
                      icon="icon-tag" />

                      <div  class="demo- mt-2">
                        <vs-chip v-for="(tag, id) in product.tags" class="m-1" :key="id" type="flex">
                          <vs-avatar icon-pack="feather"  icon="icon-tag" />
                          <span>{{ tag.name.en }}</span>
                        </vs-chip>
                      </div>
                    </div>
                  </div>
                  <!-- Color -->
                  <!-- <div class="vx-row">
                    <div class="vx-col w-full">
                      <span class="text-xl font-medium">Color</span>
                      <div class="flex flex-wrap items-center mt-2">
                        <div
                          :class="{'border-transparent': opt_color != color}"
                          class="color-radio rounded-full mx-1 border-2 border-solid cursor-pointer relative"
                          :style="itemColor({color: color, style: ['borderColor']})"
                          v-for="color in available_item_colors"
                          :key="color"
                          @click="opt_color=color">
                            <div class="h-6 w-6 rounded-full absolute" :style="itemColor({color: color, style: ['backgroundColor']})"></div>
                          </div>
                      </div>
                    </div>
                  </div> -->
                  <!-- /Color -->

                  <vs-divider />

                  <!-- Quantity -->
                  <div class="vx-row">

                    <div class="vx-col w-full">
                      <div v-if="product.warehouse.length > 0">
                        <vs-table
                          max-items="4"
                          pagination
                          search
                          v-model="selected"
                          :data="product.warehouse">

                          <div slot="header">
                            <p class="my-2" >
                              <span>Available</span>
                              <span class="mx-2">-</span>
                              <span class="text-success">In Stock</span>
                            </p>
                          </div>
                          <template slot="thead">
                            <vs-th>
                              Warehouse
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

                              <vs-td :data="data[indextr].pivot.qty">
                                {{data[indextr].pivot.qty}}
                              </vs-td>
                            </vs-tr>
                          </template>
                        </vs-table>
                      </div>
                      <div v-else >
                        <vs-alert active="true">
                          There are no products in stock. Register your purchase.
                        </vs-alert>
                      </div>
                    </div>

                    <div class="vx-col w-full">
                      <div class="flex flex-wrap items-start mb-4">



                      </div>
                    </div>
                  </div>
                  <!-- /Quantity -->

                  <div class="vx-row">
                    <div class="vx-col flex flex-wrap items-center">
                      <vs-button class="mr-4" title="Register purchase of this product" type="border" icon-pack="feather" color="#1551b1" icon="icon-plus" radius></vs-button>
                      <vs-button class="mr-4" :disabled="!product.warehouse.length > 0" type="border" title="Transfer product to" color="#00aaff" icon="redo" radius></vs-button>
                      <vs-button class="mr-4" type="border" icon-pack="feather" :disabled="!product.warehouse.length > 0" color="#c4302b" icon="icon-trash" title="Delete product" radius></vs-button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <!-- Product Feature/Meta Row -->
            <!-- <div class="py-24 mb-16 mt-10 text-center item-features">
              <div class="vx-row">
                <div class="vx-col md:w-1/3 w-full">
                  <div class="w-64 mx-auto mb-16 md:mb-0">
                    <feather-icon icon="AwardIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                    <span class="font-semibold text-lg">100% Original</span>
                    <p class="mt-2">Chocolate bar candy canes ice cream toffee cookie halvah.</p>
                  </div>
                </div>
                <div class="vx-col md:w-1/3 w-full">
                  <div class="w-64 mx-auto mb-16 md:mb-0">
                    <feather-icon icon="ClockIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                    <span class="font-semibold text-lg">10 Day Replacement</span>
                    <p class="mt-2">Marshmallow biscuit donut dragée fruitcake wafer.</p>
                  </div>
                </div>
                <div class="vx-col md:w-1/3 w-full">
                  <div class="w-64 mx-auto">
                    <feather-icon icon="ShieldIcon" svgClasses="h-12 w-12 text-primary stroke-current" class="block mb-4" />
                    <span class="font-semibold text-lg">1 Year Warranty</span>
                    <p class="mt-2">Cotton candy gingerbread cake I love sugar sweet.</p>
                  </div>
                </div>
              </div>
            </div> -->

          </div>

        </template>
      </vx-card>
    </vs-popup>
  </div>
</template>

<script>
import Carousel from '@/views/components/extra-components/carousel/Carousel3dCoverflowEffect.vue'

export default {
  components: {
    Carousel
  },
  props: {
    product: {}
  },
  data(){
    return {
      popupProduct:false,
      selected: []
    }
  }
}
</script>
