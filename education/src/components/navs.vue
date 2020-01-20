<template>
  <nav class="navs">
    <ul class="nav">
      <li v-for="(v,k) in nav" :key="k" :class="itemIndex == k ? 'active' : ''" @click="change(k)" @mouseenter="changeNav(k)">{{v}}</li>
      <li class="user" @mouseenter="showTab" @mouseleave="hideTab" v-if="uid">
        <img :src="list.userIcon ? list.userIcon : '../../static/images/list.jpg'" alt="">
        <div class="name">{{list.name}}</div>
        <div class="tabs" v-show="show">
          <div class="tab" @click="goPerson">个人中心</div>
          <div class="tab" @click="goForget">修改密码</div>
          <div class="tab" style="border-bottom: none;" @click="goLogin">退出登录</div>
        </div>
      </li>
      <li class="user" @click="goLogin" v-if="!uid">
        <div style="font-size: 15px;">登录</div>
      </li>
    </ul>
  </nav>
</template>

<script>
  import Request from '../../utils/request.js'
  export default {
    props: ['itemIndex'],
    data() {
      return {
        nav: ['首页', '智能填报', '大数据查询', '专家一对一', '智能选科', '关于我们', '常见问题'],
        uid: '',
        list: {},
        show: false
      }
    },
    created() {
      if(sessionStorage.getItem("uid")) {
        this.uid = sessionStorage.getItem("uid")
        this.init()
      }
    },
    methods: {
      init() {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/personalCenter', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.list = res.data
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      change(k) {
        this.$emit('change', k)
      },
      goLogin() {
        sessionStorage.clear()
        this.$router.push({
          name: 'cardLogin'
        })
      },
      showTab() {
        this.show = true
      },
      hideTab() {
        this.show = false
      },
      goPerson() {
        this.$router.push({
          name: 'person'
        })
      },
      goForget() {
        this.$router.push({
          name: 'login'
        })
      },
      changeNav(k) {
        this.$emit('changeNav',k)
      }
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 768px) {
    .navs {
      width: 100%;
      height: 50px;
      margin: 0 auto;
      background: rgb(255, 3, 80);
    }

    .nav {
      width: 100%;
      height: 50px;
      margin: 0 auto;
      display: flex;
    }
  }

  @media screen and (min-width: 769px) {
    .navs {
      width: 100%;
      height: 50px;
      margin: 0 auto;
      background: rgb(255, 3, 80);
    }

    .nav {
      width: 1200px;
      height: 50px;
      margin: 0 auto;
      display: flex;
    }
  }

  .nav>li {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
  }

  .nav>li:hover {
    cursor: pointer;
  }

  .user {
    position: relative;
    z-index: 9999;
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user>img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
  }

  .user>div {
    margin-left: 10px;
  }

  .active {
    background: rgb(190, 1, 59);
  }

  .tabs {
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
    z-index: 9999;
  }

  .tab {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    color: #FF0350;
    cursor: pointer;
  }

  .tab:hover {
    background: #FF0350;
    color: #FFFFFF;
  }
</style>
