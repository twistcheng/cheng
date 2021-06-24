<template>
    <div id="me">
                <van-nav-bar
        title="我的"
        />
        <!-- 头像 -->
        <span>
                    <van-image       
            width="100"
            height="100"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            :round="true"
            />
            <!-- 昵称 -->
            <p>用户名字</p>
            </span>
            <van-grid>
  <van-grid-item icon="photo-o" text="待付款" />
  <van-grid-item icon="photo-o" text="代发货" />
  <van-grid-item icon="photo-o" text="待评价" />
  <van-grid-item icon="photo-o" text="退款售后" />
  <van-grid-item icon="photo-o" text="收藏" />
  <van-grid-item icon="photo-o" text="订阅店铺" />
  <van-grid-item icon="photo-o" text="限制换钱" />
  <van-grid-item icon="photo-o" text="官方客服" />
  <van-grid-item icon="photo-o" text="红包卡卷" />
  <van-grid-item icon="photo-o" text="积分" />
  <van-grid-item icon="photo-o" text="吃饭" />
  <van-grid-item icon="photo-o" text="睡觉" />
</van-grid>
<tab-btn></tab-btn>
    </div>
    
</template>

<script>
import tabBtn from '@/components/tabBtn'
export default {
    data(){
        return{
            

        }
    },
    components: {
    tabBtn
  },
    
}
</script>
<style lang="less">
#me{
    
    
    
    
    
}

</style>