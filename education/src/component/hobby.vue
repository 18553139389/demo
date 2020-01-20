<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="login">
      <div class="login-list">
        <div class="pass">填写个人信息</div>
        <ul class="msg">
          <li>
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_dizhi.png" alt="">
              <span class="user-msg">大学省份：</span>
              <Select v-model="university" multiple :max-tag-count="2" class="choices">
                <Option v-for="item in provinceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
              </Select>
            </div>
          </li>
          <li v-if="applyProv == 1">
            <div class="list-left">
              <img src="../../static/images/zhinengxianbao_xueke.png" alt="">
              <span class="user-msg">学科选择：</span>
              <div class="classes">
                <div class="xueke" v-for="(v,k) in typeList" :key="k" :class="v.state ? 'active' : ''" @click="changeItem(k,v.name,v.state)">{{v.name}}</div>
              </div>
            </div>
          </li>
          <li>
            <div class="list-left" style="width: 100%;">
              <img src="../../static/images/zhinengtianbao_zhuanye.png" alt="">
              <span class="user-msg">填写专业：</span>
              <Input placeholder="例: 英语 , 计算机 , 医学" v-model="zhuanye" class="choices" style="width: 50%;" />
              <!-- <Select v-model="choice" multiple :max-tag-count="1" class="choices" style="width: 320px;margin: 16upx 0 0 16upx;">
                <Option v-for="item in classList" :value="item.name" :key="item.id">{{ item.name }}</Option>
              </Select> -->
            </div>
          </li>
        </ul>
        <div class="btnSub">
          <div class="btnItems" @click.once="goPerson">提交</div>
          <div class="btnItems" @click="back">返回上一级</div>
        </div>
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
  import Province from '../common/citys.js'
  import Request from '../../utils/request.js'
  export default {
    data() {
      return {
        university: [],
        classify: [],
        zhuanye: '',
        choice: [],
        provinceList: Province,
        items: 1,
        control: true,
        itemIndex: 1,
        classList: [],
        typeList: [{
            value: 1,
            name: '物理',
            state: false
          },
          {
            value: 2,
            name: '化学',
            state: false
          },
          {
            value: 3,
            name: '生物',
            state: false
          },
          {
            value: 4,
            name: '历史',
            state: false
          },
          {
            value: 5,
            name: '地理',
            state: false
          },
          {
            value: 6,
            name: '政治',
            state: false
          }
        ],
        list: {},
        applyProv: 0,
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
      this.list = this.$store.state.personList
      this.applyProv = sessionStorage.getItem("applyProv")
    },
    mounted() {
      this.pos()
    },
    watch: {
      // zhuanye(newVal, oldVal) {
      //   let self = this
      //   if(newVal.indexOf('，') > -1) {
      //     newVal = newVal.split('，').join(',')
      //   }
      //   let datas = {
      //     specialtyName: newVal
      //   }
      //   Request.postRequest('jinxiuqiancheng/api/searchSpecialtyList', datas).then(res => {
      //     if (res.data.result == 0) {
      //       if (res.data.dataList !== 'undefined' && res.data.dataList.length > 0) {
      //         self.classList = res.data.dataList
      //       }
      //     } else {
      //       self.classList = []
      //       this.$Message.warning(res.data.resultNote)
      //     }
      //   }).catch(res => {
      //     console.log(res)
      //   })
      // },
      bodyHeight() {
        this.pos()
      }
    },
    methods: {
      changeItem(k, name, state) {
        let self = this
        if (this.classify.length < 3 || this.typeList[k].state) {
          this.typeList[k].state = !this.typeList[k].state
          if (this.typeList[k].state && this.classify.indexOf(name) == -1) {
            this.classify.push(name)
          } else if (!this.typeList[k].state && this.classify.indexOf(name) > -1) {
            for (let i = 0; i < this.classify.length; i++) {
              if (this.classify[i] == name) {
                self.classify.splice(i, 1)
              }
            }
          }
        }
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
      back() {
        this.$router.go(-1)
      },
      changeNav(k) {
        this.itemIndex = k
      },
      goPerson() {
        let self = this
        if (this.applyProv == 0) {
          this.classify == ''
        }

        if (this.university.length > 0 && this.university.length == 1) {
          this.university = this.university[0]
        } else if (this.university.length > 1) {
          this.university = this.university.join(',')
        } else {
          this.university = ''
        }

        // if (this.choice.length == 1) {
        //   this.choice = this.choice[0]
        // } else if (this.choice.length > 1) {
        //   this.choice = this.choice.join(',')
        // } else {
        //   this.choice = ''
        // }
        if(this.zhuanye.indexOf('，') > -1) {
          this.zhuanye = this.zhuanye.split('，').join(',')
        }
        let classify = this.classify.join(',')

        let datas = {
          province: this.university,
          subjects: classify,
          specialtys: this.zhuanye
        }
        let data = Object.assign(datas, this.list)
        Request.postRequest('jinxiuqiancheng/api/saveReportInfo', data).then(res => {
          console.log(res)
          if (res.data.result == 0) {
            this.$Message.warning('提交成功')
            sessionStorage.setItem("isReport", 1)
            setTimeout(() => {
              self.$router.push({
                name: 'personMessage'
              })
            }, 500)
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
    .login {
      width: 1200px;
      overflow: hidden;
      margin: 50px auto 0;
    }

    .login-list {
      width: 90%;
      padding: 40px 15%;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
      border: 1px solid #eee;
    }

    .choices {
      width: 260px;
      margin-left: 20px;
    }
  }

  @media screen and (max-width: 769px) {
    .login {
      width: 100%;
      overflow: hidden;
      margin: 40px 0;
    }

    .login-list {
      width: 90%;
      padding: 40px 10%;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 6px;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, .1);
      border: 1px solid #eee;
    }

    .choices {
      width: 160px;
      margin-left: 20px;
    }
  }

  .ivu-select-dropdown {
    max-width: 320px !important;
  }

  .wrapper {
    width: 100%;
    height: 100%;
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
    padding: 16px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dashed rgb(255, 3, 80);
  }

  .list-left {
    display: flex;
    align-items: center;
  }

  .footer {
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .btnSub {
    width: 100%;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .classes {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .xueke {
    font-size: 14px;
    color: #333;
    padding: 8px 16px;
    background: rgb(217, 217, 217);
    border-radius: 12px;
    margin-right: 16px;
    cursor: default;
  }

  .active {
    background: rgb(255, 3, 80);
    color: #FFFFFF;
  }

  .btnItems {
    width: 40%;
    height: 40px;
    line-height: 40px;
    background: rgb(255, 3, 80);
    border-radius: 24px;
    text-align: center;
    cursor: pointer;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
