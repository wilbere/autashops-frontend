<!-- =========================================================================================
    File Name: Clipboard.vue
    Description: Clipboard demo
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <div id="page-clipboard-demo">
        <clipboard-directive></clipboard-directive>
        <clipboard-without-directive></clipboard-without-directive>
    </div>
</template>

<script>
import ClipboardDirective from './ClipboardDirective.vue'
import ClipboardWithoutDirective from './ClipboardWithoutDirective.vue'

export default{
  components: {
    ClipboardDirective,
    ClipboardWithoutDirective
  }
}
</script>
