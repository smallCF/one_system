<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-12 11:32:38
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-21 10:33:50
 * @Description: 首页
 -->
 <!--  -->
 <template>
  <div class="index_bg">
    <div class="nav_title">
      <!-- <div class="exit">退出账号</div> -->
      <div class="shopping" @click="gotoshopping()">商品中心</div>
      <div class="userinfo" @click="showuserionfo()">个人中心</div>
      <div style="position: absolute;left: 20px;top: 30px;">
        剩余
        <span style="font-size:22px;color:#FFFFFF;">{{userInfo.money}}</span>金币
      </div>
    </div>
    <div class="index_content">
      <trunbale ref="trunbale"></trunbale>
    </div>
  </div>
</template>
 
 <script>
import trunbale from "@/components/home/trunbale";
export default {
  data() {
    return {
      userInfo:{
        money:0
      }
    };
  },
  components: {
    trunbale
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("UserDate"));
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    showuserionfo() {
      this.$router.push("/userinfo");
    },
    gotoshopping() {
      this.$router.push("/shopping");
    }
  }
};
</script>
 <style scoped lang="scss">
/* @import url(); 引入css类 */
.index_bg {
  background-image: url(../../assets/images/Home/luck_bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
}
.header_title {
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0px;
}
.index_content {
  //   padding-top: 46px;
}
.nav_title {
  display: flex;
  height: 46px;
  align-items: center;
}
.exit,
.userinfo {
  position: absolute;
  color: #ffffff;
  padding: 3px 10px;
  border: 1px solid #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
}
.exit {
  left: 30px;
}
.userinfo {
  right: 20px;
}
</style>
