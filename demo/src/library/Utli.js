// import PaymentSuccess from '@/components/payment/success'
// import { Toast } from 'vant'

export default {
	changeBackgroudClass(backgroudClass) {
		$('.page__background').addClass(backgroudClass)
	},
	getServerByStore(store) {
		let env = store.getters['env/getEnv']
		let serverList = store.getters['env/getEnvList']
		return serverList[env]
	},
	getServer(rootState) {
		let env = rootState.env.currentEnv
		let serverList = rootState.env.envList
		return serverList[env]
	},
	getEndpoint(store) {
		let endpoint = store.getters['server/getEndpoint']
		if (endpoint === undefined || endpoint === '' || endpoint === null) {
			let env = store.getters['env/getEnv']
			let serverList = store.getters['env/getEnvList']
			endpoint = serverList[env].serverUrl
			store.dispatch('server/SET_ENDPOINT', endpoint)
		}
		return endpoint
	},
	getURLParameters(sURL) {
		if (sURL.indexOf('?') > 0) {
			let arrParams = sURL.split('?')
			let arrURLParams = arrParams[1].split('&')
			let arrParamNames = new Array(arrURLParams.length)
			let arrParamValues = new Array(arrURLParams.length)

			let i = 0
			for (i = 0; i < arrURLParams.length; i++) {
				let sParam = arrURLParams[i].split('=')
				arrParamNames[i] = sParam[0]
				if (sParam[1] !== '') {
					arrParamValues[i] = unescape(sParam[1])
				} else {
					arrParamValues[i] = 'No Value'
				}
			}
			let result = []
			for (i = 0; i < arrURLParams.length; i++) {
				result[arrParamNames[i]] = arrParamValues[i]
			}
			return result
		}
	},
	//   appRedirectPage (store) {
	//     let appVar = store.getters['system/getAppVar']
	//     switch (appVar.page) {
	//       case 'PaymentSuccess':
	//         let order = {
	//           total: appVar.total
	//         }
	//         store.dispatch('system/RESET_APP_VAR')
	//         store.commit('navigator/reset', {
	//           extends: PaymentSuccess,
	//           onsNavigatorProps: {
	//             order: order
	//           }
	//         })
	//         break
	//       default:
	//         store.dispatch('system/RESET_APP_VAR')
	//         // store.commit('navigator/reset', Home)
	//     }
	//   },
	loginCheck(store, router, currentPage, routerName, cb) {
		let isLogin = store.getters['account/isLogin']
		if (!isLogin) {
			store.commit('page/COMMIT_REDIRECT', {
				page: currentPage
			})
			if (routerName.indexOf('login') > -1) {
				store.commit('updateDirection', {
					direction: 'up'
				})
			}
			router.push({
				path: '/pages/login/main',
				query: {
					uuid: currentPage.query.uuid
				}
			})
		} else {
			if (cb !== undefined) cb()
		}
	},
	/**
	 * 去到指定定页面
	 * @param router
	 * @param page | url: 页面路由地址, query: 页面传送参数,可为空，参考$router
	 * @param action | 默认是 push, 其他为: replace, forward
	 */
	goToUrl(router, page, action) {
		if (page.url !== '') {
			if (action === undefined) action = 'push'
			let target = {
				path: page.url
			}
			if (page.query !== '') {
				target.query = page.query
			}
			var arr1 = target.path.split('?');

			if (arr1[0] == 'category') {
				target.path = '../category/main?' + arr1[1]
				console.log(arr1[1],'分类页面')
			}
			if (arr1[0] == 'cms') {
				target.path = '../cms/main?' + arr1[1]
			}

			if (arr1[0] == 'card') {
				target.path = '../card/main?' + arr1[1]
			}
			if (arr1[0] == 'person') {
				target.path = '../person/main?' + arr1[1]
			}
			if (arr1[0] == '/product') {
				target.path = '../productDetail/main'
				router.push({
					path: target.path,
					query: {
						uuid: target.query
					}
				});
			}
			if (arr1[0] == 'order/history') {
				router.push('/pages/order/main');
			}
			if (arr1[0] == 'me/coupon') {
				router.push('/pages/coupon/main');
			}
			wx.redirectTo({
				url: target.path
			})
		}
	},
	goToUrlWithAuth(store, router, page, action, fullScreen) {
		this.goToUrl(router, page, action)
// 		let loginUrl = 'login?hide-tab-bar'
// 		if (fullScreen === true) {
// 			loginUrl += '&hide-nav'
// 		}
// 		this.loginCheck(store, router, page, loginUrl, function() {
// 			this.goToUrl(router, page, action)
// 		}.bind(this))
	},
	formatCurrencyPrice(currencyPrice) {
		return (currencyPrice) ? '(约合¥' + parseFloat(currencyPrice).toFixed(2).toString() + ')' : ''
	},
	formatTargetPrice(price) {
		return (price) ? 'AUD$' + parseFloat(price).toFixed(2) : ''
	},
	/**
	 * 链接里面还有redirect=xxxx的页面进行自动跳转
	 * @param router
	 */
	redirectPage(router) {
		let path = router.history.current
		if (path.fullPath.indexOf('redirect=') > -1) {
			let redirect = path.query.redirect
			if (redirect !== '' && path.query.redirect !== undefined) {
				let currentPage = path.query.redirect
				delete path.query.redirect
				let page = {
					url: currentPage,
					query: path.query
				}
				this.goToUrl(router, page, 'replace')
			}
		}
	},
	//   loadingMessage ({message, mask}) {
	//     if (mask === undefined) { mask = true }
	//     return Toast.loading({
	//       mask,
	//       loadingType: 'spinner',
	//       forbidClick: true,
	//       message: message,
	//       duration: 0
	//     })
	//   }
}
