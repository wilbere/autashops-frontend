/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/

import * as Cookie from 'js-cookie'

export default {
  currentUser: Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo')) : null,
  loginError: null,
  registerError: null,
  processing: false,
  forgotMailSuccess:null,
  resetPasswordSuccess:null,
  accessToken: null,
  isLogin: Cookie.get('isLogin') ? Cookie.get('isLogin') : false,
  errors: null
}
