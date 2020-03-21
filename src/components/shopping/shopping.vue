<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-14 00:05:08
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-14 01:43:34
 * @Description: 商品列表
 -->
<!-- 商品列表 -->
<template>
  <div class="shop_warp">
    <van-sticky container="body">
      <van-nav-bar title="商品列表" class="header_title" @click-left="goBackFn">
        <!-- 使用插槽 -->
        <slot slot="left" name="left">
          <van-icon name="arrow-left" class="back" />
        </slot>
      </van-nav-bar>
      <van-search
        v-model="SearchKey"
        shape="round"
        ref="SearchKey"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <div v-if="cancle_search" slot="right-icon" @click="onSearch" class="search">搜索</div>
        <div v-if="!cancle_search" slot="right-icon" @click="onCancel" class="search">取消</div>
      </van-search>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="padding-top:3px;">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-grid :column-num="2" :gutter="10" class="shop_item">
          <van-grid-item v-for="(item,index) in shoplist" :key="index" @click="gotoDetail(index)">
            <van-image
              src="https://img.yzcdn.cn/vant/apple-2.jpg"
              v-lazy="item"
              height="125"
              width="154"
            />
            <div class="price">金币</div>
            <div class="price">价格</div>
            <div class="price" style="text-align:center;">
              <van-button type="primary" color="orange" size="small">金币兑换</van-button>
              <van-button type="primary" color="#7232dd" size="small">直接购买</van-button>
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SearchKey: "",
      cancle_search: true,
      refreshing: false,
      loading: false,
      finished: false,
      shoplist: []
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
    onSearch() {
      console.log("1");
      this.cancle_search = false;
    },
    onCancel() {
      this.SearchKey = "";
      this.cancle_search = true;
    },
    gotoDetail(type) {},
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.shoplist = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 20; i++) {
          this.shoplist.push(this.shoplist.length + 1);
        }
        this.loading = false;

        if (this.shoplist.length >= 40) {
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
  },
  watch: {
    SearchKey(newvalue, oldvalue) {
      if (newvalue.length != 0 && !this.cancle_search) {
        this.cancle_search = true;
      }
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
.search {
  padding: 0px 3px;
}
.shop_item {
  .van-grid-item__content {
    border-radius: 10px;
    border: 1px solid grey;
  }
  .price {
    width: 100%;
    padding-top: 5px;
  }
}
</style>