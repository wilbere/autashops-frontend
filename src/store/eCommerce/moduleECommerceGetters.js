/*=========================================================================================
  File Name: moduleEcommerceGetters.js
  Description: Ecommerce Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Wilber Galindez
  Author URL: https://www.wilber.dev/
==========================================================================================*/


export default {
  isInCart: state => itemId => {
    return state.cartItems.some((item) => item.objectID === itemId)
  },
  isInWishList: state => itemId => {
    return state.wishList.some((item) => item.objectID === itemId)
  },
  getCartItem: state => itemId => {
    const result = state.cartItems.filter((item) => item.objectID === itemId)
    return result.length ? result.pop() : []
  }
}
