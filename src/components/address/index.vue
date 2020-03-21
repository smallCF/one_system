<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 11:08:37
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-15 00:13:38
 * @Description: 
 -->
<!-- 地址列表 -->
<template>
  <div class="address_warp">
    <van-sticky>
      <van-nav-bar title="地址列表" class="header_title" @click-left="goBackFn">
        <!-- 使用插槽 -->
        <slot slot="left" name="left">
          <van-icon name="arrow-left" class="back" />
        </slot>
      </van-nav-bar>
    </van-sticky>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      chosenAddressId: null,
      list: [],
      userInfo: {},
      sumcount: 0,
      pagesize: 20,
      pagenum: 1
    };
  },
  beforeCreate() {
    this.userInfo = JSON.parse(localStorage.getItem("UserDate"));
    this.$http
      .post("address/page", { userId: this.userInfo.id })
      .then(res => {
        const { count, data, message, code } = res.data;
        if (code === "200") {
          this.list = data;
          for (var i = 0; i < data.length; i++) {
            var address = "";
            if (data[i].city === data[i].province) {
              address = data[i].city + data[i].county + data[i].addressDetail;
            } else {
              address =
                data[i].province +
                data[i].city +
                data[i].county +
                data[i].addressDetail;
            }
            if (this.list[i].isDefault === "false") {
              this.list[i].isDefault = false;
            } else {
              this.list[i].isDefault = true;
              if (!this.chosenAddressId) {
                this.chosenAddressId = this.list[i].id;
              }
            }
            this.list[i].address = address;
          }
          if (!this.chosenAddressId) {
            this.chosenAddressId = this.list[0].id;
          }
          this.sumcount = count;
        } else {
          this.$toast.fail(message);
        }
      })
      .catch(res => {});
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    onAdd() {
      this.$router.push({
        name: "NewAddress",
        params: {
          type: "add",
          id: 0
        }
      });
    },
    onEdit(item, index) {
      this.$router.push({
        name: "NewAddress",
        params: {
          type: "edit",
          id: this.list[index].id
        }
      });
    },
    goBackFn() {
      this.$router.go(-1);
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
.van-address-list__bottom {
  padding: 10px 16px;
}
</style>