<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 11:18:30
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-13 12:44:29
 * @Description: 
 -->
<!-- 新增地址 -->
<template>
  <div>
    <van-nav-bar :title="params.type==='add'?'新增地址':'修改地址'" class="header_title" @click-left="goBackFn">
      <!-- 使用插槽 -->
      <slot slot="left" name="left">
        <van-icon name="arrow-left" class="back" />
      </slot>
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="false"
      show-set-default
      show-search-result
      :address-info="adduserinfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from "@/assets/js/area.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      params: null,
      adduserinfo: {
        id: 1,
        name: "1",
        tel: "15123398335",
        province: "重庆市",
        city: "重庆市",
        county: "开州",
        addressDetail: "",
        areaCode: "500154",
        postalCode: "",
        isDefault: true
      }
    };
  },
  beforeCreate() {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.params = this.$route.params;
    if (this.params.type === "add") {
      this.adduserinfo = {
        id: 1,
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        postalCode: "",
        isDefault: false
      };
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  //方法(函数)
  methods: {
    goBackFn() {
      this.$router.go(-1);
    },
    onSave(content) {
    //   Toast("save");
      this.adduserinfo = content;
      console.log(this.adduserinfo);
    },
    onDelete() {
      Toast("delete");
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