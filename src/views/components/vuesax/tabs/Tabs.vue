<!-- =========================================================================================
    File Name: Tabs.vue
    Description: Tabs - Imports all page portions
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <div id="tabs-demo">
        <tabs-default></tabs-default>
        <tabs-color></tabs-color>
        <tabs-alignments></tabs-alignments>
        <tabs-position></tabs-position>
        <tabs-icons></tabs-icons>
    </div>
</template>

<script>
import TabsDefault from './TabsDefault.vue'
import TabsColor from './TabsColor.vue'
import TabsAlignments from './TabsAlignments.vue'
import TabsPosition from './TabsPosition.vue'
import TabsIcons from './TabsIcons.vue'

export default{
  components: {
    TabsDefault,
    TabsColor,
    TabsAlignments,
    TabsPosition,
    TabsIcons
  }
}
</script>
