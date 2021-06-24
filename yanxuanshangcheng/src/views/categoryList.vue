<template>
    <div id="categoryList">
        
        <h1>产品列表</h1>
            <van-tabs v-model="tabActive">
            <van-tab v-for="(item,index) in clist" :key="index" :title="item.name">
                <H3>{{item.front_desc}}</H3>
                <P>{{item.front_name}}</P>
                
                <div v-if="item.plist">
                <van-grid :border="true" :column-num="2">
                   
                <van-grid-item v-for="(item1,index1) in item.plist.data"  :to="/product/+item1.id" :key="index1" >
                    
                     <van-image :src="item1.list_pic_url"  width="50%"/>
                     <h5>{{item1.name}}</h5>
                     <p style="color:red">${{item1.retail_price}}</p>
                
                </van-grid-item>
                   
                </van-grid>
                 </div>
                </van-tab>
                 
            
            </van-tabs>
           
    </div>
</template>
<script>
import axios from 'axios'
export default {
    
    props:['id'],
    data(){
        return{

            tabActive:0,
            data:{},
            clist:[],
            
        }
    },
   async created(){
        //console.log(this.id)
       let res =  await axios.get('http://127.0.0.1:8360/api/goods/category',{params:{id:this.id}})
        console.log(res)
        this.clist = res.data.data.brotherCategory
        // let id =   this.clist[0].id;
         // this.getlist(id,1)
      this.clist.forEach(async(item,index) => {
           item.plist =  await this.getlist(item.id,1)
           console.log(item)
           
        
          
      });
},
//  watch:{
//     tabActive: async function(index){
//       //  console.log(index)
//         let id =   this.clist[index].id
//         let page = 1;
//         let size = 20;
//         console.log(id)
//         this.getlist(id,page)
//         let res = await axios.get('http://127.0.0.1:8360/api/goods/list?categoryId=${id}&page=${page}&size=20')
        
//         console.log(this.categorylist)


//     }

// },
methods:{
  async  getlist(cid,page){
      let res = await axios.get(`http://127.0.0.1:8360/api/goods/list?categoryId=${cid}&page=${page}&size=20`)

return res.data.data
    }
}
}
</script>