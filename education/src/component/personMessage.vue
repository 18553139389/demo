<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="forms">
      <div class="forms-wrapper">
        <div class="table-msg">
          <div class="person">
            <span>个人信息</span>
            <a class="report" :href="href">生成报表</a>
          </div>
          <table width="100%">
            <tr>
              <td>学校信息：</td>
              <td colspan="5">{{personMsg.school}}</td>
            </tr>
            <tr>
              <td>姓名：</td>
              <td colspan="2">{{personMsg.name}}</td>
              <td>性别：</td>
              <td colspan="2" v-if="personMsg.sex == 0">男</td>
              <td colspan="2" v-if="personMsg.sex == 1">女</td>
            </tr>
            <tr>
              <td>地区：</td>
              <td colspan="2">{{personMsg.address}}</td>
              <td>班级：</td>
              <td colspan="2">{{personMsg.banji}}</td>
            </tr>
            <tr>
              <td>成绩：</td>
              <td>{{personMsg.score}}</td>
              <td>排名：</td>
              <td>{{personMsg.ranking}}</td>
              <td>排名范围：</td>
              <td>{{personMsg.rankingRange}}</td>
            </tr>
            <tr>
              <td>加分成绩：</td>
              <td>{{personMsg.addScore}}</td>
              <td>加分排名：</td>
              <td>{{personMsg.addRanking}}</td>
              <td>加分范围：</td>
              <td>{{personMsg.addRange}}</td>
            </tr>
            <tr>
              <td>科类：</td>
              <td colspan="2">{{personMsg.subjects}}</td>
              <td>专业：</td>
              <td colspan="2">
                <div class="zhuanye">
                  <span v-for="(v,k) in typeList" :key="k">{{v}}</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="forms-list" v-if="list.length > 0">
        <table width="100%" style="margin-top: 0;">
          <tr>
            <th>录取批次</th>
            <th>志愿</th>
            <th style="flex: 1.5;">院校</th>
            <th>学院代码</th>
            <th style="flex: 1.5;">专业</th>
            <th>专业代码</th>
            <th v-if="applyProv == 1">专业必选科目</th>
            <th>学校层次</th>
            <th>2019年最低分/最低位次</th>
            <th>2018年最低分/最低位次</th>
            <th>2017年最低分/最低位次</th>
          </tr>
          <tr v-for="(v,k) in list" :key="k">
            <td>{{v.batch}}</td>
            <td>{{v.volunteer}}</td>
            <td style="flex: 1.5;">{{v.schoolName}}</td>
            <td>{{v.schoolCode}}</td>
            <td style="flex: 1.5;">{{v.specialtyName}}</td>
            <td>{{v.specialtyCode}}</td>
            <td v-if="applyProv == 1">{{v.required}}</td>
            <td>{{v.level}}</td>
            <td>{{v.firstScore}}/{{v.firstPrecedence}}</td>
            <td>{{v.secondScore}}/{{v.secondPrecedence}}</td>
            <td>{{v.thirdScore}}/{{v.thirdPrecedence}}</td>
          </tr>
        </table>
      </div>
    </div>
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
        itemIndex: 1,
        control: true,
        personMsg: {},
        list: [],
        typeList: [],
        applyProv: 0,
        href: '',
        timer: '',
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
      this.href = 'https://www.jxqcjy.cn/jinxiuqiancheng/api/downloadPdf?uid=' + sessionStorage.getItem("uid")
      if (sessionStorage.getItem('isSupreme') == 1) {
        this.timer = setInterval(() => {
          this.checkState()
        }, 300)
      }
      this.init()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    methods: {
      checkState() {
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/findMemberStatus', datas).then(res => {
          if (res.data.result == 0) {
            console.log('123')
            if (res.data.isReport == 0) {
              clearInterval(this.timer)
              sessionStorage.setItem('isReport', 0)
              this.$router.push({
                path: '/zhineng',
                replace: true
              })
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
      init() {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/reportList', datas).then(res => {
          if (res.data.result == 0) {
            let msg = {}
            msg.school = res.data.school
            msg.name = res.data.name
            msg.sex = res.data.sex
            msg.address = res.data.address
            msg.banji = res.data.banji
            msg.score = res.data.score
            msg.ranking = res.data.ranking
            msg.rankingRange = res.data.rankingRange
            msg.addScore = res.data.addScore
            msg.addRanking = res.data.addRanking
            msg.addRange = res.data.addRange
            msg.subjects = res.data.subjects
            self.personMsg = msg
            self.typeList = res.data.specialtys.split(',')
            if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
              self.list = res.data.dataList
            }
            self.$nextTick(() => {
              self.pos()
            })
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
      changeNav(k) {
        this.itemIndex = k
      }
    }
  }
</script>

<style>
  @media screen and (min-width: 1024px) {
    .forms-wrapper {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }

    .forms-list {
      width: 1200px;
      margin: 30px auto 0;
      display: flex;
      flex-direction: column;
      border: 1px solid #eee;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgb(0, 0, 0, .3);
      padding: 20px;
      box-sizing: border-box;
    }

    .table-msg {
      width: 80%;
      margin: 0 auto;
      padding: 24px;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgb(0, 0, 0, .3);
    }

    .zhuanye {
      width: 286px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      line-height: 20px;
    }

    .table-msg>table tr td {
      text-align: left;
      font-size: 14px;
      padding: 20px 30px;
      border: 1px dashed red;
      box-sizing: border-box;
    }
  }

  @media screen and (max-width: 1024px) {
    .forms-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .forms-list {
      width: 100%;
      margin: 30px 0 0;
      display: flex;
      flex-direction: column;
      border: 1px solid #eee;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgb(0, 0, 0, .3);
      padding: 20px;
      box-sizing: border-box;
    }

    .table-msg {
      width: 90%;
      margin: 0 auto;
      padding: 24px;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgb(0, 0, 0, .3);
    }

    .zhuanye {
      width: 86px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      line-height: 20px;
    }

    .table-msg>table tr td {
      text-align: left;
      font-size: 14px;
      padding: 20px 10px;
      border: 1px dashed red;
      box-sizing: border-box;
    }
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }

  .forms {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 40px 0;
  }

  .person {
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 14px;
    color: #333;
    position: relative;
  }

  .report {
    width: 80px;
    height: 24px;
    line-height: 24px;
    position: absolute;
    top: 23px;
    right: 80px;
    display: inline-block;
    background: rgb(216, 216, 216);
    border-radius: 16px;
    font-size: 12px;
    color: #333;
  }

  table {
    /* border: 1px dashed red; */
  }

  .forms-list>table tr {
    width: 100%;
    display: flex;
    /* align-items: center; */
  }

  .forms-list>table tr td {
    flex: 1;
    text-align: center;
    font-size: 14px;
    padding: 20px 8px;
    border: 1px dashed red;
    box-sizing: border-box;
  }

  table tr th {
    flex: 1;
    text-align: center;
    font-size: 14px;
    padding: 20px 8px;
    border: 1px dashed red;
    box-sizing: border-box;
  }

  .zhuanye>span {
    margin-right: 6px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
