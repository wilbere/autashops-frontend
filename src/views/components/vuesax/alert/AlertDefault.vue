<!-- =========================================================================================
    File Name: AlertDefault.vue
    Description: Rendering of default alert
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <vx-card title="Default" code-toggler>

        <p>To add a notification use the <code>vs-alert</code> component. For the main parameter, pass the active property that determines if the <code>alert</code> is visible or not</p>

        <vs-alert active="true" class="mt-5">
        Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.
        </vs-alert>

        <template slot="codeContainer">
&lt;vs-alert active=&quot;true&quot;&gt;
    Chupa chups topping bonbon. Jelly-o toffee I love. Sweet I love wafer I love wafer.
&lt;/vs-alert&gt;
        </template>

    </vx-card>
</template>
