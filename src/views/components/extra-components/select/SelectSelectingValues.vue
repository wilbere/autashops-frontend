<!-- =========================================================================================
    File Name: SelectselectingValues.vue
    Description: Selecting value in select component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <vx-card title="Selecting Values">

        <!-- <p>vue-select accepts arrays of strings or objects to use as options through the <code>options</code> prop</p> -->
        <div>
            <selecting-values-default></selecting-values-default>
            <selecting-values-single-multiple-selection></selecting-values-single-multiple-selection>
            <selecting-values-tagging></selecting-values-tagging>
        </div>
    </vx-card>
</template>

<script>
import SelectingValuesDefault from './selecting-values/SelectingValuesDefault.vue'
import SelectingValuesSingleMultipleSelection from './selecting-values/SelectingValuesSingleMultipleSelection.vue'
import SelectingValuesTagging from './selecting-values/SelectingValuesTagging.vue'

export default {
  components: {
    SelectingValuesDefault,
    SelectingValuesSingleMultipleSelection,
    SelectingValuesTagging
  }
}
</script>
