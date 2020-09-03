<template lang="html">
  <div class="centerx">
    <vs-popup  classContent="popup-example"  title="Confirmación" :active.sync="isModalActiveLocal">
      <h4 >
        ¿Estás seguro que quieres eliminar esta marca?
      </h4>
      <vs-button   class="mr-6 mt-5 float-right" color="danger" @click="deleteBrand(id)" >Borrar</vs-button>
      <vs-button   class="mr-6 mt-5 float-right" type="flat" color="danger" @click="closeModal" >Cancelar</vs-button>

    </vs-popup>
  </div>
</template>

<script>
import axios from '@/axios.js'

export default {
  props: {
    id: '',
    isModalActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isModalActiveLocal: {
      get () {
        return this.isModalActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeModal')
        }
      }
    },
  },
  data(){
    return {
    }
  },
  created() {
    // this.getUsers()
  },
  methods: {
    deleteBrand(id) {
      // console.log(id)
      axios.delete('/brands/'+id)
        .then(() => {
          this.$vs.notify({
            title: 'Aprobado!',
            text: 'Marca eliminada con éxito.',
            iconPack: 'feather',
            icon: 'icon-trash2',
            color: 'success'
          })
          this.$emit('success')
          this.$emit('closeModal')
        })
    },
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="stylus">
.popup-example
  .vs-input
    float left
    width 50%
    margin 10px
    margin-top 5px
  .con-select
    margin-left 10px
    width 100%
    margin-bottom 10px
</style>
