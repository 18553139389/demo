<template>
  <div class="problem-box">
    <main-header :text="text" @back="back"></main-header>
    <div class="problem-zi">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="problemDetails(item.url)">
          <span>{{item.title}}</span>
          <span>
            <img src="../../../static/img/right.png" alt>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "常见问题",
      list: []
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.getshop();
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        window.history.go(-1);
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
    back() {
      this.$router.go(-1);
    },
    problemDetails(url) {
      this.$router.push({
        path: "/problemDetails",
        query: {
          url: url
        }
      });
    },
    getshop() {
      let goCarlist = {
        cmd: "commonProblems"
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.list = res.data.dataList;
            console.log(this.list);
          }
        })
        .catch(res => {
           
        });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.problem-zi {
  border-top: 1px solid #dedede;

  ul {
    margin-top: 70px;
    li {
      padding: 0 30px;
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid #dedede;
      display: flex;
      justify-content: space-between;
      span {
        color:#000;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>