<template>
    <div style="height:100vh"> 
         <p class="liuptitle">
             详情
        </p>
        <div class="line"></div>
        <div class="con2">
            <section class="liuycontent">
                <ul>
                <li>
                    <div class="topflex">
                        <img src="@/assets/images/touxiang.png" alt="" class="lyavator">
                        <div style="width:100%;">
                            <div class="ddd">
                                <span class="c333">专职愉公</span>
                                <span class="c9">浏览量：2551</span>
                            </div>                            
                            <div class="time">
                                发布时间：2019-06-03  21:53:23
                            </div>
                        </div>
                        
                    </div>
                    <div class="middle">
                        怎么做？怎么做？怎么做？怎么做？做？怎么做？怎么做？怎么做？怎么做？怎么做？怎么做？
                    </div>
                   <div class="detail">
                        <img src="@/assets/images/banner.jpg" alt="">
                         <p>
                            <img src="@/assets/images/di.png" alt="" style="width:9px;height:11px;">
                            <span style="color:#A5A5A5;">商都世贸中心D座</span>
                        </p>  
                    </div>
                </li>
                
                </ul>
            </section>
            </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      dataList:[],
      uid:'',
      city:''
    };
  },
  created() {
    this.city =this.$route.query.city
    var params ={ cmd: "welfareslibrary", city:this.city,nowPage:'1',pageCount:'10'}
    this.postRequest(params).then(res => {       
          // console.log(res)
          this.dataList = res.data.dataList
    });
  },
}
</script>
<style scoped>
.detail{padding: 5px 10px;}
.detail>img{width:100px;height: 100px; display: block;margin: 8px 0;}
.ddd{    
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.c333{font-size: 15px;font-weight: bold;}
.line{height: 8px;width: 100%;background:#FAFAFA; }
.con2{
  padding: 0 12px 10px;
  width: 100vw;
  border-radius: 10px;
}
.c9{color: #999;font-size: 13px;font-weight: normal;}
.liuptitle{
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  background: #fff;
  text-align: center;
}
.liuptitle span{
  display: inline-block;
  margin-right: 10px;
  height: 100%;
}
.liuycontent li{
  display: flex;
  flex-flow: column;
  padding: 10px 3px;
  background: #fff;
  border-radius: 5px;
}
.topflex{
  display: flex;
  flex-flow: row;
  align-items: center;
}
.middle,.bottom,.replay{
  width: 100%;

}
.middle{
  line-height: 18px;
  font-size: 13px;
  margin: 10px 0; 
  padding: 0 10px;
}
.bottom{
  display: flex;
  flex-flow: row;
  margin-top: 10px;
  justify-content: space-between;
}
.time{
  color: #999;font-size: 14px;margin-top: 10px;
}
.option span{vertical-align:middle;margin:0 5px;}
.icon{width: 14px;height:14px ;}
.lyavator{border-radius: 50%;height:49px;width:49px;margin-right: 5px;}
</style>
