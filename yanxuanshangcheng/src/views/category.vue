<template >
    <div id="category">
      <!-- 搜索栏 -->
      <van-search v-model="searchData" input-align='center' placeholder="商品搜索共239款好物" />
        <!-- 侧边导航栏 -->
        <van-tree-select
      :items="items"
      :main-active-index.sync="activeIndex"
      height='calc(100vh - 104px)'
      @click-nav='changeRight'
      >
       <template #content>
         <img :src="bannerImg" width="100%" height="100px">
         <van-grid :column-num="3">
          <van-grid-item v-for="(item,index) in subCategoryList" :key=index :icon="item.banner_url" :text="item.front_name" :to="'/categoryList/'+item.id"/>
        </van-grid>
         </template>
      </van-tree-select>
        <!-- 菜单 -->
        <tab-btn></tab-btn>
    </div>
    
</template>
<script>
import axios from 'axios'
import tabBtn from '../components/tabBtn.vue'
export default {
    data(){
        return {
          data:{},
          searchData:null,
          activeIndex: 0,
        //  items: [{ text: '分组 1' }, { text: '分组 2' }],
        subCategoryList:'',
        bannerImg:null



        }
    },
  computed:{
    items:function(){
      if(this.data.categoryList==undefined)
      {
        return []
      }else{
      
      
        let arr = [];
        this.data.categoryList.forEach(function(item,index){
          item.text=item.name;
          arr.push(item)

        });
        return arr;
        }

    },
    
    // subCategoryList:function(){
    //   if(this.items.length!==0){
    //     let arr = this.items[this.activeIndex].subCategoryList
    //   return arr
    //   }else{
    //     return [];
    //   }

    // }
  },
  methods:{
    changeRight:function(index){
      console.log(index)

    }

  },
    watch:{
    activeIndex:async function(){
      if(this.items.length!==0){
        let id = this.items[this.activeIndex].id
        let res = await axios.get('http://127.0.0.1:8360/api/catalog',{params:{id}})
      this.subCategoryList = res.data.data.currentCategory.subCategoryList
      this.bannerImg = this.items[this.activeIndex].img_url
    }
    else{
      this.subCategoryList = []
    
    }
  }
  
    },
   async created(){
        let res = await axios.get('http://127.0.0.1:8360/api/catalog')
        this.data =res.data.data;
        this.subCategoryList = this.data.currentCategory.subCategoryList
        this.bannerImg = this.data.currentCategory.img_url

       console.log(res.data.data)
    },
  components: {
    tabBtn
  }
    
}
</script>
<style lang="less">

</style>