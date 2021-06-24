import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartTotal:{
      checkedGoodsAmount: 0,
      checkedGoodsCount: 0,
      goodsAmount: 0,
      goodsCount:0,
     },
     cartList:[],
  },
  mutations: {
    setCartList:function(state,cartList){
      state.cartList = cartList;
      
    },
    Setcartotal:function(state,cartTotal){
      state.cartTotal = cartTotal;
     

    }
  },
  actions: {
   
       
       
        
       
    
  },
  modules: {
  }
})
