<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="login">
      <div class="login-list">
        <div class="pass">编辑个人信息</div>
        <div class="head">
          <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess"
            :format="['jpg','jpeg','png']" :max-size="2048" action="https://www.jxqcjy.cn/jinxiuqiancheng/api/uploadImage">
            <div class="head">
              <img :src="imgs ? imgs : '../../static/images/list.jpg'" alt="">
            </div>
          </Upload>
        </div>
        <ul class="msg">
          <li>
            <div class="list-left">
              <img src="../../static/images/denglu_zhanghao.png" alt="">
              <span class="user-msg">姓名：</span>
              <input type="text" placeholder="请输入姓名" v-model="user">
            </div>
          </li>
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_xingbie.png" alt="">
              <span class="user-msg">性别：</span>
              <Select v-model="sex" style="width:260px;margin-left: 20px;">
                <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </li>
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_xueke.png" alt="">
              <span class="user-msg">文理：</span>
              <Select v-model="classType" style="width:260px;margin-left: 20px;">
                <Option v-for="items in classLists" :value="items.value" :key="items.value">{{ items.label }}</Option>
              </Select>
            </div>
          </li>
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_dizhi.png" alt="">
              <span class="user-msg">省份：</span>
              <Select v-model="university" style="width:260px;margin-left: 20px;">
                <Option v-for="item in provinceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
            </div>
          </li>
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_xuexiao.png" alt="">
              <span class="user-msg">学校：</span>
              <input type="text" placeholder="请输入学校名称" v-model="school">
            </div>
          </li>
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_banji.png" alt="">
              <span class="user-msg">班级：</span>
              <input type="text" placeholder="请输入您的班级" v-model="banji">
            </div>
          </li>
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_zhonghefu.png" alt="">
              <span class="user-msg">成绩：</span>
              <input type="text" placeholder="请输入您的成绩" v-model="chengji">
            </div>
          </li>
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_weici.png" alt="">
              <span class="user-msg">位次：</span>
              <input type="text" placeholder="请输入您的位次" v-model="weici">
            </div>
            <div class="list-left">
              <div class="look" @click="goLook">查询位次</div>
            </div>
          </li>
          <li v-if="applyProv == 1">
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_zhonghefu.png" alt="">
              <span class="user-msg">批次：</span>
              <Select v-model="classes" style="width:260px;margin-left: 20px;">
                <Option v-for="(item,index) in classesList" :value="item.value" :key="index">{{ item.label }}</Option>
              </Select>
            </div>
          </li>
          <li v-if="applyProv == 0">
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_zhonghefu.png" alt="">
              <span class="user-msg">批次：</span>
              <Select v-model="classes" style="width:260px;margin-left: 20px;">
                <Option v-for="(item,index) in classesList1" :value="item.value" :key="index">{{ item.label }}</Option>
              </Select>
            </div>
          </li>
        </ul>
        <div class="btns" @click="goHobby">提交</div>
      </div>
    </div>
    <chat></chat>
    <div class="footer" v-if="!control">
      <footers></footers>
    </div>
    <footers v-if="control"></footers>
    <div class="mark" v-if="show">
      <div class="modals">
        <div class="modals-title">查询</div>
        <img @click="close" src="../../static/images/close.png" alt="">
        <div class="forms">
          <div class="form-item">
            <div>成绩：</div>
            <input type="text" placeholder="请输入成绩" v-model="score">
            <div style="margin-left: 12px;cursor: pointer;" @click="goSearch">查询</div>
          </div>
          <div class="form-item">
            <div>位次：</div>
            <input type="text" placeholder="位次" v-model="rank">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import Chat from '../components/chat.vue'
  import Province from '../common/city.js'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        user: '',
        sex: 0,
        classType: 0,
        address: null,
        school: '',
        banji: '',
        chengji: '',
        weici: '',
        jiafen: '',
        show: false,
        control: true,
        itemIndex: 10,
        university: '',
        provinceList: Province,
        classes: 0,
        sexList: [{
            value: 0,
            label: '男'
          },
          {
            value: 1,
            label: '女'
          }
        ],
        classLists: [{
            value: '0',
            label: '文科'
          },
          {
            value: '1',
            label: '理科'
          },
          {
            value: '2',
            label: '不限'
          }
        ],
        classesList: [{
            value: 0,
            label: '提前批'
          },
          {
            value: 1,
            label: '本科'
          },
          {
            value: 2,
            label: '专科'
          },
          {
            value: 3,
            label: '不限批次'
          }
        ],
        classesList1: [{
            value: 0,
            label: '提前批'
          },
          {
            value: 1,
            label: '本科一批'
          },
          {
            value: 2,
            label: '本科二批'
          },
          {
            value: 3,
            label: '专科'
          },
          {
            value: 4,
            label: '不限批次'
          }
        ],
        province: [{
            value: 1,
            label: '山东'
          },
          {
            value: 2,
            label: '河南'
          }
        ],
        score: '',
        rank: '',
        imgs: '../../static/images/logo.png',
        imgData: '',
        userList: {},
        defaultList: [],
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
      this.init()
    },
    watch: {
      bodyHeight() {
        this.pos()
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
            this.imgs = res.data.userIcon
            this.user = res.data.name
            this.sex = parseInt(res.data.sex)
            this.classType = res.data.wlType
            this.university = res.data.province
            this.school = res.data.school
            this.banji = res.data.banji
            this.chengji = res.data.score
            this.weici = res.data.ranking
            this.classes = parseInt(res.data.batch)
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goLook() {
        this.show = true
      },
      close() {
        this.show = false
      },
      goHobby() {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid"),
          userIcon: this.imgData,
          name: this.user,
          sex: this.sex,
          wlType: this.classType,
          province: this.university,
          school: this.school,
          banji: this.banji,
          score: this.chengji,
          ranking: this.weici,
          batch: this.classes
        }

        Request.postRequest('jinxiuqiancheng/api/editMemberInfo', datas).then(res => {
          if (res.data.result == 0) {
            this.$Message.success('修改成功')
            this.$router.go(-1)
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
        })
      },
      goSearch() {
        if (this.score == '') {
          this.$Message.warning('成绩不能为空')
          return
        }

        let datas = {
          uid: sessionStorage.getItem("uid"),
          wlType: this.classify,
          score: this.score
        }

        Request.postRequest('jinxiuqiancheng/api/findRanking', datas).then(res => {
          if (res.data.result == 0) {
            if (!res.data.ranking) {
              this.show = false
              this.score = ''
              this.$Message.warning('没有查询到该名次')
            } else {
              this.rank = res.data.ranking
              this.names = res.data.ranking
            }
          } else {
            this.$Message.warning(res.data.resultNote)
          }
        }).catch(res => {
          console.log(res)
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
      handleSuccess(res, file) {
        console.log(file)
        this.imgs = 'https://www.jxqcjy.cn/' + file.response.dataList[0]
        this.imgData = file.response.dataList[0]
      },
      pos() {
        let bodyHeight = document.documentElement.offsetHeight || document.body.offsetHeight //获取当前body高度
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight //获取当前页面高度
        if (bodyHeight + 166 - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      }
    }
  }
</script>

<style scoped="scoped">
  @media screen and (min-width: 768px) {
    .login {
      width: 1200px;
      overflow: hidden;
      margin: 40px auto;
    }

    .modals {
      width: 20%;
      border-radius: 6px;
      background: #FFFFFF;
      overflow: hidden;
      position: relative;
    }

    .login-list {
      width: 90%;
      padding: 60px 15%;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
      border: 1px solid #eee;
    }
  }

  @media screen and (max-width: 769px) {
    .login {
      width: 100%;
      overflow: hidden;
      margin: 40px 0;
    }

    .modals {
      width: 45%;
      border-radius: 6px;
      background: #FFFFFF;
      overflow: hidden;
      position: relative;
    }

    .login-list {
      width: 90%;
      padding: 60px 10%;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
      border: 1px solid #eee;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .head {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .head>img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
  }

  .pass {
    width: 100%;
    font-size: 15px;
    color: rgb(255, 3, 80);
    margin-bottom: 30px;
  }

  .user-msg {
    font-size: 14px;
    color: #333;
    margin-left: 18px;
  }

  .msg {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .msg>li {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed rgb(255, 3, 80);
  }

  .list-left {
    display: flex;
    align-items: center;
  }

  .msg>li input {
    border: none;
    font-size: 14px;
    color: #333;
    margin-left: 20px;
  }

  .msg>li input:focus {
    border: none;
    outline: none;
  }

  .footer {
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .btns {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 24px;
    background: rgb(255, 3, 80);
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 40px;
  }

  .look {
    padding: 4px 8px;
    background: rgb(255, 3, 80);
    font-size: 12px;
    color: #FFFFFF;
    border-radius: 20px;
    cursor: pointer;
  }

  .mark {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }

  .modals-title {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #333;
    background: rgb(250, 250, 250);
  }

  .modals>img {
    width: 10px;
    position: absolute;
    top: 11px;
    right: 12px;
  }

  .forms {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }

  .form-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }

  .form-item input {
    width: 65%;
    border: none;
    outline: none;
    border-radius: 20px;
    background: rgb(250, 250, 250);
    padding: 4px 10px;
    box-sizing: border-box;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
