<template>
  <div id="home" class="home">
   
    <van-search v-model="searchData" input-align='center' placeholder="商品搜索共239款好物" />
    
    <van-swipe :autoplay="3000" :width="365" :height="200">
  <van-swipe-item v-for="(image, index) in images" :key="index">
    <img class="lunbo" v-lazy="image.image_url" />
  </van-swipe-item>
  
</van-swipe>
<!-- 5个图标 -->
<van-grid :column-num='5'>
  <van-grid-item v-for="(item,index) in channel"  :key="index"   icon="photo-o" :text="item.name" />

</van-grid>
<!-- 面板 -->
<div classs="brandList">
<van-panel title="品牌制造商直供"  >
  <van-grid  :column-num="2">
    <van-grid-item v-for="(item,index) in brandList" :key="index" >
    <van-image :src="item.new_pic_url"   fit="contain"/>
     <h4 class="title">{{item.name}}</h4>
    <p class="price">{{item.floor_price}}起</p>

    </van-grid-item>
    
    </van-grid>
</van-panel>
</div>
<!-- 新品首发 -->
<div classs="newGoodsList">
<van-panel title="新品首发"  >
  <van-grid  :column-num="2">
    <van-grid-item v-for="(item,index) in newGoodsList" :key="index" >
    <van-image :src="item.list_pic_url"   fit="contain"/>
     <h4 >{{item.name}}</h4>
   

    </van-grid-item>
    
    </van-grid>
</van-panel>
</div>
<!-- 人气面板 -->
<div classs="hotGoodsList">
<van-panel title="人气推荐"  >
  <van-card
  
  :price="item.retail_price"
  :desc="item.goods_brief"
  :title="item.name"
  
  :thumb="item.list_pic_url"
v-for="(item,index) in hotGoodsList" :key="index"/>
</van-panel>
</div>
<!-- 导航栏 -->
<tab-btn></tab-btn>
<div style="height: 5rem;"></div>

     
  </div>
  
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import tabBtn from '@/components/tabBtn'




export default {
  name: 'Home',
  data:function(){
    return {
      searchData:'',
      
      data:{},
      active:""
      

    }
  },
  computed:{
    images:function(){
      if(typeof this.data.banner=='object'){
        return this.data.banner
      }else{
        return []
      }
    },
    channel:function(){
      if(typeof this.data.channel=='object'){
        return this.data.channel
      }else{
        return []
      }
      

    },
    brandList:function(){
      if(typeof this.data.brandList=='object'){
        return this.data.brandList
      }else{
        return []
      }
      

    },
    newGoodsList:function(){
      if(typeof this.data.newGoodsList=='object'){
        return this.data.newGoodsList
      }else{
        return []
      }
      

    },
    hotGoodsList:function(){
      if(typeof this.data.hotGoodsList=='object'){
        return this.data.hotGoodsList
      }else{
        return []
      }
      

    }
    
  },
  components: {
    tabBtn
  },
  async mounted(){
    let res = await axios.get('http://127.0.0.1:8360/api/index/index')
    this.data =res.data.data;
    console.log(res.data)

    
  }
}
</script>
<style lang="less">
#home{

  .lunbo {
   
    height:200px;

  }
  

.title{
    position: absolute;
    top:20px;
    left: 10px;

  }

  .price{
    position: absolute;
    top:40px;
    left: 10px;


}

}



</style>
