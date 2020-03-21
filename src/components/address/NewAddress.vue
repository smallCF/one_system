<!--
 * @Author: GOOGOLX
 * @Date: 2020-03-13 11:18:30
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-15 00:09:43
 * @Description: 
 -->
<!-- 新增地址 -->
<template>
  <div>
    <van-nav-bar
      :title="params.type==='add'?'新增地址':'修改地址'"
      class="header_title"
      @click-left="goBackFn"
    >
      <!-- 使用插槽 -->
      <slot slot="left" name="left">
        <van-icon name="arrow-left" class="back" />
      </slot>
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="show1"
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
      show1: false,
      adduserinfo: {
        id: 1, //顺序id
        name: "1", //姓名
        tel: "15123398335", //电话
        province: "重庆市", //地区
        city: "重庆市", //城市
        county: "开州", //县
        addressDetail: "", //详细地址
        areaCode: "500154", //地区编码
        postalCode: "", //邮编
        isDefault: false //是否默认地址
      }
    };
  },
  beforeCreate() {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.params = this.$route.params;
    this.adduserinfo.id = this.params.id;
    if (this.params.type === "add") {
      this.adduserinfo = {
        id: null,
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        addressDetail: "",
        areaCode: "",
        postalCode: "",
        isDefault: false,
        userId: ""
      };
    } else {
      this.show1 = true;
      this.$http
        .post("address/getid", this.adduserinfo)
        .then(res => {
          const { count, message, code, data } = res.data;
          if (code === "200") {
            this.adduserinfo = data;
            if (this.adduserinfo.isDefault === "false") {
              this.adduserinfo.isDefault = false;
            } else {
              this.adduserinfo.isDefault = true;
            }
          } else {
          }
        })
        .catch((err) => {});
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
      this.adduserinfo.userId = localStorage.getItem("userId");
      if (this.params.type === "add") {
        this.$http
          .post("address/add", this.adduserinfo)
          .then(res => {
            const { count, message, data, code } = res.data;
            if (code === "200") {
              this.$toast.success(message);
              this.goBackFn();
            } else {
              this.$toast.success(message);
            }
          })
          .catch((err) => {});
      } else {
        this.$http
          .post("address/update", this.adduserinfo)
          .then(res => {
            const { count, message, data, code } = res.data;
            if (code === "200") {
              this.$toast.success("修改成功");
              this.goBackFn();
            } else {
              this.$toast.success(message);
            }
          })
          .catch((err) => {});
      }
    },
    onDelete() {
      this.$http
        .post("address/delete", this.adduserinfo)
        .then(res => {
          const { count, message, data, code } = res.data;
          if (code === "200") {
            this.$toast.success("删除成功");
            this.goBackFn();
          } else {
            this.$toast.success(message);
          }
        })
        .catch((err) => {});
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