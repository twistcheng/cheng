<template>
    <div id="buycart">
         <van-nav-bar
            title="购物车"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            
            />
        <!-- 中部提示 -->
            <div class=info>
                <span>30天无忧退货</span>
                <span>48小时快速退款</span>
                <span>满88元免邮费</span>
            </div>
            <!-- 已购商品 -->
            <div class="list">
                <div class="cartitem" v-for="(item,index) in cartList" :key="index" >
                    <van-checkbox @change="checkevent($event,item)" v-model="item.checked"></van-checkbox>
                    <van-image
                    width="70"
                    height="70"
                    :src="item.list_pic_url"
                    />
                    <div class="productbrief">
                        <div class="title">
                            <span>{{item.goods_name}}</span>
                            <span>*{{item.number}}</span>
                            </div>

                        <p class=brief>{{item.goods_specifition_name_value}}</p>
                        <p class="price">${{item.retail_price}}</p>
                    </div>
                </div>
                
            </div>
            <!-- 提交订单 -->
            <van-submit-bar :price="cartTotal.checkedGoodsAmount" button-text="提交订单" @submit="onSubmit">
                <van-checkbox v-model="checkedAll">全选</van-checkbox>
                
                </van-submit-bar>
    </div>
    
</template>

<script>
import axios from 'axios'
import{mapState} from 'vuex'
let mapstateobj = mapState(['cartTotal','cartList'])
export default {
    data(){
return{
    checked:true
}
    },
    computed:{
        ...mapstateobj,
        checkedAll:{
            set(val){
                console.log('设置全选')
            },
            get(){
                if(this.cartTotal.goodsCount==this.cartTotal.checkedGoodsCount)
                {
                    return true;
                }else{
                    return false
                }
            }
        }

    },
    methods:{
        
        onClickLeft:function() {
      this.$router.go(-1)
    },
    
        onSubmit:function(){

        },
     checkevent: async function(event,item){
         console.log(event)
         console.log(item)

       let res = await axios.post('http://127.0.0.1:8360/api/cart/checked',{ 
            isChecked:Number(event),
            productIds:item.product_id
        })
        console.log(res)
        let data = res.data.data;
        this.$store.commit('setCartList',data.cartList)
        this.$store.commit('Setcartotal',data.cartTotal)

        }
    },
  async  created(){
      
       let res = await axios.post('http://127.0.0.1:8360/api/cart/add',{
            goodsId:1181000,
            number:1,
            productId:1,
        })
        console.log(res)
        let data = res.data.data;
        this.$store.commit('setCartList',data.cartList)
        this.$store.commit('Setcartotal',data.cartTotal)
        
    },
    mounted(){
        
    },
    


}
</script>

<style lang="less">
#buycart{
    .info{
    display: flex;
    justify-content:space-around;
    font-size:12px;
    color: #999;
    height: 20px;
    background: white;
    span{
         position: relative;
    }
    span::before{
        content:"";
        display: block;
        position: absolute;
        left: -10px;
        top:5px;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        border:1px solid red;
    }
    }
            .cartitem{
            display: flex;
            align-items: center;
            padding: 10px 5px;
             .van-image{
                 background: #efefef;
             }
             .productbrief{
                 flex: 1;
                 display: flex;
                 flex-direction: column;
                 justify-content: space-around;
                 align-items: flex-start;
                 .title{
                     
                     display: flex;
                     justify-content: space-between;
                 }
             }
                
            

        }
}

</style>