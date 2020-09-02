<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Autashops - POS, Inventory and eCommerce System
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} BRAND</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <div class="p-6">

        <!-- Product Image -->
        <!-- <template v-if="data.image">

          <!- Image Container -->
          <!-- <div class="img-container w-64 mx-auto flex items-center justify-center">
            <img :src="data.image.url" alt="img" class="responsive">
          </div> -->

          <!-- Image upload Buttons
          <div class="modify-img flex justify-between mt-5">
            <input type="file" class="hidden" name="image" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
            <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button>
            <vs-button type="flat" color="#999" @click="data.image = null">Remove Image</vs-button>
          </div>
        </template> -->

        <!-- ACCOUNT NO. -->
        <vs-input label="Account No." v-model="data.account_no" class="mt-5 w-full" name="account_no" v-validate="'required|digits:20'" />
        <span class="text-danger text-sm" v-show="errors.has('account_no')">{{ errors.first('account_no') }}</span>

        <!-- NAME -->
        <vs-input label="Name" v-model="data.name" class="mt-5 w-full" name="item-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('item-name')">{{ errors.first('item-name') }}</span>

        <!-- BALANCE -->
        <vs-input label="Balance" v-model="data.balance" class="mt-5 w-full" name="balance" v-validate="'required|decimal:2'" />
        <span class="text-danger text-sm" v-show="errors.has('balance')">{{ errors.first('balance') }}</span>

        <!-- NOTE -->
        <vs-textarea name="note" class="mt-5 w-full"  label="Note"  v-model="data.note" />
        <span class="text-danger text-sm" v-show="errors.has('note')">{{ errors.first('note') }}</span>

        <div class="vx-row mt-5 mb-5">
          <div class="vx-col w-full">
            <vs-checkbox class="ml-3"  v-model="data.default">Default</vs-checkbox>
          </div>
        </div>

        <!-- Upload -->
        <!-- <vs-upload text="Upload Image" class="img-upload" ref="fileUpload" /> -->

        <!-- <div class="upload-img mt-5" v-if="!data.image">
          <input type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" accept="image/*">
          <vs-button @click="$refs.uploadImgInput.click()">Upload Image</vs-button>
        </div> -->
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import axios from '@/axios.js'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {},
  },
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {

      id: null,
      name: '',
      account_no: '',
      balance: '',
      default: false,
      note: '',

      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        // const {id, image, name } = JSON.parse(JSON.stringify(this.data))
        this.id = this.data.id
        // this.image = this.data.image.url
        this.name = this.data.name
        this.account_no = this.data.account_no
        this.balance = this.data.balance
        this.default = this.data.default
        this.note = this.data.note
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.id, this.name, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      return !this.errors.any() && this.data.name != ''
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.id = null
      this.name = ''
      this.account_no = ''
      this.balance = ''
      this.default = false
      this.note = ''
      // this.image = null
    },
    // uploadImgInput(){
    //   this.updateCurrImg()
    // },
    // updateImgInput(){
    //   alert('subiendo imagen')
    // },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          let score = {
            id: this.data.id,
            account_no: this.data.account_no,
            name: this.data.name,
            balance: this.data.balance,
            default: this.data.default,
            note: this.data.note,
          }
          if (this.data.id !== null && this.data.id >= 0) {
            axios.put('/scores/'+this.data.id, score)
              .then(res => {
                if (res.data.res) {
                  this.$vs.notify({
                    title: 'Update Success',
                    text: 'You are successfully updated!',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                  })
                  this.$emit('successUpdate')
                  this.$emit('closeSidebar')
                  this.initValues()
                } else {
                  this.$vs.notify({
                    title: 'Update Error',
                    text: res.data.error,
                    iconPack: 'feather',
                    icon: 'icon-alert',
                    color: 'danger'
                  })
                }
              })
          } else {
            axios.post('/scores/', score)
              .then(res => {
                if (res.data.res) {
                  this.$vs.notify({
                    title: 'Created Success',
                    text: 'You are successfully created!',
                    iconPack: 'feather',
                    icon: 'icon-check',
                    color: 'success'
                  })
                  this.$emit('successUpdate')
                  this.$emit('closeSidebar')
                  this.initValues()
                } else {
                  this.$vs.notify({
                    title: 'Error',
                    text: res.data.errors,
                    iconPack: 'feather',
                    icon: 'icon-alert',
                    color: 'danger'
                  })
                }
              })
          }


        }
      })
    },
    // updateCurrImg (input) {
    //   if (input.target.files && input.target.files[0]) {
    //     const reader = new FileReader()
    //     reader.onload = e => {
    //       this.image = input.target.files[0]
    //       this.data.image.url = e.target.result
    //     }
    //     reader.readAsDataURL(input.target.files[0])
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
