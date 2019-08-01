import client from '@lib/Rest'
import vantCoupon from '@lib/vant/coupon'
import _ from 'underscore'

export default {
 
  getCouponByProducts (store, productList, spendAmount, cb) {
    let self = this
    let endpoint = store.getters['server/getEndpoint']
    let token = store.getters['account/getCustomerToken']
    let apiUrl = endpoint + store.getters['configs/getApiList'].coupon_api_endpoint + '/can_use' + '?currency=CNY'
    let products = []
    console.log("进coupon了")
    _.map(productList, function (item) {
      console.log(item,"coupon的东西")
      products.push({
        uuid: item.product_uuid,
        qty: item.qty
      })
    })
    wx.request({
			url: apiUrl, 
			method: 'POST',
			data: JSON.stringify({products: products, spend_amount: spendAmount}),
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
        console.log(res,"post请求也成功了")
        let couponList = self.getCouponByCoupons(res.data.data)
        cb(couponList)
			},
			fail() {
			}
		})
  },
  getCouponByCoupons (coupons) {
    let couponList = {
      enable: [],
      disable: []
    }
    _.map(coupons, function (item) {
      if (item.can_use) {
        couponList.enable = [vantCoupon.covert(item), ...couponList.enable]
      } else {
        couponList.disable = [vantCoupon.covert(item), ...couponList.disable]
      }
    })
    return couponList
  }
}
