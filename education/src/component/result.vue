<template>
  <div class="wrapper">
    <headers></headers>
    <navs :itemIndex="itemIndex" @change="change" @changeNav="changeNav"></navs>
    <div class="contain">
      <div class="top">
        <div class="load" @click="goRepeat">重新评测</div>
        <div>职业规划报告</div>
        <div class="load" style="background: #FF0350;" @click="pdf">下载报告</div>
      </div>
      <div class="content" id="box">
        <div class="name">亲爱的{{lists.name}}：</div>
        <div class="result">
          <div class="list1">一、经过系统测试分析，您的性格特点是：{{lists.characteristic}}</div>
          <div class="list1">二、经过系统测试分析，您的霍兰德职业兴趣代码为：{{lists.code}}</div>
        </div>
        <div id="myChart"></div>
        <div class="detail">
          <div class="detail-title">代码介绍：</div>
          <div class="type" v-for="(v,k) in dmjsList" :key="k">
            <div class="detail-title">实际型（{{v.type}}）</div>
            <div class="type-item">
              <div class="type-left">1、性格特点：</div>
              <p class="type-right">{{v.characteristic}}</p>
            </div>
            <div class="type-item">
              <div class="type-left">2、共同特征：</div>
              <p class="type-right">{{v.feature}}</p>
            </div>
            <div class="type-item">
              <div class="type-left">3、典型职业：</div>
              <p class="type-right">{{v.occupation}}</p>
            </div>
          </div>
          <div class="type">
            <div class="detail-title">三、依据您的测试结果，我们给您推荐的参考专业：</div>
            <i-table border :columns="columns3" :data="data1"></i-table>
          </div>
          <div class="type">
            <div class="detail-title">四、依据您的测试结果，我们给您推荐的参考职业：</div>
            <p class="type-right">{{lists.job}}</p>
          </div>
          <div class="type">
            <div class="detail-title">五、本报告是您选择专业职业的重要参考，但并不能作为直接和唯一的依据，如有问题，请联系锦绣前程专家</div>
          </div>
          <div class="type">
            <div class="detail-title">六、霍兰德职业性格测试相关介绍</div>
            <p class="type-right" style="margin-bottom: 24px;">霍兰德职业兴趣测试也被称为 自我指导探索测试（Self-DirectedSearch，SDS)
              ，由美国著名职业指导专家约翰·霍兰德编制。约翰·霍兰德(John.L.Holland)是美国约翰·霍普金斯大学心理学教授。他采用要素分析法对职业兴趣类型进行了长期的研究，于1959年提出了具有广泛社会影响的
              职业兴趣理论
              ，该理论将人的职业兴趣划分为实际型（Realistic）、研究型（Investigative）、艺术（Artistic）、社会型（Social）、企业型（Enterprising）、常规型（Conventional）六种职业兴趣类型</p>
            <p class="type-right" style="margin-bottom: 24px;">通过大量的研究,霍兰德和Whitney,Cole等人在1969年提出六种职业兴趣的 环型结构模型
              。他发现上述六种兴趣类型之间并不完全独立,而是存在一定程度的相关。霍兰德以一个六边形图形来对六种兴趣类型之间的关系加以表示，认为这个六边形结构模式表现出这样的规律性性：R、I、A、S、E、C的顺序是可以预测的；相邻职业兴趣类型间的相关最大；相隔职业兴趣类型间的相关次之；相对职业兴趣类型间的相关最小。</p>
            <p class="type-right" style="margin-bottom: 24px;">在20世纪70年代早期,霍兰德提出了关于职业兴趣和职业兴趣测量的一些新方法。人格被看成是由兴趣、价值观、需要、技能、信仰、态度和学习风格组成的。但对于职业选择而言,兴趣是“人职匹配”过程中最重要的人格。霍兰德从
              人格与环境交互作用
              的观点出发,将职业环境也划分为六种模式,不同的职业兴趣类型要求有与之相对应的职业环境。当个体所从事的职业和他的职业兴趣类型匹配时，个体的巨大潜能将得到最彻底的释放，在这种工作环境中就会有更好的表现，获得更高的职业成就感。</p>
            <p class="type-right" style="margin-bottom: 24px;">约翰·霍兰德JohnLewisHolland（1919年10月21日-2008年11月27日）是约翰霍普金斯大学社会学荣誉退休教授和美国心理学家。他于2008年11月27日在联合纪念医院去世。霍兰德创建的职业发展模型和霍兰德职业兴趣理论已经成为众多的职业指导理论中应用最为广泛的一种。</p>
          </div>
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
  import html2canvas from "html2canvas"
  import jsPDF from 'jspdf'
  import Headers from '../components/top.vue'
  import Footers from '../components/bottom.vue'
  import Navs from '../components/navs.vue'
  import Request from '../../utils/request.js'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        control: true,
        itemIndex: 1,
        bodyHeight: document.documentElement.offsetHeight || document.body.offsetHeight,
        lists: {},
        dmjsList: [],
        columns3: [{
          title: '参考专业',
          key: 'content'
        }],
        data1: [],
        option: {
          xAxis: {
            type: 'category', // 还有其他的type，可以去官网喵两眼哦
            data: ['实际型（R）', '研究型（I）', '艺术型（A）', '社会型（S）', '企业型（E）', '常规型（C）'], // x轴数据
            name: '', // x轴名称
            // x轴名称样式
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 16
            }
          },
          yAxis: {
            type: 'value',
            name: '', // y轴名称
            // y轴名称样式
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 16
            }
          },
          tooltip: {
            trigger: 'axis' // axis   item   none三个值
          },
          series: [{
            name: '',
            data: [],
            symbol: 'circle', //折线点设置为实心点
            symbolSize: 8, //折线点的大小
            itemStyle: {
              normal: {
                color: '#FF0350',
                lineStyle: {
                  color: '#FF0350'
                }
              }
            },
            type: 'line'
          }]
        }
      }
    },
    components: {
      Headers,
      Navs,
      Footers
    },
    watch: {
      bodyHeight() {
        this.pos()
      }
    },
    mounted() {
      this.init()
      this.$nextTick(() => {
        this.pos()
      })
    },
    methods: {
      pdf() {
        // let self = this;
        // var pdf = new jsPDF('', 'pt', 'a4');
        // html2canvas(document.querySelector("#box")).then(canvas => {
        //   var pageDataOne = canvas.toDataURL('image/jpeg', 1.0);
        //   var contentWidth = canvas.width;
        //   var contentHeight = canvas.height;
        //   //一页pdf显示html页面生成的canvas高度;
        //   var pageHeight = contentWidth / 592.28 * 841.89;
        //   //未生成pdf的html页面高度
        //   var leftHeight = contentHeight;
        //   //页面偏移
        //   var position = 0;
        //   //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        //   var imgWidth = 595.28;
        //   var imgHeight = 592.28 / contentWidth * contentHeight;

        //   //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //   //当内容未超过pdf一页显示的范围，无需分页
        //   if (leftHeight < pageHeight) {
        //     pdf.addImage(pageDataOne, 'JPEG', 20, 20, imgWidth - 40, imgHeight - 40);
        //   } else {
        //     while (leftHeight > 0) {
        //       pdf.addImage(pageDataOne, 'JPEG', 20, position, imgWidth - 40, imgHeight)
        //       leftHeight -= pageHeight;
        //       position -= 841.89;
        //       //避免添加空白页
        //       if (leftHeight > 0) {
        //         pdf.addPage();
        //       }
        //     }
        //   }
        //   pdf.save()
        //   console.log(pageDataOne)
        // });
        window.location.href = 'https://www.jxqcjy.cn/jinxiuqiancheng/api/downloadReport?uid=' + sessionStorage.getItem("uid")
      },
      init() {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/findPlanReport', datas).then(res => {
          if (res.data.result == 0) {
            self.lists = res.data
            self.dmjsList = res.data.dmjsList
            self.data1 = res.data.ckzyList
            let one = res.data.defenList
            self.option.series[0].data.push(one[0].R)
            self.option.series[0].data.push(one[1].I)
            self.option.series[0].data.push(one[2].A)
            self.option.series[0].data.push(one[3].S)
            self.option.series[0].data.push(one[4].E)
            self.option.series[0].data.push(one[5].C)
            let myChart = self.$echarts.init(document.getElementById('myChart'))
            myChart.setOption(self.option)
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
        if (bodyHeight - winHeight > 0) {
          this.control = true
        } else {
          this.control = false
        }
      },
      goRepeat() {
        let self = this
        let datas = {
          uid: sessionStorage.getItem("uid")
        }
        Request.postRequest('jinxiuqiancheng/api/anewTest', datas).then(res => {
          if (res.data.result == 0) {
            sessionStorage.setItem("isTest", 0)
            self.$router.push({
              path: '/fun',
              replace: true
            })
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
      changeNav(k) {
        this.itemIndex = k
      }
    }
  }
</script>

<style scoped>
  @media screen and (max-width: 1024px) {
    .wrapper {
      width: 100%;
      height: 100%;
    }

    .contain {
      width: 100%;
      overflow: hidden;
      margin: 40px auto;
    }
  }

  @media screen and (min-width: 1024px) {
    .wrapper {
      width: 100%;
      height: 100%;
    }

    .contain {
      width: 1200px;
      overflow: hidden;
      margin: 40px auto;
    }
  }

  .detail {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .detail-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }

  .type {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .type-item {
    width: 100%;
    display: flex;
    margin-bottom: 12px;
  }

  .type-left {
    width: 100px;
    font-size: 14px;
    color: #333;
    font-weight: 600;
    line-height: 20px;
  }

  .type-right {
    max-width: 85%;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    text-align: justify;
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 24px;
  }

  .load {
    width: 120px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    background: #FD6802;
    text-align: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }

  .content {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 30px auto 0;
  }

  .name {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
  }

  .result {
    width: 100%;
    padding: 20px;
    border-radius: 4px;
    background: #f6f6f6;
    margin: 32px 0;
  }

  .list1 {
    width: 100%;
    font-size: 12px;
    color: #666;
    line-height: 20px;
    margin-bottom: 12px;
  }

  #myChart {
    width: 100%;
    height: 400px;
  }

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
