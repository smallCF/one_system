<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-10 14:35:54
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-14 15:49:43
 * @Description: 找回密码
 -->
<!--  -->
<template>
  <div class="findpwd_warp">
    <van-nav-bar title="找回密码" class="header_title" @click-left="goBackFn">
      <!-- 使用插槽 -->
      <slot slot="left" name="left">
        <van-icon name="arrow-left" class="back" />
      </slot>
    </van-nav-bar>
    <div class="findpwd_content">
      <div class="logo-img"></div>
      <div class="step_con">
        <van-steps :active="active" active-icon="success" active-color="#38f" inactive-icon="arrow">
          <van-step>基本信息</van-step>
          <van-step>密保问题</van-step>
          <van-step>修改密码</van-step>
          <van-step>修改完成</van-step>
        </van-steps>
      </div>
      <div class="findpwd">
        <div class="account" v-if="active==0">
          <span class="user_title">输入账号</span>
          <van-field
            v-model="formdate.userName"
            clearable
            required
            placeholder="输入要找回密码的账号"
            left-icon="manager"
          />
        </div>
        <div class="question_div" v-if="active==1">
          <span class="user_title">密保问题</span>
          <van-field
            v-model="formdate.issue"
            clearable
            required
            readonly
            placeholder="密保问题"
            left-icon="el-input__icon el-iconiconfontanquan"
          />
          <van-field
            v-model="formdate.answer"
            clearable
            placeholder="请输入密保答案"
            class="questionanstitle"
          ></van-field>
        </div>
        <div class="password_div" v-if="active==2">
          <span class="user_title">修改密码</span>
          <van-field
            v-model="formdate.pwd"
            clearable
            required
            :type="showicon?'password':''"
            placeholder="输入新的密码"
            left-icon="el-input__icon el-iconsuo"
            ref="password"
          >
            <slot slot="right-icon" name="right-icon">
              <i :class="showicon?closeeyes:openeyes" @click="changepasswordtype()"></i>
            </slot>
          </van-field>
          <van-field
            v-model="formdate.passwordsure"
            clearable
            required
            :type="sureicon?'password':''"
            placeholder="确认新的密码"
            left-icon="el-input__icon el-iconsuo"
            ref="passwordsure"
          >
            <slot slot="right-icon" name="right-icon">
              <i :class="sureicon?closeeyes:openeyes" @click="changepasswordtypesure()"></i>
            </slot>
          </van-field>
        </div>
        <!-- 提升修改成功返回首页 -->
        <div class="changepwdok" v-if="active==3">
          <img src="../../assets/images/FindPwd/findok1.png" />
          <span class="ok_tips">
            将在
            <i style="font-style: inherit;color:#1989fa;">{{scoend}}</i>秒后返回登录页
          </span>
        </div>
      </div>
      <!---->
      <div class="next_but">
        <van-button
          type="info"
          plain
          v-if="active<2"
          class="register_but"
          size="large"
          @click="onClickButtonSubmit"
        >{{butText}}</van-button>
        <van-button
          type="info"
          v-if="active>=2"
          class="register_but"
          size="large"
          @click="onClickButtonSubmit"
        >{{butText}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      formdate: {
        userName: "",
        issue: "",
        answer: "",
        pwd: "",
        passwordsure: ""
      },
      answer: "",
      openeyes: "van-icon el-input__icon el-iconyanjing activeicon",
      closeeyes: "van-icon van-icon-closed-eye",
      sureicon: true,
      showicon: true,
      butText: "下一步",
      scoend: 3
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
    onClickButtonSubmit() {
      if (this.active >= 3) {
        this.$router.push("/login");
        return;
      }
      if (this.active === 0) {
        this.$http.post("user/get", this.formdate).then(res => {
          const { code, data, message } = res.data;
          if (code === "200") {
            this.active++;
            this.formdate.issue = data.issue;
            this.answer = data.answer;
            return;
          } else {
            this.$toast(message);
            return;
          }
        });
      }
      if (this.active === 1) {
        if (this.answer === this.formdate.answer) {
          this.active++;
          this.butText = "确定";
          return;
        } else {
          this.$toast("问题密码不正确");
          return;
        }
      }
      if (this.active === 2) {
        if (this.formdate.pwd === "") {
          this.$refs.password.focus();
          return;
        }
        if (this.formdate.passwordsure === "") {
          this.$refs.passwordsure.focus();
          return;
        }
        if (this.formdate.pwd === this.formdate.passwordsure) {
          this.$http.post("user/update/pwd", this.formdate).then(res => {
            const { message, code, data, count } = res.data;
            if (code == "200") {
              this.active++;
            } else {
              this.$toast(message);
              return;
            }
          });
        } else {
          this.$toast("两次密码不相同");
          return;
        }
      }
      if (this.active === 3) {
        setInterval(() => {
          if (this.scoend != 0) {
            this.scoend--;
          }
        }, 1000);
        this.butText = "返回登录";
      }
    },
    changepasswordtype() {
      this.showicon = !this.showicon;
      setTimeout(() => {
        this.showicon = !this.showicon;
        this.$refs.password.focus();
      }, 2000);
    },
    changepasswordtypesure() {
      this.sureicon = !this.sureicon;
      setTimeout(() => {
        this.sureicon = !this.sureicon;
        this.$refs.passwordsure.focus();
      }, 2000);
    }
  },
  watch: {
    scoend(newscoend, oldscoend) {
      if (newscoend === 0) {
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.findpwd_warp {
  height: 100%;
}
.header_title {
  background-color: #1989fa;
}
.header_title {
  background-color: #1989fa;
}
.van-nav-bar__title {
  color: white !important;
}
.van-nav-bar .van-ico {
  color: white !important;
}
.back {
  color: #ffffff !important;
  font-size: 20px;
}
.findpwd {
  padding: 25px 15px 0px 15px;
  height: 170px;
  display: flex;
  align-items: center;
}
.user_title {
  font-size: 14px;
  color: #b6afaf;
  padding-left: 30px;
}
.van-field {
  height: 60px;
  line-height: 50px;
  border-bottom: 1px solid #c9c9c9;
}
.step_con {
  padding: 30px 10px;
}
.next_but {
  padding: 60px 15px 0px 15px;
}
.register_but {
  border-radius: 50px;
}
.findpwd div {
  width: 100%;
}
.changepwdok {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.ok_tips {
  padding: 4px;
  letter-spacing: 1px;
  color: #8f7c7c;
}
</style>