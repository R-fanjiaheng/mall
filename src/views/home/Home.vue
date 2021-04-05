<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- @scroll 监听子组件 Scroll 发送过来的的 scroll 事件，触发 contentScroll 事件 -->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {debounce} from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
  },
  data() {
    return {
      // 因为 getHomeMultidata 函数执行完之后会自动销毁
      // 在 data 中定义变量来保存请求的数据
      // result: null,
      //知道返回的数据中的 data 中有一个 banner，所以可以在 data 中定义一个 banner
      banner: {},
      //同上，定义一个 recommend 用于接收返回的数据 data 中的 recommend
      recommend: {},
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata()
    // 2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      this.$refs.scroll.refresh();
      refresh()
    })
  },
  methods: {
    /*
    * 事件监听相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 是否显示 backTop 图标
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    // loadMore 事件触发时，调用 getHomeGoods 方法，发送网络请求
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banner = res.data.banner
        this.recommend = res.data.recommend
      })
      //不能在此打印，因为 getHomeMultidata 是异步操作，不能保证在打印语句前完成请求
      // console.log(this.result);
    },
    getHomeGoods(type) {
      // 定义一个变量page, this.goods[type]拿到相应 type 对应的对象，
      // .page 拿到对象中的 page 属性
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //还需要将请求到的数据保存到data中的goods中，
        //因为函数执行完会自动销毁，res也会跟着被销毁

        //将请求到的数据 res 中的 data 中的 list 数据保存到 goods 对象中的 list 中
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 发送网络请求后执行 scroll 对象(组件) 中的 finishPullUp 方法，可以再次上拉刷新
        this.$refs.scroll.finishPullUp()
      })
    },
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
