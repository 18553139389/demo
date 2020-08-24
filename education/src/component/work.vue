<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="list">
      <div class="list-title">专业与就业</div>
      <div class="detail">
        <div class="detail-list" v-for="(v,k) in list" :key="k" @click="goDetail(v.id)">
          <div class="circle"></div>
          <div class="time">{{v.adtime}}</div>
          <div class="content">{{v.title}}</div>
        </div>
        <div class="page" v-if="show && list.length > 0">
          <Page :total="totalPage" :page-size="10" @on-change="getList" />
        </div>
      </div>
    </div>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
    <footers v-if="control"></footers>
  </div>
</template>

<script>
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        itemIndex: 1,
        control: true,
        produceList: {},
        greatestList: {},
        companyList: {},
        totalPage: 0,
        list: [],
        show: false,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers
    },
    created() {
      this.getList(1)
      this.pos()
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    methods: {
      getList(page) {
        let self = this
        let datas = {
          nowPage: page
        }
        Request.postRequest('jinxiuqiancheng/api/employmentList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.list = []
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              this.totalPage = res.data.totalPage * 10
              this.list = res.data.dataList
              this.show = true
            } else {
              this.show = false
            }
            this.$nextTick(() => {
              this.pos()
            })
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      unescape(html) {
        return html
          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'")
          .replace(/&nbsp;/g, "''");
      },
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      goDetail(id) {
        sessionStorage.setItem("detailId", id)
        this.$router.push({
          name: 'workDetail'
        })
      },
      change(k) {
        if (k == 0) {
          this.$router.push({
            name: 'index'
          })
        } else if (k == 1) {
          this.$router.push({
            name: 'zhineng'
          })
        } else if (k == 2) {
          this.$router.push({
            name: 'bigData'
          })
        } else if (k == 3) {
          this.$router.push({
            name: 'expert'
          })
        } else if (k == 4) {
          this.$router.push({
            name: 'xuanke'
          })
        } else if (k == 5) {
          this.$router.push({
            name: 'about'
          })
        } else if (k == 6) {
          this.$router.push({
            name: 'question'
          })
        }
      },
      changeNav(k) {
        this.itemIndex = k
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 1024px) {
    .list {
      width: 1200px;
      margin: 40px auto 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      width: 100%;
      margin: 40px 0 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .wrapper {
    width: 100%;
    min-height: 100vh;
    background: #f6f6f6;
  }

  .list-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    position: relative;
    padding-left: 18px;
    box-sizing: border-box;
  }

  .list-title:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 14px;
    top: 19px;
    left: 0;
    background: #FF0350;
    border-radius: 30px;
  }

  .detail {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    border-radius: 4px;
    background: #fff;
    margin-top: 24px;
  }

  .detail-list {
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    cursor: pointer;
  }

  .circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #999;
    margin-right: 24px;
  }

  .time {
    color: #999;
    margin-right: 24px;
  }

  .content {
    color: #333;
  }

  .page {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
