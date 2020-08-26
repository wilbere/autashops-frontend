/*=========================================================================================
  File Name: moduleChat.js
  Description: Chat Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/


import state from './moduleChatState.js'
import mutations from './moduleChatMutations.js'
import actions from './moduleChatActions.js'
import getters from './moduleChatGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
