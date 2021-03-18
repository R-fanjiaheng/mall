<template>
<!-- 自定义TabBar组件，在APP中使用 -->
  <div id="tab-bar">
<!--  定义插槽，TabBar中的内容由外界决定  -->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    /* flex布局平分TabBar */
    display: flex;
    /* 生成绝对定位的元素，相对于浏览器窗口进行定位 */
    position: fixed;
    /* 设置left, right, bottom给目标元素定位 */
    left: 0;
    right: 0;
    bottom: 0;
    /* 设置相关样式 */
    box-shadow: 0 -3px 3px rgba(100, 100, 100, .15);
    background-color: #f2f2f2;
  }

</style>
