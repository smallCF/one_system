<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-08 10:50:39
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-12 09:15:04
 * @Description: 登录组件组件
 -->
<template>
  <div class="login_warp">
    <van-nav-bar title="登录" class="header_title" />
    <div class="login_content">
      <div class="logo-img"></div>
      <van-cell-group>
        <div class="user_pwd_input">
          <van-field v-model="username" clearable placeholder="请输入用户名" left-icon="contact" />
          <van-field
            v-model="password"
            clearable
            :type="passwordtype"
            :right-icon="showicon"
            placeholder="请输入密码"
            left-icon=" el-input__icon el-iconsuo"
            icon-size="20"
            @click-right-icon="changepasswordtype()"
            ref="password"
          />
        </div>
        <div class="forget_rem">
          <van-row>
            <van-col span="8" style="text-align: center;color:#85858b !important;">
              <van-checkbox v-model="checked" shape="square" icon-size="14" class="remenberpwd">记住密码</van-checkbox>
            </van-col>
            <van-col span="8"></van-col>
            <van-col span="8"></van-col>
          </van-row>
        </div>
        <!--登录按钮-->
        <div class="pd15 login">
          <van-button type="info" class="login_but" size="large" @click="onClickButtonSubmit">登录</van-button>
        </div>
        <!-- 注册和找回密码 -->
        <div class="pd15 register">
          <div @click="GoRegister()">
            立即注册
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
      username: "",
      password: "",
      showicon: "closed-eye",
      passwordtype: "password",
      checked: false
    };
  },
  beforeCreate() {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    GoFindPwd() {
      this.$router.push("/findpwd");
    },
    GoRegister() {
      this.$router.push("/register");
    },
    changepasswordtype() {
      if (this.passwordtype === "password") {
        this.passwordtype = "text";
        this.showicon = " el-input__icon el-iconyanjing activeicon";
        setTimeout(() => {
          if(this.passwordtype==="text"){
            this.passwordtype = "password";
            this.showicon = "closed-eye";
            this.$refs.password.focus();
          }
        }, 3000);
      } else {
        this.passwordtype = "password";
        this.showicon = "closed-eye";
      }
    },
    onClickButtonSubmit: function(e, username, password) {
      if (this.username == "") {
        this.$toast("用户名不能为空");
        return false;
      }
      if (this.password == "") {
        this.$toast("密码不能为空");
        return false;
      } else {
        var that = this; // 放置指针，便于then操作的获取

        this.$http
          .get("接口地址", {
            params: {
              userName: this.username
            }
          })
          .then(
            function(response) {
              console.log(response);
              var reslutData = response;
              console.log(reslutData.data.status);
              if (reslutData.data.status == 1002) {
                this.$toast(reslutData.data.desc);
              }
              if (reslutData.data.status == 1000) {
                this.$toast(reslutData.data.desc);
                this.$router.push({
                  path: "/receData",
                  query: {
                    reslutData
                  }
                });
              }
            }.bind(this)
          )
          .catch(function(error) {
            console.log("请求失败" + error);
          });
        e.preventDefault();
      }
    },
    validEmail: function(password) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(password);
    }
  }
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.header_title {
  background-color: #1989fa;
}
.van-nav-bar__title {
  color: white !important;
}
.login_warp {
  height: 100%;
  // background-color: #efefef;
}
.login_but,
.register_but {
  border-radius: 50px;
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
.register_but {
  border: solid 1px #aaa3a3;
  overflow: hidden;
  color: #1989fa;
}
.pd15 {
  padding: 30px 10px 0px 10px;
}
.user_pwd_input {
  margin: 30px 10px 0px 10px;
}
.van-field {
  height: 60px;
  line-height: 50px;
  border-bottom: 1px solid #c9c9c9;
}
.forget_rem {
  font-size: 14px;
  padding: 5px 0px;
}
.remenberpwd {
  height: 40px;
  line-height: 40px;
  margin: 0 0 0 25px;
}
.logo-img {
  height: 120px;
}
.login {
  padding: 20px 15px 0px 15px;
}
</style>