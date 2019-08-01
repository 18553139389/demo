import Vue from 'vue'
import Vuex from 'vuex'

import page from './store/modules/Page'
import server from './store/modules/core/Server'
import env from './store/modules/core/Env'
import account from './store/modules/core/Account'
import payment from './store/modules/Payment'
import category from './store/modules/Category'
import queue from './store/modules/core/Queue'
import configs from './store/modules/core/Config'
import database from './store/modules/core/Database'
import product from './store/modules/Product'
import cart from './store/modules/core/Cart'
import transport from './store/modules/Transport'
import coupon from './store/modules/Coupon'
import consignee from './store/modules/Consignee'
import orderHistory from './store/modules/OrderHistory'

import loading from './store/modules/core/Loading'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  page,
	server,
	env,
	account,
	payment,
	category,
	queue,
	database,
	configs,
	product,
	cart,
	transport,
	coupon,
	loading,
	consignee,
	orderHistory
  }
})
