<template lang="html">
  <div class="centerx">
    <vs-button @click="popupActivo2=true" color="primary" type="filled">Open Popup</vs-button>
    <vs-popup classContent="popup-example"  title="Lorem ipsum dolor sit amet" :active.sync="popupActivo2">
      <vs-input class="inputx" placeholder="Placeholder" v-model="value1"/>
      <vs-input disabled class="inputx" placeholder="Disabled" v-model="value2"/>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input class="w-full" label-placeholder="First Name" v-model="input17" />
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input class="w-full" type="email" label-placeholder="Email" v-model="input18" />
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input class="w-full" label-placeholder="Mobile" v-model="input19" />
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-full">
          <vs-input class="w-full" type="password" label-placeholder="Password" v-model="input20" />
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

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      </p>
      <vs-select
      label="Figuras"
      v-model="select1"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="item,index in options1" />
      </vs-select>
      <vs-button @click="popupActivo3=true" color="primary" type="filled">Open Inner Popup</vs-button>
      <vs-popup title="Inner popup" :active.sync="popupActivo3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br><br>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <br><br>
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        </vs-popup>
    </vs-popup>
  </div>
</template>

<script>
export default {
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
      popupActivo2:false,
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
    width 50%
    margin-bottom 10px
</style>
