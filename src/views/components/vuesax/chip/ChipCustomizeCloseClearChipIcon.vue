<!-- =========================================================================================
    File Name: ChipCustomizeCloseClearChipIcon.vue
    Description: Change icon used for close and clear button
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <vx-card title="Customize Close and Clear Chips Icons" code-toggler>

        <p>You can change the icons used for the close button and the clear button when using multiple chips with the <code>vs-chips</code> component.</p>
        <p>For the main parameter, pass the <code>close-icon</code> property, which is the close icon that appears on each chip. You can change the Clear Chips button with the <code>remove-icon</code> property</p>

        <vs-alert color="primary" icon="new_releases" active="true" class="mt-5">
            <p>Vuesax uses the Google Material Icons font library by default. For a list of all available icons, visit the official <a href="https://material.io/icons/" target="_blank">Material Icons page</a>.</p>
            <p>FontAwesome and other fonts library are supported. Simply use the icon-pack with fa or fas. You still need to include the Font Awesome icons in your project.</p>
        </vs-alert>

        <div class="mt-5">

            <div class="op-block mb-5"> {{ chips }} </div>
            <vs-chips color="rgb(145, 32, 159)" placeholder="New Element" v-model="chips" icon-pack="feather" remove-icon="icon-trash-2">
                <vs-chip
                    :key="`${chip}-${index}`"
                    @click="remove(chip)"
                    v-for="(chip, index) in chips"
                    closable
                    icon-pack="feather"
                    close-icon="icon-trash-2">
                    {{ chip }}
                </vs-chip>
            </vs-chips>

        </div>

        <template slot="codeContainer">
&lt;template&gt;
  &lt;div class=&quot;op-block mb-4&quot;&gt; {{ "\{\{ chips \}\}" }} &lt;/div&gt;
  &lt;vs-chips color=&quot;rgb(145, 32, 159)&quot; placeholder=&quot;New Element&quot; v-model=&quot;chips&quot; icon-pack=&quot;feather&quot; remove-icon=&quot;icon-trash-2&quot;&gt;
    &lt;vs-chip
      :key=&quot;chip&quot;
      @click=&quot;remove(chip)&quot;
      v-for=&quot;chip in chips&quot;
      closable
      icon-pack=&quot;feather&quot;
      close-icon=&quot;icon-trash-2&quot;&gt;
      {{ "\{\{ chip \}\}" }}
    &lt;/vs-chip&gt;
  &lt;/vs-chips&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data(){
    return {
      chips:[
        &apos;Dribbble&apos;,
        &apos;GitHub&apos;,
        &apos;Behance&apos;,
        &apos;Vuejs&apos;,
        &apos;Vuexy&apos;,
      ],
    }
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
    }
  }
}
&lt;/script&gt;
        </template>

    </vx-card>
</template>

<script>
export default {
  data () {
    return {
      chips: [
        'Dribbble',
        'GitHub',
        'Behance',
        'Vuejs',
        'Vuexy'
      ]
    }
  },
  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
    }
  }
}
</script>
