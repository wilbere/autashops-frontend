/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/


export default {
  ADD_EVENT (state, event) {
    state.events.push(event)
  },
  SET_EVENTS (state, events) {
    state.events = events
  },
  SET_LABELS (state, labels) {
    state.eventLabels = labels
  },
  UPDATE_EVENT (state, event) {
    const eventIndex = state.events.findIndex((e) => e.id === event.id)
    Object.assign(state.events[eventIndex], event)
  },
  REMOVE_EVENT (state, eventId) {
    const eventIndex = state.events.findIndex((e) => e.id === eventId)
    state.events.splice(eventIndex, 1)
  }
}
