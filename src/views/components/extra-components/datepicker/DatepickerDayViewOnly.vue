<!-- =========================================================================================
    File Name: DatepickerDayViewOnly.vue
    Description: Create datepicker with only day view
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <vx-card title="Day View Only" code-toggler>
        <p>Rendering default DatePicker with Day view only</p>

        <div class="mt-5">
            <datepicker :minimumView="'day'" :maximumView="'day'"></datepicker>
        </div>

        <template slot="codeContainer">
&lt;template&gt;
  &lt;datepicker :minimumView=&quot;'day'&quot; :maximumView=&quot;'day'&quot;&gt;&lt;/datepicker&gt;
&lt;/template&gt;

&lt;script&gt;
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker
  }
}
&lt;/script&gt;
        </template>
    </vx-card>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  }
}
</script>
