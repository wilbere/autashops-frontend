/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/


export default {
  SET_USERS (state, users) {
    state.users = users
  },
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.users.findIndex((u) => u.id === itemId)
    state.users.splice(userIndex, 1)
  }
}
