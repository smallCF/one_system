<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 11:08:37
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-13 11:50:43
 * @Description: 
 -->
<!-- 地址列表 -->
<template>
  <div>
    <van-nav-bar title="地址列表" class="header_title" @click-left="goBackFn">
      <!-- 使用插槽 -->
      <slot slot="left" name="left">
        <van-icon name="arrow-left" class="back" />
      </slot>
    </van-nav-bar>
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
import { Toast } from 'vant';
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    onAdd() {
      this.$router.push({
          name:"NewAddress",
          params:{
              type:"add",
              id:0
          }
      });
    },
    onEdit(item, index) {
      this.$router.push({
          name:"NewAddress",
          params:{
              type:"edit",
              id:this.list[index].id
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
</style>