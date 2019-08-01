<template>
  <div class="problem-box">
    <main-header :text="text" @back="back"></main-header>
    <ul class="problem-zi">
      <li>
        <router-link to="/xiulogin">
          <span>修改登录密码</span>
          <span>
            <img src="../../../static/img/right.png" alt />
          </span>
        </router-link>
      </li>
      <li>
        <router-link to="/provisions">
          <span>服务条文</span>
          <span>
            <img src="../../../static/img/right.png" alt />
          </span>
        </router-link>
      </li>
      <li>
        <router-link to="/problem">
          <span>常见问题</span>
          <span>
            <img src="../../../static/img/right.png" alt />
          </span>
        </router-link>
      </li>
      <li>
        <router-link to="/feedback">
          <span>意见反馈</span>
          <span>
            <img src="../../../static/img/right.png" alt />
          </span>
        </router-link>
      </li>
      <li>
        <router-link to>
          <span>系统更新</span>
          <div>
            <span style="font-size:12px;color:green" @click="xia" v-if="geng==true">最新版本:{{list}}</span>
            <span style="font-size:12px" v-else>暂无更新</span>
            <img src="../../../static/img/right.png" alt />
          </div>
        </router-link>
      </li>
      <li @click="clear">
        <router-link to>
          <span>清除缓存</span>
          <div>
            <span v-if="zime>0">{{zime}}M</span>
            <img src="../../../static/img/right.png" alt />
          </div>
        </router-link>
      </li>
    </ul>
    <button class="btn" @click="btn">安全退出</button>
  </div>
</template>

