<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 要缓存的组件
    }
  }
}
</script>

<style>
  html,body {
    width: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    font-family: Microsoft YaHei;
  }

  .ivu-progress-success .ivu-progress-bg {
    background: #FF0350;
  }

  .ivu-progress-success .ivu-progress-text {
    color: #FF0350;
  }

  .ivu-progress-bg {
    background: #FF0350;
  }

  .ivu-table-cell {
    line-height: 20px;
  }

  .ivu-table-cell {
    width: 100%;
    text-align: center;
  }

  table tr th {
    border: none;
  }

  .progress {
    background: none;
    width: 60px;
    height: 60px;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-right: 0 !important;
  }
</style>
