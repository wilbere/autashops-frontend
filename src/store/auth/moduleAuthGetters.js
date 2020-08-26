/*=========================================================================================
  File Name: moduleAuthGetters.js
  Description: Auth Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/


export default {

  currentUser: state => state.currentUser,
  processing: state => state.processing,
  loginError: state => state.loginError,
  registerError: state => state.registerError,
  forgotMailSuccess: state => state.forgotMailSuccess,
  resetPasswordSuccess:state => state.resetPasswordSuccess,
  accessToken:state => state.accessToken,
  isLogin:state => state.isLogin,
  errors:state => state.errors

}
