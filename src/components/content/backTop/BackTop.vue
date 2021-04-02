<template>
  <div class="back-top">
    <!--  添加滚动到页面顶端的图标  -->
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top {
    /* 固定定位: 固定定位的位置是 相对于当前浏览器窗口 */
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>
