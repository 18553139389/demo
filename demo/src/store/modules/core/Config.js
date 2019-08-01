// initial state
const state = {
  openSystemMenu: true,
  receivePaymentTime: 10000, // 10s
  needSync: true,
  syncTime: '1:30',
  appName: 'AoYou',
  domains: {
    development: ['localhost', 'dev.local'],
    production: ['acme.com', 'acme.net', 'acme.org']
  },
  api: {
    home_api_endpoint: '/api/v1/cms/home',
    content_page_api_endpoint: '/api/v1/cms/content',
    server_alive_api: '/api/v1/heartbeat/live',
    store_login: '/core/store',
    core_customer: '/core/customer',
    core_customer_register: '/core/customer/register',
    core_social_media_wechat: '/core/social_media',
    core_sms: '/core/sms',
    collection_diagnostic: '/api/v1/collection_diagnostic',
    product_attribute_api_endpoint: '/api/v1/product_attribute',
    customer_api_endpoint: '/api/v1/customer',
    product_api_endpoint: '/api/v1/product',
    product_api_search: '/api/v1/search',
    order_api_endpoint: '/api/v1/order',
    category_api_endpoint: '/api/v1/category',
    coupon_api_endpoint: '/api/v1/coupon',
    consignee_api_endpoint: '/api/v1/consignee',
    version_api_endpoint: '/api/v1/version',
    cart: '/api/v1/cart',
    transport: '/api/v1/transport',
    currency: '/api/v1/currency',
    payment_gateway: '/api/v1/payment_gateway'
  },
  apiServerList: [
    {
      'name': 'Production',
      'address': 'https://www.ibizcloud.com.au',
      'row_key': 0
    },
    {
      'name': 'Teaser',
      'address': 'http://teaser.ibizplus.co',
      'row_key': 1
    },
    {
      'name': 'Demo',
      'address': 'http://demo.iposcloud.com.au',
      'row_key': 2
    }
  ]
}

// getters
const getters = {
  getApiList: state => state.api,
  getAppName: state => state.appName,
  getApiServerList: (state) => {
    state.apiServerList[3] = {
      'name': 'Development',
      'address': 'http://poscloud.test',
      'row_key': 3
    }
    return state.apiServerList
  }
}
// actions
const actions = {}

// mutations
const mutations = {}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
