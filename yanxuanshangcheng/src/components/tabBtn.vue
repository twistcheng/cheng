<template>
<!-- 导航栏组件 -->
    <van-tabbar v-model="tabActive">
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="search"  to="search">搜索</van-tabbar-item>
  <van-tabbar-item icon="qr" to="/category">分页</van-tabbar-item>
  <van-tabbar-item icon="cart-circle-o" to="/buycart">购物车</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="me">我的</van-tabbar-item>
</van-tabbar>
</template>
<script>
export default {
    data(){
        return {
            tabActive:0
        }
    },
 mounted(){
     switch(this.$route.path){
                case "/category":
                this.tabActive =2;
                break;
                case "/":
                this.tabActive =0;
                break;
                case "/buycart":
                this.tabActive =3;
                break;
                 case "/search":
                this.tabActive =1;
                break;
                 case "/me":
                this.tabActive =4;
                break;
                default:
                this.tabActive =0;
            }

 }
    
     
    
    
    
}
</script>