import mobilePhone from '@lib/MoiblePhone'
import client from '@lib/Rest'

export default {
  requestCode (store, mobile, successCb, failWithReturnCb, failCb) {
    let companyUuid = store.getters['env/getUuid']
    let requestUrl = store.getters['configs/getApiList'].core_sms + '/captcha'
    let apiUrl = store.getters['server/getEndpoint'] + requestUrl
		console.log(mobile,'看看电话号码')
    let data = {
      'mobile': encodeURI(mobilePhone.mobileNumberOutput(mobile)),
      'company': companyUuid
    }
		console.log(data,'看看电话号码')
		wx.request({
			url: apiUrl, 
			method: 'POST',
			data: data,
			header: {
				'Authorization': '',
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				if (successCb !== undefined) successCb(res)
			}
		})
  }
}
