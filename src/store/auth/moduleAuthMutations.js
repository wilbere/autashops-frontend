/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Autashops - POS, Inventory and eCommerce System
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/

import axios from '../../http/axios/index.js'
import Vue from 'vue'

export default {
  SET_BEARER (state, accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  },

  SET_USER (state, user) {
    state.currentUser = user
    state.isLogin = true
  },

  SET_ERRORS (state, errors){
    state.errors = errors
  }
}
