<!-- =========================================================================================
    File Name: Tooltip.vue
    Description: Tooltip - Imports all page portions
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <div id="tooltip-demo">
        <tooltip-default></tooltip-default>
        <tooltip-position></tooltip-position>
        <tooltip-delay></tooltip-delay>
        <tooltip-color></tooltip-color>
        <tooltip-title></tooltip-title>
    </div>
</template>

<script>
import TooltipDefault from './TooltipDefault.vue'
import TooltipPosition from './TooltipPosition.vue'
import TooltipDelay from './TooltipDelay.vue'
import TooltipColor from './TooltipColor.vue'
import TooltipTitle from './TooltipTitle.vue'

export default{
  components: {
    TooltipDefault,
    TooltipPosition,
    TooltipDelay,
    TooltipTitle,
    TooltipColor
  }
}
</script>