<script>
import MainHeader from "@/components/component/mainHeader";
import { Toast, Dialog } from "vant";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "我的设置",
      list: "",
      url: "",
      zime: "",
      geng: false
    };
  },
  components: {
    MainHeader
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.Update();
    this.zimes();
  },
  mounted() {
    var first = null;
    let self = this;
    mui.back = function() {
      if (!first) {
        self.$router.push("/person");
        first = new Date().getTime();
        setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          plus.runtime.quit();
        }
      }
    };
  },
  methods: {
    Update() {
      let goCarlist = {
        cmd: "versionUpdate"
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            this.geng = true;
            this.list = res.data.version;
            this.url = res.data.url;
          } else {
            this.geng = false;
          }
        })
        .catch(res => {});
    },
    back() {
      this.$router.push("/person");
    },
    xia() {
      let self = this;
      Dialog.confirm({
        title: "新版本",
        message: "下载最新版？"
      })
        .then(() => {
          Toast(self.url);
          mui.plusReady(function() {
            var server = self.url; //获取升级描述文件服务器地址
            mui.getJSON(
              server,
              {
                appid: plus.runtime.appid,
                version: plus.runtime.version,
                imei: plus.device.imei
              },
              function(data) {
                console.log(data);
                if (data.status) {
                  plus.ui.confirm(
                    data.note,
                    function(i) {
                      if (0 == i) {
                        plus.runtime.openURL(data.url);
                      }
                    },
                    data.title,
                    ["立即更新", "取　　消"]
                  );
                } else {
                  mui.toast("Hello MUI 已是最新版本~");
                }
              }
            );
          });
        })
        .catch(() => {
          Toast("不下载");
        });
      // let self = this;
      // let checkUrl = self.list;
      // plus.runtime.getProperty(plus.runtime.appid, function(inf) {
      //   let wgtVer = inf.version;
      //   console.log("当前应用版本：" + wgtVer);
      //   if (self.compareVersion(wgtVer, checkUrl)) {
      //     // 判断当前版本是否需要更新
      //     plus.nativeUI.confirm(
      //       "发现新版本" + checkUrl + "是否下载",
      //       function(e) {
      //         // 此方法请在plusReady()完成后
      //         if (e.index > 0) {
      //           plus.nativeUI.toast("升级包下载中...");
      //           self.downWgt(); // 下载升级包
      //         }
      //       },
      //       "HelloH5",
      //       ["取消", "确定"]
      //     );
      //   }
      // });
    },
    // compareVersion(ov, nv) {
    //   // ov为本地历史版本,nv为当前线上版本
    //   console.log(ov, nv);
    //   if (!ov || !nv || ov == "" || nv == "") {
    //     return false;
    //   }
    //   var b = false,
    //     ova = ov.split(".", 4),
    //     nva = nv.split(".", 4);
    //   for (var i = 0; i < ova.length && i < nva.length; i++) {
    //     var so = ova[i],
    //       no = parseInt(so),
    //       sn = nva[i],
    //       nn = parseInt(sn);
    //     if (nn > no || sn.length > so.length) {
    //       return true;
    //     } else if (nn < no) {
    //       return false;
    //     }
    //   }
    //   if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
    //     return true;
    //   }
    // },
    // downWgt() {
    //   let wgtUrl = this.url; // 线上版本在线更新的.wgt文件路径
    //   //  plus.nativeUI.showWaiting("下载wgt文件...");
    //   plus.downloader
    //     .createDownload(wgtUrl, { filename: "_doc/update/" }, function(
    //       d,
    //       status
    //     ) {
    //       if (status == 200) {
    //         console.log("下载wgt成功：" + d.filename);
    //         plus.nativeUI.confirm(
    //           "升级包下载完成，是否安装最新版本？",
    //           function(e) {
    //             if (e.index > 0) {
    //               this.installWgt(d.filename); // 安装wgt包
    //             }
    //           },
    //           "HelloH5",
    //           ["取消", "确定"]
    //         );
    //       } else {
    //         console.log("下载wgt失败！");
    //         //          plus.nativeUI.alert("下载wgt失败！");
    //       }
    //       //      plus.nativeUI.closeWaiting();
    //     })
    //     .start();
    // },
    // installWgt(path) {
    //   console.log(path);
    //   plus.nativeUI.showWaiting("安装升级文件...");
    //   plus.runtime.install(
    //     path,
    //     {},
    //     function() {
    //       plus.nativeUI.closeWaiting();
    //       console.log("安装wgt文件成功！");
    //       // 是否立即重启
    //       plus.nativeUI.confirm(
    //         "应用资源更新完成，是否立即重启生效？",
    //         function(e) {
    //           if (e.index > 0) {
    //             plus.runtime.restart();
    //           }
    //         },
    //         "HelloH5",
    //         ["取消", "确定"]
    //       );
    //     },
    //     function(e) {
    //       plus.nativeUI.closeWaiting();
    //       console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
    //       plus.nativeUI.toast("安装wgt文件失败[" + e.code + "]：" + e.message);
    //     }
    //   );
    // },

    btn() {
      let logout = {
        cmd: "logout",
        id: this.user.cid
      };
      Request.postRequest(logout)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 0) {
            localStorage.clear();
            this.$router.push("/login");
          }
        })
        .catch(res => {});
    },
    zimes() {
      let self = this;
      mui.plusReady(function() {
        plus.cache.calculate(function(size) {
          console.log(size);
          var size_m = parseFloat(size / (1024 * 1024)).toFixed(2);
          self.zime = size_m;
        });
      });
    },
    clear() {
      let self = this;
      mui.plusReady(function() {
        plus.cache.calculate(function(size) {
          console.log(size);
          var size_m = parseFloat(size / (1024 * 1024)).toFixed(2);
          if (size > 1) {
            mui.confirm(
              "您目前的系统缓存为" + size_m + "M？",
              "清除缓存",
              ["确认", "取消"],
              function(e) {
                if (e.index == 1) {
                } else {
                  plus.cache.clear(function() {
                    alert("缓存清除完毕");
                    self.zimes();
                    localStorage.setItem("user", JSON.stringify(self.user));
                  });
                }
              }
            );
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.problem-zi {
  padding: 72px 10px 0;

  li {
    font-size: 14px;
    padding: 10px 0;
    border-bottom: 1px solid #dfdfdf;

    a {
      display: flex;
      justify-content: space-between;
      color: #000;

      img {
        width: 20px;
        vertical-align: middle;
      }
    }
  }
}

.btn {
  padding: 10px 30px;
  width: 150px;
  background: green;
  border: none;
  color: #fff;
  margin: 50px 30%;
  border-radius: 10px;
}
</style>
