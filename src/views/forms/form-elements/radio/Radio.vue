<!-- =========================================================================================
    File Name: Radio.vue
    Description: Radio Element - Imports all page portions.
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <div id="form-element-radio-demo">
        <radio-default></radio-default>
        <radio-color></radio-color>
    </div>
</template>

<script>
import RadioDefault from './RadioDefault.vue'
import RadioColor from './RadioColor.vue'

export default{
  components: {
    RadioDefault,
    RadioColor
  }
}
</script>
