/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios'
import router from '../../router.js'
import * as Cookie from 'js-cookie'

export default {
  loginAttempt ({dispatch, commit}, payload) {


    axios.post('/login', payload.userDetails)
        .then((res) => {
          if (res.data.res === true) {

            commit('SET_BEARER', res.data.token)
            localStorage.setItem('accessToken', res.data.token)
            commit('SET_USER', res.data.user)
            Cookie.set('userInfo', res.data.user)
            Cookie.set('isLogin', true)
            if (payload.closeAnimation) payload.closeAnimation()

            payload.notify({
              title: 'Login Attempt',
              text: 'You are already logged in!',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'warning'
            })

            router.push('/admin/')

          } else {

            if (payload.closeAnimation) payload.closeAnimation()

            payload.notify({
              time: 2500,
              title: 'Error',
              text: res.data.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })

          }
        })

        .catch((err) => {
          if (payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            time: 3500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })

  },


  registerUser ({commit, dispatch, store}, payload) {

    // create user using axios
    console.log(payload)
    axios.post('/register', payload.userDetails)
      .then((res) => {

        if(res.data.res === true) {

          if(payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            title: 'Account Created',
            text: 'You are successfully registered!',
            iconPack: 'feather',
            icon: 'icon-check',
            color: 'success'
          })

          commit('SET_BEARER', res.data.token)
          commit('SET_USER', res.data.user)
          localStorage.setItem('accessToken', res.data.token)
          Cookie.set('userInfo',res.data.user)
          Cookie.set('isLogin', true )


          router.push('/admin/')

        } else {
          if(payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            title: 'Error',
            text: 'Ha ocurrido un error',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })

          console.log(res.data.errors)
          commit('SET_ERRORS', res.data.errors)

        }

      })

      .catch((err) => {


        payload.notify({
          time: 3500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
  },

  updateUsername ({ commit }, payload) {
    payload.user.updateProfile({
      displayName: payload.displayName
    }).then(() => {

      // If username update is success
      // update in localstorage
      const newUserData = Object.assign({}, payload.user.providerData[0])
      newUserData.displayName = payload.displayName
      commit('UPDATE_USER_INFO', newUserData, {root: true})

      // If reload is required to get fresh data after update
      // Reload current page
      if (payload.isReloadRequired) {
        router.push(router.currentRoute.query.to || '/')
      }
    }).catch((err) => {
      payload.notify({
        time: 8800,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })
    })
  },

  logout() {

    Cookie.remove('userInfo')
    Cookie.remove('isLogin')

    // location.href('/admin/login')
    router.push('/admin/login').catch(() => {})
    location.reload()

  }
}
