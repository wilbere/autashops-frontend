<!-- =========================================================================================
    File Name: BreadcrumbSeparator.vue
    Description: Change separator using separator directive
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <vx-card title="Separator" code-toggler>

        <p>You can change the separator dividing the links by either passing a string to the <code>separator</code> directive like so "<strong>•</strong>", "<strong>-</strong>", "<strong>|</strong>" etc..., or by passing in one of the material icons text "<strong>chevron_right</strong>"</p>

        <vs-alert icon="warning" active="true" color="warning" class="mt-5">
            <span>In order to differeciate a custom separator "<strong>•</strong>" from an icon "<strong>chevron_right</strong>", we verify the string length. If the length is <strong>greater than 1</strong> it will be considered a material icon.</span>
        </vs-alert><br>

        <div>

            <vs-breadcrumb :items="items" separator="•"></vs-breadcrumb>
            <vs-breadcrumb :items="items" separator="-"></vs-breadcrumb>
            <vs-breadcrumb :items="items" separator="|"></vs-breadcrumb>
            <vs-breadcrumb :items="items" :separator="$vs.rtl ? 'chevron_left' : 'chevron_right'"></vs-breadcrumb>

        </div>

        <template slot="codeContainer">
&lt;vs-breadcrumb :items=&quot;[{...}, {...}]&quot; separator=&quot;&bull;&quot;&gt;&lt;/vs-breadcrumb&gt;
&lt;vs-breadcrumb :items=&quot;[{...}, {...}]&quot; separator=&quot;-&quot;&gt;&lt;/vs-breadcrumb&gt;
&lt;vs-breadcrumb :items=&quot;[{...}, {...}]&quot; separator=&quot;|&quot;&gt;&lt;/vs-breadcrumb&gt;
&lt;vs-breadcrumb :items=&quot;[{...}, {...}]&quot; :separator=&quot;$vs.rtl ? 'chevron_left' : 'chevron_right'&quot;&lt;/vs-breadcrumb&gt;
        </template>

    </vx-card>
</template>

<script>
export default {
  data: () => ({
    colorx:'#3DC9B3',
    items:[
      {
        title: 'Dashboard',
        url: '/'
      },
      {
        title: 'Link 1',
        url: '/blog'
      },
      {
        title: 'Link 2',
        disabled: true
      },
      {
        title: 'Active',
        active: true
      }
    ]
  })
}
</script>
