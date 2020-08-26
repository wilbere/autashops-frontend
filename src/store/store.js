/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

import moduleAuth from './auth/moduleAuth.js'
import moduleUser from './user-management/moduleUserManagement.js'

const dataState = createPersistedState({
  paths: ['currentUser']
})

Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
      auth: moduleAuth,
      user: moduleUser
    },
    plugins : [dataState],
    strict: process.env.NODE_ENV !== 'production'
})
