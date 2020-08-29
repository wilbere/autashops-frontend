<!-- =========================================================================================
    File Name: Carousel3dCoverflowEffect.vue
    Description: Carousel with 3D Coverflow effect
    ----------------------------------------------------------------------------------------
    Item Name: Autanashops - POS Inventory with Ecommerce system
    Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
  <div class="swiper-inner">
      <!-- swiper -->
      <swiper :options="swiperOption" :dir="$vs.rtl ? 'rtl' : 'ltr'" :key="$vs.rtl">
          <swiper-slide v-for="(image, id) in images" :key="id">
            <img class="responsive" :src="image.url" alt="banner">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    images: {}
  },
  data () {
    return {
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }
</style>
