<template>
    <div id="product">
        <!-- 头部 -->
                <van-nav-bar
            title="商品"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            
            />
            <!-- 轮播图 -->
                        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img class="swipeimg" v-lazy="image.img_url" />
            </van-swipe-item>
            </van-swipe>
            <!-- 中部提示 -->
            <div class=info>
                <span>30天无忧退货</span>
                <span>48小时快速退款</span>
                <span>满88元免邮费</span>
            </div>
            <div class="proinfo">
                <h3 class="title">{{info.name}}</h3>
                <p class="brief">{{info.goods_brief}}</p>
                <p class="price">${{info.retail_price}}</p>
            </div>
            <!-- 选择栏 -->
            <van-cell title="请选择规格数量" is-link />
           <!-- 商品参数 -->
           <div class=propa>
               <h3>商品参数</h3>
               <div class="proitem" v-for="(item1,index1) in attribute" :key="index1">
               <span class="title">{{item1.name}}</span>
               <span clas="value">{{item1.value}}</span>
               
                </div>
           </div>
           <!-- 商品详情 -->
           <div class="prode" v-html="info.goods_desc" >
               <div style="height: 5rem;"></div>
               
               
              </div>
              <!-- 套件 -->
              <van-goods-action>
                
                <van-goods-action-icon to="/buycart" icon="cart-o" :info="$store.state.cartTotal.goodsCount==0?'':$store.state.cartTotal.goodsCount" text="购物车" />
                <van-goods-action-icon icon="star" text="已收藏"  />
                <van-goods-action-button @click="choosesku" type="warning" text="加入购物车" />
                <van-goods-action-button type="danger" text="立即购买" />
                </van-goods-action>
                    <!-- 商品规格 -->
                    <van-sku
                    v-model="show"
                    :sku="sku"
                    :goods="goods"
                    
                    
                    
                    
                    
                    @buy-clicked="onBuyClicked"
                    @add-cart="onAddCartClicked"
                    
                    />
                    
    </div>
</template>




<script>
import axios from 'axios'

export default {
    props:['id'],
    data(){
        return {

            data:{},
            info:{},
            attribute:[],
            show:false,
                                                sku: {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                        k: '颜色', // skuKeyName：规格类目名称
                        k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        v: [
                            {
                            id: '1', // skuValueId：规格值 id
                            name: '红色', // skuValueName：规格值名称
                            
                            },
                            {
                            id: '1',
                            name: '蓝色',
                            
                            }
                        ],
                        largeImageMode: true, //  是否展示大图模式
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                        id: 2259, // skuId
                        's-1': '2', // 规格类目 k_s 为 s1 的对应规格值 id
                        's-2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 10000, // 价格（单位分）
                        stock_num: 100000 // 当前 sku 组合对应的库存
                        }, {
                        id: 2259, // skuId
                        's-1': '1', // 规格类目 k_s 为 s1 的对应z规格值 id
                        's-2': '4', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 12000, // 价格（单位分）
                        stock_num: 110000000000 // 当前 sku 组合对应的库存
                        },
                        {
                        id: 2259, // skuId
                        's-1': '1', // 规格类目 k_s 为 s1 的对应z规格值 id
                        's-2': '3', // 规格类目 k_s 为 s2 的对应规格值 id
                        price: 12000, // 价格（单位分）
                        stock_num: 110 // 当前 sku 组合对应的库存
                        }
                    ],
                    price: '100.00', // 默认价格（单位元）
                    stock_num: 2000, // 商品总库存
                    collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                    none_sku: false, // 是否无规格商品
                  
                    hide_stock: false // 是否隐藏剩余库存
                    },
                    goods: {
            // 默认商品 sku 缩略图
            picture: 'https://img01.yzcdn.cn/1.jpg',
            },

            messageConfig: {
                // 数据结构见下方文档
            },
        }
    },
    methods: {
    onClickLeft:function() {
      this.$router.go(-1)
    },
   onBuyClicked:function(){
     //订单确定页
    },
     onAddCartClicked:async function(skuData){
        //获取选中的商品提交到后端购物车的api里面
        //console.log(skuData)
        this.shou=false;
        let choosecontent = skuData.selectedSkuComb['s-1']+'_'+skuData.selectedSkuComb['s-2']
        console.log(choosecontent)
       let result = this.data.productList.filter((item,index)=>{
            if(item.goods_specification_ids==choosecontent)
            {
                return true
            }else
            {
                return false
            }
            
            
        })
        console.log()
        let res = await axios.post('http://127.0.0.1:8360/api/cart/add',{
            goodsId:result[0].goods_id,
            number:skuData.selectedNum,
            productId:result[0].id,


        })
        console.log(res)
        let data = res.data.data;
        
        
        this.$store.commit('setCartList',data.cartList)
        this.$store.commit('Setcartotal',data.cartTotal)
    
 //选额商品规格，添加到购物车
    },
    choosesku:function(){
        
        this.show =true;
    }

    },
    computed:{
        images:function(){
            if(this.data.gallery==undefined)
            {
                return []
            }else
            {
                return this.data.gallery
                
            }
        }
    },
   async created(){
       
      let res = await axios.get('http://127.0.0.1:8360/api/goods/detail',{params:{id:this.id}})
     // console.log(res.data.data)
      this.data = res.data.data
      this.info= this.data.info
      this.attribute = this.data.attribute
      this.goods.picture=this.info.primary_pic_url
     this.goods.title = this.info.name
     this.sku.price = this.info.retail_price
     this.sku.stock_num=this.info.goods_number
     let tree =[]
     this.data.specificationList.forEach((item,index) => {
         let arr =[];
         item.valueList.forEach((product,i)=>{
             arr.push({
                 id:product.id,
                 name:product.value,

             });

         })
         tree.push({
              k: item.name, // skuKeyName：规格类目名称
                    k_s: "s-"+item.specification_id, // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    v: arr,
         })
         

         
     });
     this.sku.tree = tree;
     
}

}
</script>
<style lang="less">

#product{
    .swipeimg{
    width:100%
}
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
.proinfo{
    .title{
        font-weight:500;
    }
    .brief{
        font: size 12px;
        color:#999;

    }
    .price{
        font-size:16px;
       color: red;

    }
}
.van-cell__title{
    text-align:left
}
.propa{
    .proitem{
        width: 90%;
        margin: 0 auto;
        display:flex;
        justify-content:space-between;
        height: 40px;
        color:#999;
        font-size: 2px;
       
        background:#efefef;
        line-height: 24px;
        text-align: left;
        span.title{
            width: 45px;
            padding: 0 10px;
            border-right: 1px solid white;
        }
        span.value{
            width: 260px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            
        }


    }
    
}
.prode{
    width: 100%;
    height: 5rem;
    img{
        width:100%;
        vertical-align:middle ;
        
        }
        p{
            margin:0%;
            padding: 0px;
            display: 0;
        }
}


}
</style>