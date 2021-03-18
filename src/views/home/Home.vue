<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <h2>首页</h2>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
    },
    data() {
      return {
        // 因为 getHomeMultidata 函数执行完之后会自动销毁
        // 在 data 中定义变量来保存请求的数据
        result: null,
        //知道返回的数据中的 data 中有一个 banner，所以可以在 data 中定义一个 banner
        // banner: []
      }
    },
    created() {
      //1. 请求多个数据
      getHomeMultidata().then(res => {
        console.log(res);
        this.result = res;
        // 接收 banner
        // this.banner = res.data.banner
      })
      //不能在此打印，因为 getHomeMultidata 是异步操作，不能保证在打印语句前完成请求
      // console.log(this.result);
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
