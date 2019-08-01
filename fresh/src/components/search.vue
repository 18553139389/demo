<template>
  <div class="list" v-cloak>
    <div class="search">
      <img src="../../static/img/fanhui.png" alt @click="back" />
      <div class="type">
        <el-select v-model="value">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search_input">
        <van-search placeholder="请输入搜索关键词" v-model="value1" />
      </div>
      <span @click="goSearch">搜索</span>
    </div>
    <div class="history">
      <div class="h_box">
        <span>历史搜索</span>
        <img src="../../static/img/delete.png" alt @click="remove" />
      </div>
      <ul class="h_list">
        <li
          v-for="(item,index) in this.searchList"
          :key="index"
          @click="goSearchs(item.val)"
        >{{item.val}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Select } from "element-ui";
import { Tab, Tabs, Toast, Col } from "vant";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      value: 1,
      value1: "",
      options: [
        {
          value: 1,
          label: "商品"
        },
        {
          value: 2,
          label: "商家"
        }
      ],
      searchList: []
    };
  },
  created() {
    this.shou();
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/first");
        first = new Date().getTime();
        setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          plus.runtime.quit();
        }
      }
    };
  },
  methods: {
    remove() {
      localStorage.removeItem("search");
      this.shou();
    },
    shou() {
      this.searchList = JSON.parse(localStorage.getItem("search"));
    },
    goSearch() {
      if (this.value == 1) {
        if (this.value1 == "") {
          Toast("搜索内容不能为空");
          return;
        }
        this.$router.push("/search_product");
        let shopseach = {};
        shopseach.name = this.value1;
        localStorage.setItem("shopseach", JSON.stringify(shopseach));
      } else if (this.value == 2) {
        if (this.value1 == "") {
          Toast("搜索内容不能为空");
          return;
        }
        this.$router.push({
          name: "search_shop",
          params: {
            name: this.value1
          }
        });
        let shopssearch = {};
        shopssearch.name = this.value1;
        localStorage.setItem("shopssearch", JSON.stringify(shopssearch));
      }
      console.log(this.value1);
      let list = {
        val: this.value1
      };
      let searchArr = JSON.parse(localStorage.getItem("search")) || [];
      searchArr.unshift(list);
      localStorage.setItem("search", JSON.stringify(searchArr));
    },
    back() {
      this.$router.push("/first");
    },
    goSearchs(val) {
      console.log(val);
      if (this.value == 1) {
        this.$router.push({
          name: "search_product"
        });
        let shopseach = {};
        shopseach.name = val;
        localStorage.setItem("shopseach", JSON.stringify(shopseach));
      } else if (this.value == 2) {
        this.$router.push({
          name: "search_shop"
        });
        let shopssearch = {};
        shopssearch.name = val;
        localStorage.setItem("shopssearch", JSON.stringify(shopssearch));
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/variable';

[v-cloak] {
  display: none !important;
}

.list {
  width: 100%;

  .search {
    width: 100%;
    height: 80px;
    padding: $padding-top 0.4rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 0.3rem;
      height: 0.5rem;
    }

    .type {
      width: 24%;
      height: 34px;
      margin-left: 0.2rem;
    }

    .search_input {
      width: 60%;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }

  .history {
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
    border-top: 1px solid #eee;

    .h_box {
      width: 100%;
      padding: 0 0.1rem 0 0.2rem;
      box-sizing: border-box;
      border-left: 4px solid #6ed240;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 14px;
        color: #999;
      }

      img {
        width: 0.5rem;
        height: 0.6rem;
      }
    }

    .h_list {
      width: 100%;
      display: flex;
      margin-top: 0.5rem;
      flex-wrap: wrap;

      li {
        padding: 0 18px;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #F7F8FA;
        border-radius: 20px;
        font-size: 14px;
        color: #333;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
