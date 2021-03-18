<template>
<!-- 自定义TabBarItem组件，可以传入图片和文字 -->
<!-- 定义TabBarItem，并且定义两个插槽：图片、文字 -->
  <div class="tab-bar-item" @click="itemClick" >
<!--  给插槽外层包装div，用于设置样式  -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active: isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,

    },
    data() {
      return {
        // isActive: false
      }
    },
    computed: {
      isActive() {
        // /home -> item1(/home) = true
        return this.$route.path.indexOf(this.path) !== -1
      }
    },
    methods: {
      itemClick() {
        // console.log('itemClick' + this.path);
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }

  .active {
    color: #ff5777;
  }
</style>
