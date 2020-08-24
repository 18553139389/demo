<template>
  <div>
    <main-header :text="text" @back="back"></main-header>
    <keep-alive>
      <div class="contain">
        <ul class="nav">
          <li v-for="(v,k) in list" :key="k" @click="change(k)" :class="{active:active == k}">
            {{v.title}}
          </li>
        </ul>
        <scroll :click="clicks" class="wrapper_box" v-if="active == 0">
          <div class="wrapper">
            <div class="order" v-for="(v,k) in listData1" :key="k">
              <h3 class="title">{{v.platesNumber}}</h3>
              <ul class="content">
                <li class="content_list">
                  <span>通行证种类：</span>
                  <p>{{v.categoryName}}</p>
                </li>
                <li class="content_list">
                  <span>号牌种类：</span>
                  <p>{{v.platesCategory}}</p>
                </li>
                <li class="content_list">
                  <span>车牌号：</span>
                  <p>{{v.platesNumber}}</p>
                </li>
                <li class="content_list">
                  <span>运送货物名称：</span>
                  <p>{{v.carriedGoodsName}}</p>
                </li>
                <li class="content_list" v-if="v.routesPassage">
                  <span>通行路线：</span>
                  <p>{{v.routesPassage}}</p>
                </li>
                <li class="content_list" v-if="v.carSb">
                  <span>通行区域：</span>
                  <p>{{v.carSb}}</p>
                </li>
                <li class="content_list">
                  <span>通行时间：</span>
                  <p>{{v.timePassage}}</p>
                </li>
                <li class="content_list">
                  <span>目的地：</span>
                  <p>{{v.destination}}</p>
                </li>
                <!-- <li class="content_list">
									<span>区域审核单位：</span>
									<p>{{v.office.name}}</p>
								</li> -->
              </ul>
              <div class="detail" @click="goDetail(active,v.id)">查看详情》</div>
            </div>
          </div>
        </scroll>
        <scroll :click="clicks" class="wrapper_box" v-if="active == 1">
          <div class="wrapper">
            <div class="order" v-for="(v,k) in listData2" :key="k">
              <h3 class="title" style="background: #17ACE6;">{{v.platesNumber}}</h3>
              <ul class="content">
                <li class="content_list">
                  <span>通行证种类：</span>
                  <p>{{v.categoryName}}</p>
                </li>
                <li class="content_list">
                  <span>号牌种类：</span>
                  <p>{{v.platesCategory}}</p>
                </li>
                <li class="content_list">
                  <span>车牌号：</span>
                  <p>{{v.platesNumber}}</p>
                </li>
                <li class="content_list">
                  <span>运送货物名称：</span>
                  <p>{{v.carriedGoodsName}}</p>
                </li>
                <li class="content_list" v-if="v.routesPassage">
                  <span>通行路线：</span>
                  <p>{{v.routesPassage}}</p>
                </li>
                <li class="content_list" v-if="v.carSb">
                  <span>通行区域：</span>
                  <p>{{v.carSb}}</p>
                </li>
                <li class="content_list">
                  <span>通行时间：</span>
                  <p>{{v.timePassage}}</p>
                </li>
                <li class="content_list">
                  <span>目的地：</span>
                  <p>{{v.destination}}</p>
                </li>
                <!-- <li class="content_list">
									<span>区域审核单位：</span>
									<p>{{v.office.name}}</p>
								</li> -->
              </ul>
              <div class="detail" @click="goDetail(active,v.id)">查看详情》</div>
            </div>
          </div>
        </scroll>
        <scroll :click="clicks" class="wrapper_box" v-if="active == 2">
          <div class="wrapper">
            <div class="order" v-for="(v,k) in listData3" :key="k">
              <h3 class="title" style="background: #D4D4D4;">{{v.platesNumber}}</h3>
              <img class="icon" src="../../static/img/no.png" alt="">
              <ul class="content">
                <li class="content_list">
                  <span>通行证种类：</span>
                  <p>{{v.categoryName}}</p>
                </li>
                <li class="content_list">
                  <span>号牌种类：</span>
                  <p>{{v.platesCategory}}</p>
                </li>
                <li class="content_list">
                  <span>车牌号：</span>
                  <p>{{v.platesNumber}}</p>
                </li>
                <li class="content_list">
                  <span>运送货物名称：</span>
                  <p>{{v.carriedGoodsName}}</p>
                </li>
                <li class="content_list" v-if="v.routesPassage">
                  <span>通行路线：</span>
                  <p>{{v.routesPassage}}</p>
                </li>
                <li class="content_list" v-if="v.carSb">
                  <span>通行区域：</span>
                  <p>{{v.carSb}}</p>
                </li>
                <li class="content_list">
                  <span>通行时间：</span>
                  <p>{{v.timePassage}}</p>
                </li>
                <li class="content_list">
                  <span>目的地：</span>
                  <p>{{v.destination}}</p>
                </li>
                <!-- <li class="content_list">
									<span>区域审核单位：</span>
									<p>{{v.office.name}}</p>
								</li> -->
              </ul>
              <div class="detail" @click="goDetail(active,v.id)">查看详情》</div>
            </div>
          </div>
        </scroll>
        <scroll :click="clicks" class="wrapper_box" v-if="active == 3">
          <div class="wrapper">
            <div class="order" v-for="(v,k) in listData4" :key="k">
              <h3 class="title" style="background: #D4D4D4;">{{v.platesNumber}}</h3>
              <img class="icon" src="../../static/img/dated.png" alt="">
              <ul class="content">
                <li class="content_list">
                  <span>通行证种类：</span>
                  <p>{{v.categoryName}}</p>
                </li>
                <li class="content_list">
                  <span>号牌种类：</span>
                  <p>{{v.platesCategory}}</p>
                </li>
                <li class="content_list">
                  <span>车牌号：</span>
                  <p>{{v.platesNumber}}</p>
                </li>
                <li class="content_list">
                  <span>运送货物名称：</span>
                  <p>{{v.carriedGoodsName}}</p>
                </li>
                <li class="content_list" v-if="v.routesPassage">
                  <span>通行路线：</span>
                  <p>{{v.routesPassage}}</p>
                </li>
                <li class="content_list" v-if="v.carSb">
                  <span>通行区域：</span>
                  <p>{{v.carSb}}</p>
                </li>
                <li class="content_list">
                  <span>通行时间：</span>
                  <p>{{v.timePassage}}</p>
                </li>
                <li class="content_list">
                  <span>目的地：</span>
                  <p>{{v.destination}}</p>
                </li>
                <!-- <li class="content_list">
									<span>区域审核单位：</span>
									<p>{{v.office.name}}</p>
								</li> -->
              </ul>
              <div class="detail" @click="goDetail(active,v.id)">查看详情》</div>
            </div>
          </div>
        </scroll>
      </div>
    </keep-alive>
    <div class="no" v-if="show">
      <img src="../../static/img/warning.png" alt="">
      <span>暂没有此通行证的详情内容</span>
    </div>
    <div class="loading" v-if="loading">
      <van-loading type="spinner" color="white" />
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/component/mainHeader'
  import Scroll from '@/components/component/scroll'
  import Request from '@util/request'
  import {
    Toast,
    Loading
  } from 'vant'

  export default {
    data() {
      return {
        text: '通行证管理',
        active: 0,
        clicks: true,
        list: [{
            title: '未审核'
          },
          {
            title: '已审核'
          },
          {
            title: '未通过'
          },
          {
            title: '已失效'
          }
        ],
        state: 0,
        listData1: [],
        listData2: [],
        listData3: [],
        listData4: [],
        show: false,
        uid: '',
        loading: false,
      }
    },
    components: {
      MainHeader,
      Scroll
    },
    created() {
      let obj = JSON.parse(localStorage.getItem('member'))
      this.uid = obj.id
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.goState1()
      },
      goState1() {
        let self = this
        this.loading = true
        let id = localStorage.getItem('id')
        let datas = {
          uid: self.uid,
          status: 0
        }
        Request.postRequest('api/licence/tPermit/listByStatus', datas).then(res => {
          console.log(res)
          if (res.data.success == true) {
            if (res.data.body.permits.length > 0) {
              self.show = false
              self.loading = false
              self.listData1 = res.data.body.permits
              Request.postRequest('api/licence/region/list').then(response => {
                if (response.data.success == true) {
                  if (response.data.body !== undefined || response.data.body !== {}) {
                    for (let i = 0; i < response.data.body.list.length; i++) {
                      for (let j = 0; j < self.listData1.length; j++) {
                        if (self.listData1[j]['regions'].id.indexOf(',') > -1) {
                          let arr = []
                          arr = self.listData1[j]['regions'].id.split(',')
                          for (let k = 0; k < arr.length; k++) {
                            if (response.data.body.list[i].id == arr[k]) {
                              self.listData1[j]['carSb'] += response.data.body.list[i].name + ','
                            }
                          }
                        } else {
                          if (response.data.body.list[i].id == self.listData1[j]['regions'].id) {
                            self.listData1[j]['carSb'] += response.data.body.list[i].name + ','
                          }
                        }
                      }
                    }
                    for (let j = 0; j < self.listData1.length; j++) {
                      self.listData1[j]['carSb'] = self.listData1[j]['carSb'].substr(0, self.listData1[j][
                        'carSb'
                      ].length - 1)
                    }
                  }
                }s
              })
            } else {
              self.show = true
              self.loading = false
            }
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goState2() {
        let self = this
        this.loading = true
        let id = localStorage.getItem('id')
        let datas = {
          uid: self.uid,
          status: 1
        }
        Request.postRequest('api/licence/tPermit/listByStatus', datas).then(res => {
          console.log(res)
          if (res.data.success == true) {
            if (res.data.body.permits.length > 0) {
              self.show = false
              self.loading = false
              self.listData2 = res.data.body.permits
              Request.postRequest('api/licence/region/list').then(response => {
                console.log(response)
                if (response.data.success == true) {
                  for (let i = 0; i < response.data.body.list.length; i++) {
                    for (let j = 0; j < self.listData2.length; j++) {
                      if (self.listData2[j]['regions'].id.indexOf(',') > -1) {
                        let arr = []
                        arr = self.listData2[j]['regions'].id.split(',')
                        for (let k = 0; k < arr.length; k++) {
                          if (response.data.body.list[i].id == arr[k]) {
                            self.listData2[j]['carSb'] += response.data.body.list[i].name + ','
                          }
                        }
                      } else {
                        if (response.data.body.list[i].id == self.listData2[j]['regions'].id) {
                          self.listData2[j]['carSb'] += response.data.body.list[i].name + ','
                        }
                      }
                    }
                  }
                  for (let j = 0; j < self.listData2.length; j++) {
                    self.listData2[j]['carSb'] = self.listData2[j]['carSb'].substr(0, self.listData2[j]['carSb']
                      .length - 1)
                  }
                }
              })
            } else {
              self.show = true
              self.loading = false
            }
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goState3() {
        let self = this
        this.loading = true
        let id = localStorage.getItem('id')
        let datas = {
          uid: self.uid,
          status: 2
        }
        Request.postRequest('api/licence/tPermit/listByStatus', datas).then(res => {
          console.log(res)
          if (res.data.success == true) {
            if (res.data.body.permits.length > 0) {
              self.show = false
              self.loading = false
              self.listData3 = res.data.body.permits
              Request.postRequest('api/licence/region/list').then(response => {
                if (response.data.success == true) {
                  for (let i = 0; i < response.data.body.list.length; i++) {
                    for (let j = 0; j < self.listData3.length; j++) {
                      if (self.listData3[j]['regions'].id.indexOf(',') > -1) {
                        let arr = []
                        arr = self.listData3[j]['regions'].id.split(',')
                        for (let k = 0; k < arr.length; k++) {
                          if (response.data.body.list[i].id == arr[k]) {
                            self.listData3[j]['carSb'] += response.data.body.list[i].name + ','
                          }
                        }
                      } else {
                        if (response.data.body.list[i].id == self.listData3[j]['regions'].id) {
                          self.listData3[j]['carSb'] += response.data.body.list[i].name + ','
                        }
                      }
                    }
                  }
                  for (let j = 0; j < self.listData3.length; j++) {
                    self.listData3[j]['carSb'] = self.listData3[j]['carSb'].substr(0, self.listData3[j]['carSb']
                      .length - 1)
                  }
                }
              })
            } else {
              self.show = true
              self.loading = false
            }
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goState4() {
        let self = this
        this.loading = true
        let id = localStorage.getItem('id')
        let datas = {
          uid: self.uid,
          status: 3
        }
        Request.postRequest('api/licence/tPermit/listByStatus', datas).then(res => {
          console.log(res)
          if (res.data.success == true) {
            if (res.data.body.permits.length > 0) {
              self.show = false
              self.loading = false
              self.listData4 = res.data.body.permits
              Request.postRequest('api/licence/region/list').then(response => {
                if (response.data.success == true) {
                  for (let i = 0; i < response.data.body.list.length; i++) {
                    for (let j = 0; j < self.listData4.length; j++) {
                      if (self.listData4[j]['regions'].id.indexOf(',') > -1) {
                        let arr = []
                        arr = self.listData4[j]['regions'].id.split(',')
                        for (let k = 0; k < arr.length; k++) {
                          if (response.data.body.list[i].id == arr[k]) {
                            self.listData4[j]['carSb'] += response.data.body.list[i].name + ','
                          }
                        }
                      } else {
                        if (response.data.body.list[i].id == self.listData4[j]['regions'].id) {
                          self.listData4[j]['carSb'] += response.data.body.list[i].name + ','
                        }
                      }
                    }
                  }
                  for (let j = 0; j < self.listData4.length; j++) {
                    self.listData4[j]['carSb'] = self.listData4[j]['carSb'].substr(0, self.listData4[j]['carSb']
                      .length - 1)
                  }
                }
              })
            } else {
              self.show = true
              self.loading = false
            }
          }
        }).catch(res => {
          console.log(res)
        })
      },
      change(k) {
        this.active = k
        if (k == 0) {
          this.goState1()
        } else if (k == 1) {
          this.goState2()
        } else if (k == 2) {
          this.goState3()
        } else if (k == 3) {
          this.goState4()
        }
      },
      goDetail(state, id) {
        if (state == 3) {
          this.$router.push({
            name: 'detail_four',
            params: {
              state: state,
              id: id
            }
          })
        } else if (state == 2) {
          this.$router.push({
            name: 'detail_three',
            params: {
              state: state,
              id: id
            }
          })
        } else if (state == 1) {
          this.$router.push({
            name: 'detail_two',
            params: {
              state: state,
              id: id
            }
          })
        } else if (state == 0) {
          this.$router.push({
            name: 'detail_one',
            params: {
              state: state,
              id: id
            }
          })
        }
      },
      back() {
        this.$router.push('/first')
      }
    }
  }
</script>

<style scoped="scoped">
  .contain {
    width: 100%;
  }

  .nav {
    width: 100%;
    padding: 2.3rem 0.6rem 0;
    height: 1.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav li {
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 15px;
    color: #333;
    box-sizing: border-box;
  }

  .wrapper_box {
    width: 90%;
    position: absolute;
    top: 3.3rem;
    left: 5%;
    bottom: 0.4rem;
    overflow: hidden;
  }

  .active {
    color: #17ACE6 !important;
    border-bottom: 3px solid #17ACE6;
  }

  .order {
    width: 90%;
    margin-left: 5%;
    margin-top: 5%;
    margin-bottom: 5%;
    border-radius: 16px;
    box-shadow: 1px 1px 6px #ccc;
    overflow: hidden;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .title {
    width: 100%;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 15px;
    color: #fff;
    text-align: center;
    background: #F64B17;
  }

  .content {
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }

  .content_list {
    width: 100%;
    display: flex;
    font-size: 15px;
    color: #333;
    margin-bottom: 0.4rem;
    line-height: 22px;
  }

  .content_list span {
    display: inline-block;
    min-width: 30%;
  }

  .detail {
    width: 100%;
    height: 1.4rem;
    line-height: 1.4rem;
    font-size: 15px;
    color: #999;
    padding: 0 0.4rem;
    box-sizing: border-box;
  }

  .icon {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 2.2rem;
    right: 0.8rem;
  }

  .no {
    width: 80%;
    height: 6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -40%;
    margin-top: -3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff !important;
  }

  .no img {
    width: 40%;
  }

  .no span {
    font-size: 15px;
    margin-top: 0.8rem;
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
