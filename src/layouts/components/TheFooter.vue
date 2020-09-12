<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
        <p>
          <span>COPYRIGHT &copy;</span>
          <span>{{ new Date().getFullYear() }} </span>
          <a href="http://autanashops.com/" target="_blank" rel="nofollow">AutanaShops</a>
          <span class="hidden sm:inline-block">, Todos los derechos reservados.</span>
        </p>
        <span class="md:flex hidden items-center">
            <span>Hecho a mano & con</span>
            <feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="ml-2 mr-2" />
            <span>
              por
              <a href="https://wilber.dev/" target="_blank" rel="nofollow">Wilbere</a>
            </span>
        </span>
    </footer>
</template>

<script>
export default {
    name: "the-footer",
    props: {
        classes: {
            type: String,
        }
    }
}
</script>
