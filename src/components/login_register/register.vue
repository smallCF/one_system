<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-08 10:50:50
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-14 23:33:38
 * @Description: 注册组件
 -->
<template>
  <div class="register_warp">
    <van-nav-bar title="注册" class="header_title" @click-left="goBackFn">
      <!-- 使用插槽 -->
      <slot slot="left" name="left">
        <van-icon name="arrow-left" class="back" />
      </slot>
    </van-nav-bar>
    <div class="register_content">
      <div class="logo-img"></div>
      <van-cell-group>
        <div class="user_pwd_input">
          <van-field
            v-model="formadate.userName"
            clearable
            required
            placeholder="请输入要注册的账号"
            left-icon="manager"
          />
          <van-field
            v-model="formadate.pwd"
            clearable
            required
            :type="showicon?passwordtype:texttype"
            placeholder="请输入密码"
            left-icon=" el-input__icon el-iconsuo"
            icon-size="20"
            ref="password"
          >
            <slot slot="right-icon" name="right-icon">
              <i :class="showicon?closeeyes:openeyes" @click="changepasswordtype()"></i>
            </slot>
          </van-field>
          <van-field
            v-model="formadate.passwordsure"
            clearable
            required
            :type="sureicon?passwordtype:texttype"
            placeholder="请再次输入密码"
            left-icon=" el-input__icon el-iconsuo"
            icon-size="20"
            ref="passwordsure"
            @blur="yzpassword"
          >
            <slot slot="right-icon" name="right-icon">
              <i :class="sureicon?closeeyes:openeyes" @click="changepasswordtypesure()"></i>
            </slot>
          </van-field>
          <!--密保问题-->
          <div class="question_div">
            <van-field
              clearable
              required
              left-icon=" el-input__icon el-iconiconfontanquan"
              @click="showdropdown"
            >
              <slot slot="input" name="input">
                <input
                  v-model="formadate.issue"
                  icon-size="20"
                  readonly
                  placeholder="请选择密保问题"
                  class="van-field__control"
                />
              </slot>
              <slot slot="right-icon" name="right-icon">
                <van-dropdown-menu active-color="#1989fa" style="height:49px;padding-right:10px;">
                  <van-dropdown-item v-model="value1" ref="DropdownItem" :options="option1" />
                </van-dropdown-menu>
              </slot>
            </van-field>
            <van-field
              v-model="formadate.answer"
              clearable
              required
              placeholder="请输入密保答案"
              v-if="isshowans"
              ref="pwdquestionans"
              class="questionanstitle"
            ></van-field>
          </div>
          <van-field
            v-model="formadate.invitedYards"
            clearable
            placeholder="请输入邀请码"
            right-icon="question"
            @click-right-icon="$toast('无邀请码可以不用填写')"
          >
            <slot slot="left-icon" name="left-icon">
              <span style="color: #b6afaf;font-wight:600;font-weight: 500;letter-spacing: 1px;">邀请码</span>
            </slot>
          </van-field>
        </div>
        <!--登录按钮-->
        <div class="pd15 login">
          <van-button type="info" class="register_but" size="large" @click="onClickButtonSubmit">注册</van-button>
        </div>
        <!-- 注册和找回密码 -->
        <div class="pd15 register">
          <div @click="GoLogin()">
            立即登录
            <van-icon name="arrow" />
          </div>
          <div class="r_line_f">|</div>
          <div @click="GoFindPwd()">
            找回密码
            <van-icon name="arrow" />
          </div>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      formadate: {
        userName: "",
        pwd: "",
        passwordsure: "",
        invitedYards: "",
        issue: "",
        answer: ""
      },
      sureicon: true,
      showicon: true,
      isshowans: false,
      passwordtype: "password",
      texttype: "text",
      openeyes: "van-icon el-input__icon el-iconyanjing activeicon",
      closeeyes: "van-icon van-icon-closed-eye",
      value1: -1,
      show: false,
      option1: [
        { text: "我的出生日期？", value: 0 },
        { text: "我母亲的出生日期？", value: 1 },
        { text: "我最喜欢的人？", value: 2 }
      ],
      showfunction: null
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    showdropdown() {
      // this.$refs.DropdownItem.toggle();
    },
    GoFindPwd() {
      this.$router.push("/findpwd");
    },
    GoLogin() {
      this.$router.push("/");
    },
    goBackFn() {
      this.$router.go(-1);
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
    },
    yzpassword() {
      if (
        this.formadate.pwd != this.formadate.passwordsure &&
        this.formadate.passwordsure.length != ""
      ) {
        this.$toast("两次密码不相同");
        this.$refs.passwordsure.focus();
        return false;
      }
    },
    async onClickButtonSubmit() {
      if (this.formadate.userName == "") {
        this.$toast("用户名不能为空");
        return false;
      }
      if (this.formadate.pwd == "") {
        this.$toast("密码不能为空");
        return false;
      }
      if (this.formadate.passwordsure == "") {
        this.$toast("确认密码不能为空");
        return false;
      }
      if (this.formadate.pwd != this.formadate.passwordsure) {
        this.$toast("两次密码不相同");
        return false;
      }
      if (this.formadate.issue == "") {
        this.$toast("请选择密保问题");
        return false;
      }
      if (this.formadate.answer === "") {
        this.$toast("请输入密保答案");
        this.$refs.pwdquestionans.focus();
        return false;
      }
      const res = await this.$http.post("user/signIn", this.formadate);
      const { code, message, data, token, count } = res.data;
      if (code === "200") {
        this.$toast.success("注册成功");
        this.$router.push("/login");
      } else {
        this.$toast.fail(message);
        this.formadate = {
          userName: "",
          pwd: "",
          passwordsure: "",
          invitedYards: "",
          issue: "",
          answer: ""
        };
      }
    }
  },
  watch: {
    value1(newName, oldName) {
      if (newName != -1) {
        this.isshowans = true;
        this.formadate.issue = this.option1[newName].text;
      }
    }
  }
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.register_warp {
  height: 100%;
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
.logo-img {
  height: 50px;
}
.register {
  text-align: center;
  padding-bottom: 30px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  .r_line_f {
    padding: 0px 20px;
    color: #c9c9c9;
  }
  .van-icon {
    padding-left: 7px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #878787;
  }
}
.van-field {
  height: 60px;
  line-height: 50px;
  border-bottom: 1px solid #c9c9c9;
}
.user_pwd_input {
  margin: 0px 10px 0px 10px;
}
.pd15 {
  padding: 30px 10px 0px 10px;
}
.register_but {
  border-radius: 50px;
}
.login {
  padding: 30px 15px 0px 15px;
}
</style>
