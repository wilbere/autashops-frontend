<template>
  <vx-card no-shadow class="mt-5">
    <vs-tabs alignment="fixed">
      <vs-tab label="Persona Natural">
        <div>
          <form-client :client="null"></form-client>
        </div>
      </vs-tab>
      <vs-tab label="Persona Jurídica">
        <div>
          <form-client :client="null" juridical ></form-client>
        </div>
      </vs-tab>
    </vs-tabs>
  </vx-card>
</template>

<script>
import FormClient from './FormClient.vue'

export default {
  components :{
    FormClient
  }
}
</script>
