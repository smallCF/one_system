<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 23:16:36
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-13 23:37:29
 * @Description: 抽奖信息
 -->
<!-- 抽奖信息模块 -->
<template>
  <div class="LuckDraw_warp">
    <van-sticky>
      <van-nav-bar title="抽奖信息" class="header_title" @click-left="goBackFn">
        <!-- 使用插槽 -->
        <slot slot="left" name="left">
          <van-icon name="arrow-left" class="back" />
        </slot>
      </van-nav-bar>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell  v-for="item in list" :key="item" title="消耗多少金币" value="2020-01-22 13:11:29" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    goBackFn() {
      this.$router.go(-1);
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.back {
  color: #ffffff !important;
  font-size: 20px;
}
</style>