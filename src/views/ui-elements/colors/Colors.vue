<!-- =========================================================================================
    File Name: Colors.vue
    Description: Color Pallet - Imports all page portions
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <div id="colors-demo">
        <colors-default></colors-default>
        <colors-gradient></colors-gradient>
        <colors-customization></colors-customization>
        <colors-change-color></colors-change-color>
        <colors-change-color-SSR></colors-change-color-SSR>
        <colors-tailwind></colors-tailwind>
    </div>
</template>

<script>
import ColorsDefault from './ColorsDefault.vue'
import ColorsGradient from './ColorsGradient.vue'
import ColorsCustomization from './ColorsCustomization.vue'
import ColorsChangeColor from './ColorsChangeColor.vue'
import ColorsChangeColorSSR from './ColorsChangeColorSSR.vue'
import ColorsTailwind from './ColorsTailwind.vue'

export default{
  components: {
    ColorsDefault,
    ColorsGradient,
    ColorsCustomization,
    ColorsChangeColor,
    ColorsChangeColorSSR,
    ColorsTailwind
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/colors.scss";
</style>
