<!-- =========================================================================================
  File Name: ContextMenu.vue
  Description: Context menu Demo
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
========================================================================================== -->

<template>
  <div id="context-menu-demo">
    <context-menu-simple />
    <context-menu-click-not-close />
  </div>
</template>

<script>
import ContextMenuSimple from './ContextMenuSimple.vue'
import ContextMenuClickNotClose from './ContextMenuClickNotClose.vue'

export default{
  components: {
    ContextMenuSimple,
    ContextMenuClickNotClose
  }
}
</script>
