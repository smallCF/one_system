<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 10:54:30
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-15 00:51:51
 * @Description: 个人中心页
 -->
<!-- 个人中心 -->
<template>
  <div class="userinfo_warp">
    <van-sticky>
      <van-nav-bar title="个人中心" class="header_title" @click-left="goBackFn">
        <!-- 使用插槽 -->
        <slot slot="left" name="left">
          <van-icon name="arrow-left" class="back" />
        </slot>
      </van-nav-bar>
    </van-sticky>
    <div class="Surplus_money">
      <div class="Surplus_content">
        <div class>
          <div class="SCtitle">剩余金币</div>
          <div class="SCMoney">{{userInfo.money}}</div>
        </div>
        <div class="gopay">
          <div class="gopay_bur">前往充值</div>
          <!-- <i class="van-icon van-icon-arrow" style="    margin-bottom: 2px;" />-->
        </div>
      </div>
    </div>
    <!--<van-card>
      <slot slot="title" name="title">
        <div>我的邀请码</div>
      </slot>
      <slot slot="desc" name="desc">
        <div>{{userInfo.invitationCode}}</div>
      </slot>
    </van-card>-->
    <div class="ServiceList">
      <van-cell-group title="功能中心">
        <van-cell title="商品中心" is-link to="shopping" />
        <van-cell title="地址列表" is-link to="address" />
        <van-cell title="中奖信息" is-link to="mywinner" />
        <van-cell title="抽奖信息" is-link to="luckdraw" />
        <!--<van-collapse v-model="activeNames" accordion>
          <van-collapse-item name="1">
            <div slot="title">
              我的邀请码
            </div><div style="text-align:right;">{{userInfo.invitationCode}}</div>
          </van-collapse-item>
        </van-collapse>-->
        <div style="padding:5px 15px;">
          <div style="color:#5a5656;">我的邀请码</div>
          <div
            style="text-align:right;font-size:22px;padding-right:30px;color: #4562c5;"
          >{{userInfo.invitationCode}}</div>
        </div>
      </van-cell-group>
    </div>

    <div class="pd15 exit_account">
      <van-button type="info" class="exit_but" size="large" @click="ExitAccount">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      userInfo: {}
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("UserDate"));
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    goBackFn() {
      this.$router.go(-1);
    },
    ExitAccount() {
      if (localStorage.getItem("remeber") == "false") {
        localStorage.removeItem("userinfo");
        localStorage.removeItem("pwd");
        localStorage.removeItem("userId");
      }
      localStorage.removeItem("Token");
      localStorage.removeItem("UserDate");
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
.Surplus_money {
  height: 100px;
  padding-top: 20px;
  .Surplus_content {
    padding: 0px 20px;
    height: 100%;
    display: flex;
    .SCtitle {
      color: #bcbcbd;
    }
    .SCMoney {
      font-size: 60px;
      color: orangered;
      padding-left: 50px;
    }
    .gopay {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      color: #2222f3;
      padding-left: 30px;
      .gopay_bur {
        padding: 3px 15px;
        border: 1px solid #5050c6;
        background-color: #5050c6;
        color: white;
        border-radius: 50px;
      }
    }
  }
}
</style>