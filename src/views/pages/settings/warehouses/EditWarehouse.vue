<template lang="html">
  <div class="centerx">
    <vs-button color="success" vs-type="border" @click="editWarehouse=true" size="small" icon="edit"></vs-button>
    <vs-popup classContent="popup-example"  title="Edit Warehouse" :active.sync="editWarehouse">
      <div class="vx-row mb-3">
        <div class="vx-col w-full">
          <vs-select
            label="Figuras"
            v-model="select1"
            >
              <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options1" />
            </vs-select>
        </div>
      </div>
      <div class="vx-row mb-3">
        <div class="vx-col w-full">
          <vs-input class="w-full" label-placeholder="Name" v-model="warehouse.name" />
        </div>
      </div>
      <div class="vx-row mb-3">
        <div class="vx-col w-full">
          <vs-input class="w-full" type="email" label-placeholder="Email" v-model="warehouse.email" />
        </div>
      </div>
      <div class="vx-row mb-3">
        <div class="vx-col w-full">
          <vs-input class="w-full" label-placeholder="Phone" v-model="warehouse.phone" />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <vs-input class="w-full" label-placeholder="Address" v-model="warehouse.address" />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <vs-checkbox class="inline-flex" v-model="check5">Remember Me</vs-checkbox>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-button class="mr-3 mb-2">Submit</vs-button>
          <vs-button color="warning" type="border" class="mb-2" @click="input17 = input18 = input19 = input20 = ''; check5 = false;">Cancle</vs-button>
        </div>
      </div>


    </vs-popup>
  </div>
</template>

<script>
export default {
  props: {
    warehouse:{}
  },
  data(){
    return {
      select1:3,
      options1:[
        {text:'IT',value:0},
        {text:'Blade Runner',value:2},
        {text:'Thor Ragnarok',value:3},
      ],
      value1:'',
      value2:'',
      editWarehouse:false,
      popupActivo3:false
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
