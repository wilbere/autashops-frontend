<!-- =========================================================================================
    File Name: DatePickerInline.vue
    Description: Create inline datepicker
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <vx-card title="Inline" code-toggler>
        <p>Create inline datepicker using <code>inline</code> prop</p>

        <div class="mt-5">
            <datepicker :inline="true"></datepicker>
        </div>

        <template slot="codeContainer">
&lt;template&gt;
  &lt;datepicker :inline=&quot;true&quot;&gt;&lt;/datepicker&gt;
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
