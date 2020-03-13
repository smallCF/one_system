<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 10:54:30
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-13 13:54:31
 * @Description: 个人中心页
 -->
<!-- 个人中心 -->
<template>
  <div class="userinfo_warp">
    <van-nav-bar title="个人中心" class="header_title" @click-left="goBackFn">
      <!-- 使用插槽 -->
      <slot slot="left" name="left">
        <van-icon name="arrow-left" class="back" />
      </slot>
    </van-nav-bar>
    <div class="ServiceList van-hairline--bottom">
      <van-cell title="地址列表" is-link to="address" />
      <van-cell title="中奖信息" is-link to="mywinner" />
      <van-cell title="抽奖信息" is-link to="index" />
      <van-cell title="金币充值" is-link to="index" />
    </div>

    <div class="pd15 exit_account">
      <van-button type="info" class="exit_but" size="large" @click="ExitAccount">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
    ExitAccount() {
      this.$router.push("/login");
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
.ServiceList {
  padding: 20px 0px;
}
.exit_account {
  padding: 50px 15px;
  .exit_but {
    width: 100%;
    border-radius: 50px;
  }
}
</style>