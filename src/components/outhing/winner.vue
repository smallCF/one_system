<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 13:39:16
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-13 23:29:24
 * @Description: 中奖信息
 -->
 <!-- 中奖信息 -->
 <template>
  <div class="winner_warp">
    <van-sticky>
      <van-nav-bar title="中奖信息" class="header_title" @click-left="goBackFn">
        <!-- 使用插槽 -->
        <slot slot="left" name="left">
          <van-icon name="arrow-left" class="back" />
        </slot>
      </van-nav-bar>
    </van-sticky>
    <div class="winner_list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-collapse v-model="activeNames" accordion>
            <van-collapse-item v-for="(item,index) in winnerList" :key="index" :name="index+1">
              <slot slot="title" name="title">
                <div>
                  <van-col span="8" class="winner_title">奖品:小米</van-col>
                  <van-col span="16" class="winner_time">2020-01-22 13:30:00</van-col>
                </div>
              </slot>
              <van-card thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
                <slot slot="desc" name="desc">
                  <div class="content_right">
                    <div class="ydh">
                      <div class="ydh_title">运单号:</div>
                      <div class="ydh_num">41341414141411111114134141414141111111</div>
                    </div>
                    <div class="state">正在派送</div>
                  </div>
                </slot>
                <slot slot="title" name="title">
                  <div class="title_conent">奖品:小米</div>
                </slot>
              </van-card>
            </van-collapse-item>
          </van-collapse>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      activeNames: 1,
      winnerList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      refreshing: false,
      loading: false,
      finished: false,
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
          this.winnerList = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.winnerList.push(this.winnerList.length + 1);
        }
        this.loading = false;

        if (this.winnerList.length >= 40) {
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
 <style scoped>
/* @import url(); 引入css类 */
.back {
  color: #ffffff !important;
  font-size: 20px;
}
.winner_title,
.winner_time {
  text-align: center;
}
.winner_title {
  letter-spacing: 2px;
  color: orange;
}
.winner_time {
  color: #b5b5b5;
}
.title_conent {
  font-size: 18px;
}
.content_right {
  font-size: 14px;
}
.ydh {
  letter-spacing: 1px;
  padding-top: 2px;
}
.ydh_num {
  overflow: hidden;
}
.state {
  text-align: right;
  color: #a79e9e;
}
</style>
