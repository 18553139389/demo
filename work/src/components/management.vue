<template>
  <div>
    <main-header :text="text" @back="back"></main-header>
    <div class="contain">
      <ul class="nav">
        <li @click="changeTab(0)" :class="{'active':tabType == 0}">未审核</li>
        <li @click="changeTab(1)" :class="{'active':tabType == 1}">已审核</li>
        <li @click="changeTab(2)" :class="{'active':tabType == 2}">未通过</li>
        <li @click="changeTab(3)" :class="{'active':tabType == 3}">已失效</li>
      </ul>
      <mescroll-vue ref="mescroll0" v-show="tabType==0" :down="getMescrollDown(0)" :up="getMescrollUp(0)" @init="mescrollInit0">
        <!-- <scroll :click="clicks" class="wrapper_box" v-if="active == 0"> -->
        <div class="wrapper" id="dataList0">
          <div class="order" v-for="(v,k) in tab0.list" :key="k">
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
            <div class="detail" @click="goDetail(tabType,v.id)">查看详情》</div>
          </div>
        </div>
        <!-- </scroll> -->
      </mescroll-vue>
      <mescroll-vue ref="mescroll1" v-show="tabType==1" :down="getMescrollDown(1)" :up="getMescrollUp(1)" @init="mescrollInit1">
        <!-- <scroll :click="clicks" class="wrapper_box" v-if="active == 1"> -->
        <div class="wrapper" id="dataList1">
          <div class="order" v-for="(v,k) in tab1.list" :key="k">
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
            </ul>
            <div class="detail" @click="goDetail(tabType,v.id)">查看详情》</div>
          </div>
        </div>
        <!-- </scroll> -->
      </mescroll-vue>
      <mescroll-vue ref="mescroll2" v-show="tabType==2" :down="getMescrollDown(2)" :up="getMescrollUp(2)" @init="mescrollInit2">
        <!-- <scroll :click="clicks" class="wrapper_box" v-if="active == 2"> -->
        <div class="wrapper" id="dataList2">
          <div class="order" v-for="(v,k) in tab2.list" :key="k">
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
            </ul>
            <div class="detail" @click="goDetail(tabType,v.id)">查看详情》</div>
          </div>
        </div>
        <!-- </scroll> -->
      </mescroll-vue>
      <mescroll-vue ref="mescroll3" v-show="tabType==3" :up="getMescrollUp(3)" @init="mescrollInit3">
        <!-- <scroll :click="clicks" class="wrapper_box" v-if="active == 3"> -->
        <div class="wrapper" id="dataList3">
          <div class="order" v-for="(v,k) in tab3.list" :key="k">
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
            </ul>
            <div class="detail" @click="goDetail(tabType,v.id)">查看详情》</div>
          </div>
        </div>
        <!-- </scroll> -->
      </mescroll-vue>
    </div>
    <!-- <div class="no" v-if="show">
      <img src="../../static/img/warning.png" alt="">
      <span>没有符合条件的通行证</span>
    </div>
    <div class="loading" v-if="loading">
      <van-loading type="spinner" color="white" />
    </div> -->
  </div>
</template>

