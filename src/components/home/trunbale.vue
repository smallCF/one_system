<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-12 11:42:54
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-14 19:17:27
 * @Description: 转盘组件
 -->
<!-- 转盘组件 -->
<template>
  <div class="trunbale_warp">
    <div class="trunbale" style="padding:30px 20px 0px;">
      <div id="rotary-table">
        <div
          v-for="(award,index) in awards"
          :key="index"
          :class="current===index?'award award_'+index+' active': 'award award_'+index"
        >
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        </div>
        <div id="start-btn" @click="start"></div>
      </div>
    </div>
    <!--切换抽奖模块的按钮-->
    <div class="module_but">
      <div class="but_50" @click="checkPrize(50)">50金币</div>
      <div class="but_100" @click="checkPrize(100)">100金币</div>
      <div class="but_200" @click="checkPrize(200)">200金币</div>
    </div>
    <!-- QQ推广-->
    <div class="QQTG">
      <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=570874412&site=qq&menu=yes">
        <img
          border="0"
          src="http://wpa.qq.com/pa?p=2:570874412:51"
          alt="点击这里给我发消息"
          title="点击这里给我发消息"
        />
      </a>
    </div>
    <div class="rule">
      <p class="rule-title">用户须知</p>
      <ul class="rule-main">
        <li>1、不同金币抽奖方式,奖品不同</li>
        <li>2、中奖奖品的发货时间为72小时以内</li>
        <li>3、金币赚取：通过充值或邀请好友抽奖均可获得金币</li>
        <li>4、中间概率：所有奖品的中将概率均为40%</li>
        <li>5、最终解释权归发布者所有。</li>
      </ul>
    </div>
    <!--抽中后组件-->
    <van-dialog
      v-model="show"
      class="PrizeMoudle"
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
    >
      <solt solt="lable" name="lable">
        <div style="padding-bottom:5px;">
          恭喜,抽中了
          <span>{{award.name}}</span>
        </div>
      </solt>
      <div>
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg"></van-image>
        <van-button type="default" style="width:100%;" @click="show=!show">确定</van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnnum: 3,
      valuesize: 0,
      guttersize: 0,
      current: -1,
      awards: [
        { id: 1, name: "空" },
        { id: 2, name: "眼镜" },
        { id: 3, name: "包" },
        { id: 4, name: "笨驴" },
        { id: 5, name: "书" },
        { id: 6, name: "手链" },
        { id: 7, name: "美女" },
        { id: 8, name: "iphone" }
      ],
      speed: 200,
      diff: 15,
      award: {
        id: 4,
        name: "笨驴"
      },
      time: 0,
      isstart: false,
      isonstart: false,
      show: false,
      show1: true,
      isturntable: false,
      consume: 50,
      countflag: false,
      firstflag:false
    };
  },
  beforeCreate() {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("UserDate"));
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    checkPrize(num) {
      if (this.isturntable) {
        return;
      }
      this.consume = num;
    },
    showAddress() {},
    async start() {
      // 开始抽奖
      if (!this.firstflag) {
        const res = await this.$http.post("address/page", {
          userId: this.userInfo.id
        });
        const { count } = res.data;
        this.firstflag = true;
        if (count > 0) {
          this.countflag = true;
        }
      }
      if (this.countflag) {
        this.$dialog
          .confirm({
            message: "是否消耗" + this.consume + "金币抽奖"
          })
          .then(() => {
            // on confirm
            this.isturntable = true;
            this.current = 0;
            this.drawAward();
            this.time = Date.now();
            this.speed = 200;
            this.diff = 15;
            this.isstart = false;
            this.isonstart = false;
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$dialog
          .confirm({
            message: "暂无收货地址,请前往添加地址",
            confirmButtonText: "前往添加"
          })
          .then(() => {
            // on confirm
            this.$router.push("address");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    drawAward() {
      // 请求接口, 这里我就模拟请求后的数据(请求时间为2s)
      this.move();
    },
    move() {
      const a = setTimeout(() => {
        this.current += 1;
        if (this.current > 7) {
          this.current = 0;
        }
        if (
          this.award.id &&
          (Date.now() - this.time) / 1000 > 2 &&
          !this.isstart
        ) {
          this.speed = this.diff;
          this.isstart = !this.isstart;
        } else if (
          (Date.now() - this.time) / 1000 > 5 &&
          this.isonstart &&
          parseInt(this.award.id) === this.awards[this.current].id
        ) {
          clearTimeout(a);
          setTimeout(() => {
            console.log(this.award.name);
            this.show = true;
            this.isturntable = false;
            // alert( '恭喜你，抽中了'   this.award.name );
          }, 0);
          return;
        } else {
          if ((Date.now() - this.time) / 1000 > 4 && this.isstart) {
            this.speed += this.diff;
            if (this.speed >= 350) {
              this.speed = 350;
              this.isonstart = true;
            }
          } else {
            if (this.speed <= 50) {
              this.speed = 50;
            } else {
              this.speed -= this.diff;
            }
          }
        }
        this.move();
      }, this.speed);
    }
  }
};
</script>
<style scoped lang="scss">
/* @import url(); 引入css类 */
.trunbale_van-grid {
  border-radius: 10px;
  overflow: hidden;
  .van-grid-item {
    border-radius: 10px;
    overflow: hidden;
  }
}
.luck_div {
  padding-top: 10px;
}
.luck_but {
  height: 50px;
  text-align: center;
}
.luck_but img {
  height: 50px;
}
.rule {
  margin-top: 14px;
  color: #fff;
  font-size: 14px;
  padding-bottom: 39px;
  padding: 0px 20px;
}
.rule-title {
  text-align: center;
  position: relative;
  font-size: 16px;
  margin-bottom: 14px;
}
.rule-title:before,
.rule-title:after {
  content: "";
  position: absolute;
  top: 52%;
  background: #cec8c8;
  width: 30%;
  height: 2px;
}

.rule-title:before {
  left: 0;
}

.rule-title:after {
  right: 0;
}
#rotary-table {
  width: 340px;
  height: 349px;
  position: relative;
  margin: auto;
  //   background-color: antiquewhite;

  .award {
    width: 90px;
    height: 96px;
    line-height: 96px;
    text-align: center;
    float: left;
    position: absolute;
    overflow: hidden;
    background-color: #f6fffc;
    border-radius: 10px;
    background: url(../../assets/images/Home/award_bg.png);
    background-size: 100% 100%;
    .van-image {
      //   height: 100%;
      padding: 5px;
    }
  }
  .active {
    background-color: darkgoldenrod;
    box-shadow: 0 0 0px 3px #ff8d00;
  }

  .award_0 {
    top: 21px;
    left: 21px;
  }
  .award_1 {
    top: 21px;
    left: 125px;
  }
  .award_2 {
    top: 21px;
    right: 22px;
  }
  .award_3 {
    top: 126px;
    right: 22px;
  }
  .award_4 {
    bottom: 22.5px;
    right: 22px;
  }
  .award_5 {
    bottom: 22.5px;
    right: 125.5px;
  }
  .award_6 {
    bottom: 22.5px;
    left: 21px;
  }
  .award_7 {
    top: 126px;
    left: 21px;
  }
  #start-btn {
    position: absolute;
    top: 125px;
    left: 124px;
    width: 90px;
    height: 96px;
    line-height: 90px;
    text-align: center;
    // background-color: coral;
    background: url(../../assets/images/Home/start.png);
    background-size: 100% 100%;
    border-radius: 10px;
  }
}
.module_but {
  display: flex;
  justify-content: center;
  align-items: center;
}
.module_but div {
  background: url(../../assets/images/Home/but3.png);
  background-size: 100% 100%;
  width: 25%;
  height: 46px;
  line-height: 46px;
  margin: 0px 10px;
  text-align: center;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
}
.QQTG {
  position: fixed;
  right: 0px;
  bottom: 153px;
  z-index: 999;
}
.PrizeMoudle {
  top: 50%;
  height: 50%;
  left: 50%;
  width: 90%;
  overflow: hidden;
  font-size: 16px;
  background-color: #fff;
}
</style>