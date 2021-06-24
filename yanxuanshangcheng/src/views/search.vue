<template>
    <div>
        
        <van-nav-bar
            title="搜索"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            
            />
            <van-search v-model="searchData" input-align='center' placeholder="商品搜索共239款好物" />
    </div>
</template>

<script>
export default {
    data(){
        return{
        searchData:null,
        }
    },
    methods:{
        onClickLeft:function() {
      this.$router.go(-1)
    }
    }
}
</script>