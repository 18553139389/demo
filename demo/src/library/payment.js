import client from '../library/Rest.js'
// import axios from 'axios'

export default {
  callPaymentAPi ({payMethod, order, cb, self, dom}) {
    // dom.text('创建支付订单中...')
    
    let orderData = order.data
    let account = self.$store.getters['account/getAccountData']
    let paymentType = 'h5'
    console.log(orderData,account,"进js订单来了")
    if (payMethod.type === 'eWAY') {
      self.$router.push({
        path: '/page/cardNumber/main',
        query: {
          payMethod: JSON.stringify(payMethod),
          orderData: JSON.stringify(orderData),
          account: JSON.stringify({device_id: account.deviceId})
        }
      })
    } else if (payMethod.type === 'wechat') {
      let postData = {
        'site_uuid': self.$store.getters['env/getSiteUuid'],
        'payment_uuid': payMethod.id,
        'order_no': orderData.order_no,
        'price': parseFloat(orderData.currencyTotal).toFixed(2),
        'device_id': account.device_id,
        'channel': payMethod.type,
        'payment_type': 'wx'
      }
      console.log('wechat支付js里的东西xxxx', orderData)
      console.log('xxxxpostData', postData)
      let data = JSON.stringify(postData)
      let endpoint = self.$store.getters['server/getEndpoint']
      let url = endpoint + self.$store.getters['configs/getApiList'].payment_gateway + '/pay'
      let token = self.$store.getters['account/getCustomerToken']
      wx.request({
        url: url, 
        method: 'POST',
        data: data,
        header: {
          'Authorization': token,
          'content-type': 'application/json' // 默认值
        },
        success(s) {
          
          if (s.data.code === 200) {
            console.log(s,"post请求成功")
            wx.requestPayment({
              appid: s.data.data.appid,
              partnerid: s.data.data.partnerid,
              prepayid: s.data.data.prepayid,
              timeStamp: s.data.data.timestamp,
              nonceStr: s.data.data.noncestr,
              package: s.data.data.package,
              signType: 'MD5',
              paySign: s.data.data.sign,
              success(res) { 
                console.log('wechat pay res', res)
                self.disabledPay = false
              },
              fail(res) { 
                console.log('Failed: ' + res)
                self.disabledPay = false
              }
            })
            // wx.pay(s.data.data, res => {
            //   console.log('wechat pay res', res)
            //   self.disabledPay = false
            //   cb()
            // }, (reason) => {
            //   console.log('Failed: ' + reason)
            //   self.disabledPay = false
            //   self.$ons.notification.alert('支付发送错误，请关闭后重试')
            // })
          } else {
            self.disabledPay = false
            self.$ons.notification.alert('支付发送错误，请关闭后重试')
          }
        },
        fail() {
          self.disabledPay = false
          self.$ons.notification.alert('支付发送错误，请关闭后重试')
        }
      })
      // client.post(url, token, data, (s) => {
      //   console.log(s)
      //   if (s.code === 200) {
      //     Wechat.pay(s.data, res => {
      //       console.log('wechat pay res', res)
      //       self.disabledPay = false
      //       cb()
      //     }, (reason) => {
      //       console.log('Failed: ' + reason)
      //       self.disabledPay = false
      //       self.$ons.notification.alert('支付发送错误，请关闭后重试')
      //     })
      //   } else {
      //     self.disabledPay = false
      //     self.$ons.notification.alert('支付发送错误，请关闭后重试')
      //   }
      // }, (e) => {
      //   self.disabledPay = false
      //   self.$ons.notification.alert('支付发送错误，请关闭后重试')
      // })

    } else {
      let postData = {
        'site_uuid': self.$store.getters['env/getSiteUuid'],
        'payment_uuid': payMethod.id,
        'order_no': orderData.order_no,
        'price': orderData.price,
        'device_id': account.device_id,
        'channel': payMethod.type,
        'payment_type': paymentType
      }
      console.log('xxxx', orderData)
      console.log('xxxx', postData)
      let data = JSON.stringify(postData)
      let endpoint = self.$store.getters['server/getEndpoint']
      let url = endpoint + self.$store.getters['configs/getApiList'].payment_gateway + '/pay'
      let token = self.$store.getters['account/getCustomerToken']
      wx.request({
        url: url, 
        method: 'POST',
        data: data,
        header: {
          'Authorization': token,
          'content-type': 'application/json' // 默认值
        },
        success(s) {
          console.log(s,"支付宝支付成功")
          if (s.data.code === 200) {
            self.disabledPay = false
            self.duringThePayment(orderData)
            wx.navigateTo({
              url: s.data.data.payment_url
            })    
            // window.location.href = s.data.data.payment_url
            // cb()
          } else {
            self.disabledPay = false
            self.$ons.notification.alert('支付发送错误，请关闭后重试')
          }
        },
        fail() {
          self.disabledPay = false
        self.$ons.notification.alert('支付发送错误，请关闭后重试')
        }
      })
      // client.post(url, token, data, (s) => {
      //   // self.$router.push('/success?hideTitle=true&hide-tab-bar')
      //   if (s.code === 200) {
      //     self.disabledPay = false
      //     self.duringThePayment(orderData)
      //     window.location.href = s.data.payment_url
      //     // cb()
      //   } else {
      //     self.disabledPay = false
      //     self.$ons.notification.alert('支付发送错误，请关闭后重试')
      //   }
      // }, (e) => {
      //   self.disabledPay = false
      //   self.$ons.notification.alert('支付发送错误，请关闭后重试')
      // })
    }
  }
}

// async function mockPayViaWechat (data, cb) {
//   console.log('start payment via wechat')
//   const info = await getWechatPaymentInfo(data)
//   console.log('info', info)
//   Wechat.pay(info, res => {
//     console.log('wechat pay res', res)
//     cb()
//   }, (reason) => {
//     console.log('Failed: ' + reason)
//   })
// }
//
// async function getIpv4 () {
//   const url = 'https://yc-node-utils.herokuapp.com/api/utils/ip/4'
//   const res = await fetch(url)
//   const json = await res.json()
//   console.log('ip res', json)
//   return json
// }
//
// async function getWechatPaymentInfo (data) {
//   const ip = await getIpv4()
//   const url = 'https://yc-node-utils.herokuapp.com/api/wechat/pay'
//   const attach = JSON.stringify({
//     'site_uuid': data.siteUuid,
//     'payment_uuid': data.paymentUuid,
//     'order_no': data.orderNo
//   })
//   const postData = {
//     'appid': data.appId,
//     'mch_id': '1501890211',
//     'apiKey': data.apiKey,
//     'body': '澳优国际',
//     'attach': attach,
//     'out_trade_no': data.orderNo + '_' + ((Math.random() * 9000 | 0) + 1000),
//     'total_fee': data.total * 100,
//     'spbill_create_ip': ip.address,
//     'notify_url': data.url,
//     'trade_type': 'APP'
//   }
//   console.log('postData', postData)
//   const res = await axios.post(url, postData)
//   console.log('wechat res', res)
//   return res.data
// }
