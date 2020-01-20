<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <keep-alive>
      <div class="list">
        <div class="list-item">
          <div class="titles">
            <div>个人资料</div>
            <div class="log" @click="editor">编辑</div>
          </div>
          <div class="message">
            <img :src="userList.userIcon" alt="">
            <div class="message-list">
              <ul class="item">
                <li>
                  <img src="../../static/images/denglu_zhanghao.png" alt="">
                  <div style="margin-left: 8px;">姓名：<span style="color: #999;">{{userList.name}}</span></div>
                </li>
                <li>
                  <img src="../../static/images/zhinengxianbao_xingbie.png" alt="">
                  <div style="margin-left: 8px;">性别：<span v-if="userList.sex == 0" style="color: #999;">男</span><span
                      v-if="userList.sex == 1" style="color: #999;">女</span></div>
                </li>
                <li>
                  <img src="../../static/images/zhinengxianbao_xueke.png" alt="">
                  <div style="margin-left: 8px;">
                    文理科：
                    <span v-if="userList.wlType == 0" style="color: #999;">文科</span>
                    <span v-if="userList.wlType == 1" style="color: #999;">理科</span>
                    <span v-if="userList.wlType == 2" style="color: #999;">不限</span>
                  </div>
                </li>
                <li>
                  <img src="../../static/images/zhinengtianbao_dizhi.png" alt="">
                  <div style="margin-left: 8px;">地区：<span style="color: #999;">{{userList.province}}</span></div>
                </li>
              </ul>
              <ul class="item">
                <li>
                  <img src="../../static/images/zhinengxianbao_xuexiao.png" alt="">
                  <div style="margin-left: 8px;">学校：<span style="color: #999;">{{userList.school}}</span></div>
                </li>
                <li>
                  <img src="../../static/images/zhinengxianbao_banji.png" alt="">
                  <div style="margin-left: 8px;">班级：<span style="color: #999;">{{userList.banji}}</span></div>
                </li>
                <li>
                  <img src="../../static/images/zhinengxianbao_zhonghefu.png" alt="">
                  <div style="margin-left: 8px;">成绩：<span style="color: #999;">{{userList.score}}</span></div>
                </li>
                <li>
                  <img src="../../static/images/zhinengxianbao_weici.png" alt="">
                  <div style="margin-left: 8px;">位次：<span style="color: #999;">{{userList.ranking}}</span></div>
                </li>
                <li>
                  <img src="../../static/images/zhinengxianbao_weici.png" alt="">
                  <div style="margin-left: 8px;">
                    批次：
                    <span style="color: #666;" v-if="applyProv == 1 && userList.batch == 0">提前批</span>
                    <span style="color: #666;" v-if="applyProv == 1 && userList.batch == 1">本科</span>
                    <span style="color: #666;" v-if="applyProv == 1 && userList.batch == 2">专科</span>
                    <span style="color: #666;" v-if="applyProv == 1 && userList.batch == 3">不限批次</span>
                    <span style="color: #666;" v-if="applyProv == 0 && userList.batch == 0">提前批</span>
                    <span style="color: #666;" v-if="applyProv == 0 && userList.batch == 1">本科一批</span>
                    <span style="color: #666;" v-if="applyProv == 0 && userList.batch == 2">本科二批</span>
                    <span style="color: #666;" v-if="applyProv == 0 && userList.batch == 3">专科</span>
                    <span style="color: #666;" v-if="applyProv == 0 && userList.batch == 4">不限批次</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="list-item" v-if="show">
          <div class="titles">
            <div>意向志愿</div>
            <a class="log" :href="href" v-if="isSupreme == 1">打印</a>
          </div>
          <div class="commons" v-if="list1.length > 0 || list2.length > 0">
            <div class="batch" v-if="list2.length > 0">本科一批</div>
            <div class="batch-box" v-if="list2.length > 0">
              <div class="batch-list">
                <div>志愿</div>
                <div style="flex: 1.2;" class="school-name">院校名称</div>
                <div style="flex: 1.2;">专业</div>
                <div>年份</div>
                <div>最低分</div>
                <div>最低位次</div>
              </div>
              <div class="batch-item" v-for="(v,k) in list2" :key="k">
                <div class="batch-list">
                  <div>{{v.volunteer}}</div>
                  <div style="flex: 1.2;" @click="goUniversity(v.schoolName)">{{v.schoolName}}</div>
                  <div style="flex: 1.2;">{{v.specialtyName}}</div>
                  <div>{{v.year}}</div>
                  <div>{{v.score}}</div>
                  <div>{{v.precedence}}</div>
                </div>
                <div class="log" @click="del(v.id, k, 2)">删除</div>
              </div>
            </div>
            <div class="batch" v-if="list1.length > 0">本科二批</div>
            <div class="batch-box" v-if="list1.length > 0">
              <div class="batch-list">
                <div>志愿</div>
                <div style="flex: 1.2;" class="school-name">院校名称</div>
                <div style="flex: 1.2;">专业</div>
                <div>年份</div>
                <div>最低分</div>
                <div>最低位次</div>
              </div>
              <div class="batch-item" v-for="(v,k) in list1" :key="k">
                <div class="batch-list">
                  <div>{{v.volunteer}}</div>
                  <div style="flex: 1.2;" @click="goUniversity(v.schoolName)">{{v.schoolName}}</div>
                  <div style="flex: 1.2;">{{v.specialtyName}}</div>
                  <div>{{v.year}}</div>
                  <div>{{v.score}}</div>
                  <div>{{v.precedence}}</div>
                </div>
                <div class="log" @click="del(v.id, k, 1)">删除</div>
              </div>
            </div>
          </div>
          <div class="commons" v-if="list3.length > 0">
            <div class="batch" v-if="list3.length > 0">本科批</div>
            <div class="batch-box" v-if="list3.length > 0">
              <div class="batch-list">
                <div>志愿</div>
                <div style="flex: 1.2;">院校名称</div>
                <div style="flex: 1.2;">专业</div>
                <div>年份</div>
                <div>最低分</div>
                <div>最低位次</div>
              </div>
              <div class="batch-item" v-for="(v,k) in list3" :key="k">
                <div class="batch-list">
                  <div>{{v.volunteer}}</div>
                  <div style="flex: 1.2;" class="school-name" @click="goUniversity(v.schoolName)">{{v.schoolName}}</div>
                  <div style="flex: 1.2;">{{v.specialtyName}}</div>
                  <div>{{v.year}}</div>
                  <div>{{v.score}}</div>
                  <div>{{v.precedence}}</div>
                </div>
                <div class="log" @click="del(v.id, k, 3)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </keep-alive>
    <chat></chat>
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
  import Chat from '../components/chat.vue'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        itemIndex: 10,
        href: '',
        control: false,
        userList: {},
        list1: [],
        list2: [],
        list3: [],
        show: false,
        applyProv: 0,
        isSupreme: 0,
        totalPage: 1,
        pages: 1,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight
      }
    },
    components: {
      Headers,
      Navs,
      Footers,
      Chat
    },
    created() {
      this.applyProv = sessionStorage.getItem("applyProv")
      this.isSupreme = sessionStorage.getItem("isSupreme")
      this.href = 'https://www.jxqcjy.cn/jinxiuqiancheng/api/downloadCollection?uid=' + sessionStorage.getItem("uid")
      this.init()
    },
    watch: {
      list1(val) {
        console.log(val)
        this.$nextTick(() => {
          this.pos()
        })
      },
      list2(val) {
        console.log(val)
        this.$nextTick(() => {
          this.pos()
        })
      },
      list3(val) {
        console.log(val)
        this.$nextTick(() => {
          this.pos()
        })
      },
      bodyHeight() {
        this.$nextTick(() => {
          this.pos()
        })
      }
    },
    methods: {
      changeNav(k) {
        this.itemIndex = k
      },
      init() {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/personalCenter', datas).then(res => {
          if (res.data.result == 0) {
            this.userList = res.data
            self.getList()
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goUniversity(val) {
        let datas = {
          schoolName: val
        }
        Request.postRequest('jinxiuqiancheng/api/schoolDetail', datas).then(res => {
          if (res.data.result == 0) {
            let list = res.data
            this.$store.commit('getType',0)
            this.$router.push({
              name: 'schoolDetail',
              params: {
                list: JSON.stringify(list)
              }
            })
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      getList() {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/volunteerList', datas).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.list = []
            if (sessionStorage.getItem('applyProv') == 0) {
              if (res.data.epList.length > 0 || res.data.ypList.length > 0) {
                this.show = true
                this.list1 = res.data.epList
                this.list2 = res.data.ypList
              } else {
                this.show = false
              }
            } else {
              if (res.data.dataList.length > 0) {
                this.show = true
                this.list3 = res.data.dataList
              } else {
                this.show = false
              }
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight + 166 - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
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
      editor() {
        this.$router.push({
          name: 'editor'
        })
      },
      del(id, k, type) {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid"),
          collectionId: id
        }
        Request.postRequest('jinxiuqiancheng/api/delCollection', datas).then(res => {
          if (res.data.result == 0) {
            this.$Message.success('删除成功')
            if (type == 1) {
              self.list1.splice(k, 1)
              if (self.list1.length == 0 && self.list2.length == 0) {
                self.show = false
              }
            } else if (type == 2) {
              self.list2.splice(k, 1)
              if (self.list1.length == 0 && self.list2.length == 0) {
                self.show = false
              }
            } else {
              self.list3.splice(k, 1)
              if (self.list3.length == 0) {
                self.show = false
              }
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 768px) {
    .list {
      width: 1200px;
      margin: 40px auto 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .message>img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
    }

    .item {
      width: 100%;
      display: flex;
      font-size: 14px;
      color: #333;
    }

    .items {
      width: 100%;
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      color: #333;
    }

    .item>li {
      display: flex;
      align-items: center;
      margin-right: 24px;
    }

    .items>li {
      max-width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (max-width: 769px) {
    .list {
      width: 100%;
      margin: 40px 0 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .message>img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;
    }

    .item,
    .items {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 14px;
      color: #333;
    }

    .item>li {
      display: flex;
      align-items: center;
      margin-right: 24px;
      margin-bottom: 20px;
    }

    .items>li {
      width: 18%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 24px;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .list-item {
    width: 90%;
    display: flex;
    flex-direction: column;
    border: 2px solid #eee;
    border-radius: 6px;
    margin-bottom: 24px;
  }

  .commons {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
  }

  .titles {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 15px;
    color: #333;
    font-weight: 600;
    position: relative;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .titles::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 24px;
    width: 2px;
    height: 12px;
    background: rgb(255, 3, 80);
    border-radius: 4px;
  }

  .message {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 30px 30px;
    box-sizing: border-box;
  }

  .message-list {
    width: 80%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 50px;
    box-sizing: border-box;
  }

  .suggest {
    display: flex;
    align-items: center;
  }

  .suggest>img {
    margin-right: 10px;
  }

  .log {
    width: 80px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 24px;
    background: #b10b3d;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    margin-left: 32upx;
  }

  .batch {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    color: #333;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .batch-box {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .batch-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .batch-list {
    width: 85%;
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
  }

  .batch-list>div {
    flex: 1;
    text-align: center;
    font-size: 15px;
  }

  .specialty {
    width: 100%;
    text-align: center;
  }
  
  .school-name:hover {
    color: #FF0350;
    cursor: pointer;
  }

  .pages {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