<script>
  import MainHeader from '@/components/component/mainHeader'
  import Scroll from '@/components/component/scroll'
  import MescrollVue from 'mescroll.js/mescroll.vue'
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
        tab0: {
          mescroll: null,
          list: [],
          isListInit: false
        }, // 未审核
        tab1: {
          mescroll: null,
          list: [],
          isListInit: false
        }, // 已审核
        tab2: {
          mescroll: null,
          list: [],
          isListInit: false
        }, // 未通过
        tab3: {
          mescroll: null,
          list: [],
          isListInit: false
        }, // 已失效
        tabType: 0 // 菜单类型
      }
    },
    components: {
      MainHeader,
      Scroll,
      MescrollVue
    },
    created() {
      let obj = JSON.parse(localStorage.getItem('member'))
      this.uid = obj.id
    },
    methods: {
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit0(mescroll) {
        mescroll.tabType = 0; // 加入标记,便于在回调中取到对应的list
        this.tab0.mescroll = mescroll;
      },
      mescrollInit1(mescroll) {
        mescroll.tabType = 1;
        this.tab1.mescroll = mescroll;
      },
      mescrollInit2(mescroll) {
        mescroll.tabType = 2;
        this.tab2.mescroll = mescroll;
      },
      mescrollInit3(mescroll) {
        mescroll.tabType = 3;
        this.tab3.mescroll = mescroll;
      },
      // 多mescroll的配置,需通过方法获取,保证每个配置是单例
      getMescrollDown(tabType) {
        let isAuto = tabType === 0; // 第一个mescroll传入true,列表自动加载
        return {
          auto: isAuto,
          callback: this.downCallback
        }
      },
      getMescrollUp(tabType) {
        let emptyWarpId = 'dataList' + tabType
        return {
          auto: false,
          callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
          noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
          htmlNodata: '<p class="upwarp-nodata">-- 没有更多数据 --</p>',
          empty: {
            warpId: emptyWarpId, // 父布局的id;
            icon: 'http://www.mescroll.com/img/mescroll-empty.png', // 图标,默认null
            tip: '没有符合条件的通行证', // 提示
            // btntext: '去逛逛 >',
            btnClick: function() { // 点击按钮的回调,默认null
              alert('点击了按钮,具体逻辑自行实现')
            }
          },
          toTop: { // 配置回到顶部按钮
            src: 'http://www.mescroll.com/img/mescroll-totop.png' // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
          }
        }
      },
      /* 下拉刷新的回调 */
      downCallback(mescroll) {
        // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
        if (mescroll.tabType === 0) {
          this.tab0.list = []
        } else if (mescroll.tabType === 1) {
          this.tab1.list = []
        } else if (mescroll.tabType === 2) {
          console.log(mescroll.tabType)
          this.tab2.list = []
        } else if (mescroll.tabType === 3) {
          this.tab3.list = []
        }
        mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
      },
      /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
      upCallback(page, mescroll) {
        let pageNum = mescroll.num // 页码, 默认从1开始
        page.size = 3 // 页长, 默认每页10条
        if (mescroll.tabType === 0) {
          // 全部
          this.tab0.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
          this.goState(mescroll, mescroll.tabType, page.num, this.tab0)
        } else if (mescroll.tabType === 1) {
          // 奶粉
          this.tab1.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
          this.goState(mescroll, mescroll.tabType, page.num, this.tab1)
        } else if (mescroll.tabType === 2) {
          // 面膜
          this.tab2.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
          this.goState(mescroll, mescroll.tabType, page.num, this.tab2)
        } else if (mescroll.tabType === 3) {
          // 图书
          this.tab3.isListInit = true; // 标记列表已初始化,保证列表只初始化一次
          this.goState(mescroll, mescroll.tabType, page.num, this.tab3)
        }
      },
      goState(obj, type, page, lists) {
        let self = this
        let id = localStorage.getItem('id')
        let datas = {
          uid: self.uid,
          status: type,
          pageNow: page
        }
        Request.postRequest('api/licence/tPermit/listByStatus', datas).then(res => {
          console.log(res)
          if (res.data.success == true) {
            let list = res.data.body.permits
            if(list && list.length > 0) {
              for(let j=0;j<list.length;j++) {
                lists.list.push(list[j])
              }
              Request.postRequest('api/licence/region/list').then(response => {
                if (response.data.success == true) {
                  if (response.data.body !== undefined || response.data.body !== {}) {
                    for (let i = 0; i < response.data.body.list.length; i++) {
                      for (let j = 0; j < lists.list.length; j++) {
                        if (lists.list[j]['regions'].id.indexOf(',') > -1) {
                          let arr = []
                          arr = lists.list[j]['regions'].id.split(',')
                          for (let k = 0; k < arr.length; k++) {
                            if (response.data.body.list[i].id == arr[k]) {
                              lists.list[j]['carSb'] += response.data.body.list[i].name + ','
                            }
                          }
                        } else {
                          if (response.data.body.list[i].id == lists.list[j]['regions'].id) {
                            lists.list[j]['carSb'] += response.data.body.list[i].name + ','
                          }
                        }
                      }
                    }
                    for (let j = 0; j < lists.list.length; j++) {
                      lists.list[j]['carSb'] = lists.list[j]['carSb'].substr(0, lists.list[j]['carSb'].length - 1)
                    }
                  }
                }
              })
            }

            let curPageData = 1
            if(list) {
              // 接口返回的当前页数据列表 (数组)
              curPageData = list.length
            }
            // 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
            let totalPage = res.data.body.totalPage
            obj.endByPage(curPageData, totalPage)
          }
        }).catch(res => {
          console.log(res)
          if (page === 1) lists.isListInit = false;
          obj.endErr(); // 联网失败的回调,隐藏下拉刷新的状态
        })
      },
      // 切换菜单
      changeTab(type) {
        let curTab = this.getTabData(this.tabType); // 当前列表
        let newTab = this.getTabData(type); // 新转换的列表
        curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
        this.tabType = type // 切换菜单
        if (!newTab.isListInit) {
          newTab.mescroll.triggerDownScroll(); // 加载列表
        } else {
          setTimeout(() => {
            // 检查新转换的列表是否需要显示回到到顶按钮
            var curScrollTop = newTab.mescroll.getScrollTop();
            if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
              newTab.mescroll.showTopBtn();
            } else {
              newTab.mescroll.hideTopBtn();
            }
          }, 30)
        }
      },
      // 获取菜单对应的数据
      getTabData(tabType) {
        if (tabType == null) tabType = this.tabType;
        if (tabType === 0) {
          return this.tab0;
        } else if (tabType === 1) {
          return this.tab1;
        } else if (tabType === 2) {
          return this.tab2;
        } else if (tabType === 3) {
          return this.tab3;
        }
      },
      beforeRouteEnter(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
        next(vm => {
          let curMescroll = vm.$refs['mescroll' + vm.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
          curMescroll && curMescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
        })
      },
      beforeRouteLeave(to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
        let curMescroll = this.$refs['mescroll' + this.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
        curMescroll && curMescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
        next()
      },
      goState1() {
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

  .mescroll {
    width: 90%;
    position: fixed;
    top: 3.3rem;
    left: 5%;
    bottom: 0.4rem;
    height: auto;
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
    position: relative;
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
    width: 70px;
    height: 70px;
    position: absolute;
    top: 2.4rem;
    right: 0.4rem;
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
