import _ from '../../../../vendor/underscore/underscore'
import client from '../../../library/Rest'
import sync from '@lib/module/Sync'
let posAPI

// initial state
const state = {
  added: [],
  carts: [],
  chooseAttributes: {},
  checkoutStatus: null,
  lowestProduct: null,
  product: null, // 用在商品详情
  order: {}, // 订单时的商品,
  allBtn: false,
  isPaying: false,
  manageOpen: false
}

// getters
const getters = {
  getManageOpen: state => state.manageOpen,
  getIsPaying: state => state.isPaying,
  // getCheckedItems: state => _.filter(state.carts.items, item => item.checked),
  getCheckedItemIndexs: (state, getters) => {
    let indexs = _.map(getters.getCheckedItems, item => item.index)
    console.log('indexs', indexs)
    return indexs
  },
  // isItemChecked: state => {
  //   let items = state.carts.items
  //   let item = items && _.find(items, item => item.checked)
  //   return !!item
  // },
  // isAllItemsChecked: state => {
  //   let items = state.carts.items
  //   let item = items && _.find(items, item => !item.checked)
  //   return !item
  // },
  getTotalPrice: state => {
    let items = state.carts.items
    let result = 0
    items && _.each(items, item => {
      if (item.checked) {
        result += item.qty * item.subtotal
      }
    })

    return result
  },
  getAllBtn: state => state.allBtn,
  checkoutStatus: state => state.checkoutStatus,
  getCarts: state => state.carts,
  getCartsReverse: state => state.carts.items ? state.carts.items.reverse() : [],
  getLowestProduct: state => state.lowestProduct,
  getChooseAttributes: state => state.chooseAttributes,
  cartTotalPrice: (state, getters) => {
    // let totalPrice = getters.getCarts.reduce((total, product) => {
    //   return parseFloat(total + product.subtotal)
    // }, 0)
    // let minProductPrice = 0
    // if (getters.cartTotalQty > 0 && state.lowestProduct !== null && state.lowestProduct.item !== undefined) {
    //   minProductPrice = parseFloat(state.lowestProduct.item.product.price)
    // }
    // let finalPrice = totalPrice - minProductPrice
    // return Number(finalPrice.toFixed(2))
  },
  cartTotalQty: (state, getters) => {
    // return getters.getCarts.reduce((total, product) => {
    //   return parseInt(total + product.qty)
    // }, 0)
  },
  getProduct: (state, getters) => { // 返回商品id
    return state.product
  },
  getOrder: (state, getters) => {
    return state.order
  }
}
// actions
const actions = {
  DELETE_CART_ITEM_FROM_CLOUD ({rootState, rootGetters, state, getters}, {checkedItemIndexs, cb}) {
    let endpoint = rootGetters['server/getEndpoint']
    let token = rootGetters['account/getCustomerToken']
    let api = rootGetters['configs/getApiList'].cart + '/delete'
    let apiurl = endpoint + api
    // let checkedItemIndexs = getters.getCheckedItemIndexs
    console.log('传到Catr里的checkedItemIndexs: ', checkedItemIndexs)
    let data = JSON.stringify({
      cart_index_ids: checkedItemIndexs
    })
    wx.request({
			url: apiurl, 
			method: 'POST',
			data: data,
			header: {
				'Authorization': token,
				'content-type': 'application/json' // 默认值
			},
			success(res) {
        console.log(res)
        if (res.data.code === 200) {
            cb && cb()
          }
        },
			fail() {
				
			}
		})
    // client.post(apiurl, token, data, (s) => {
    //   if (s.code === 200) {
    //     cb && cb()
    //     // this.$store.commit('cart/DELETE_ITEM_IN_CART', index)
    //   }
    //   // this.getLoadingVisible = false
    //   console.log("删除成功了---")
    // }, (e) => {})
  },
  GET_DATA_FROM_CLOUD  ({ commit, rootState }, {cb, errorCb}) {
    let requestUrl = rootState.configs.api['cart'] + '?currency=CNY&has_photo=true&is_base64=false'
    
    sync.getDataFromCloud(rootState, requestUrl, rootState.database.dbTable.cart, function (res) {
      console.log(res,'cart内容')
      commit('SYNC_CART_TO_LOC', res.data.data.items) // 加了data
      if (cb !== undefined) cb(res)
    })
    console.log("走完了Cart")
  },
  UPDATE_QTY_PRODUCT_IN_CART ({ state, commit }, {cartItem, row, quantity}) {
    commit('SET_CHECKOUT_STATUS', null)
    const product = cartItem.product
    if (quantity <= 0) quantity = 1
    if (product.stock_control !== undefined && product.stock_control) {
      if (product.total_stock > 0) {
        commit('UPDATE_ITEM_QUANTITY', { row, quantity })
        // remove 1 item from stock
        // commit('decrementProductInventory', { id: product.id })
      }
    } else {
      commit('UPDATE_ITEM_QUANTITY', { row, quantity })
    }
    commit('COMMIT_REFRESH_CART', row)
    // console.log(cartItem, row, quantity)
  },
  ADD_PRODUCT_TO_CART ({ state, commit }, {product, attributes}) {
    commit('SET_CHECKOUT_STATUS', null)
    if (product.stock_control !== undefined && product.stock_control && product.total_stock <= 0) {
      console.log('Out of stock')
    } else {
      if (_.isEmpty(attributes)) {
        const cartItem = state.carts.find(item => item.id === product.id)
        if (cartItem) {
          commit('INCREMENT_ITEM_QUANTITY', cartItem)
        } else {
          commit('PUSH_PRODUCT_TO_CART', { product, attributes })
        }
      } else {
        commit('PUSH_PRODUCT_TO_CART', { product, attributes })
      }
    }
    // remove 1 item from stock
    if (product.stock_control !== undefined && product.stock_control) {
      // commit('decrementProductInventory', { id: product.id })
    }
    // commit('COMMIT_REFRESH_CART')
  },
  UPDATE_PRODUCT_ATTRIBUTE_IN_CART ({ state, commit }, {row, attributes}) {
    commit('COMMIT_UPDATE_PRODUCT_ATTRIBUTE_IN_CART', {row, attributes})
  },
  REMOVE_PRODUCT_TO_CART ({ commit }, row) {
    commit('COMMIT_REMOVE_PRODUCT_TO_CART', row)
  },
  RESET_CHOOSE_ATTRIBUTES ({ commit }) { commit('COMMIT_RESET_CHOOSE_ATTRIBUTES') },
  RESET_CART ({ commit }) { commit('COMMIT_RESET_CART') },
  ADD_ATTRIBUTE_TO_PRODUCT ({ commit }, { productId, attributeType, attribute }) { commit('PUSH_ATTRIBUTE_TO_PRODUCT', { productId, attributeType, attribute }) },
  CHECKOUT ({ commit, state }, products) {
    // const savedCartItems = [...state.added]
    commit('SET_CHECKOUT_STATUS', null)
    // empty cart
    commit('SET_CART_ITEMS', { items: [] })
    // shopApi.buyProducts(
    //     products,
    //     () => commit('SET_CHECKOUT_STATUS', 'successful'),
    //     () => {
    //       commit('SET_CHECKOUT_STATUS', 'failed')
    //       // rollback to the cart saved before sending the request
    //       commit('SET_CART_ITEMS', { items: savedCartItems })
    //     }
    // )
  },
  SET_LOWEST_PRICE_PRODUCT ({commit, rootState, getters}) {
    let couponCode = rootState.pos.couponCode
    let result = {}
    if (couponCode !== null) {
      let allCarts = getters.getCarts
      if (!allCarts.length) {
        return false
      }
      const minProduct = _.min(allCarts, function (o) { return o.product.price })
      // 当allCarts 为空时 _.min 输出了一个无限大整形 test
      if (minProduct) {
        minProduct.noBonus = true
        result = {
          item: minProduct,
          key: _.findKey(allCarts, item => item === minProduct)
        }
      }
    }
    commit('SET_LOWEST_PRICE_PRODUCT', result)
  },
  GET_CARTS_FROM_CLOUD ({commit, rootState, getters}, {store}) {
    let endpoint = store.getters['server/getEndpoint']
    let token = store.getters['account/getCustomerToken']
    let api = store.getters['config/getApiList'].shopcart + '/'
    let apiurl = endpoint + api
    client.get(apiurl, token, (s) => {
      if (s.code === 200) {
        let carts = s.data.content
        // console.log('carts: ', carts)
        commit('COMMIT_RESET_CART_FROM_CLOUD', carts)
      }
    }, (e) => {
    })
  }
}

// mutations
const mutations = {
  CHANGE_MANAGE (state, bool) {
    state.manageOpen = bool
  },
  CHANGE_ISPAYING (state, bool) {
    state.isPaying = bool
  },
  RESET_CART (state) {
    _.each(state.carts.items, item => {
      item.checked = false
    })
    state.allBtn = false
  },
  DELELTE_ITEM_BY_CHECKED (state) {
    let items = state.carts.items
    let copyItems = JSON.parse(JSON.stringify(items))
    let newItems = []
    _.each(copyItems, item => {
      if (!item.checked) {
        newItems.push(item)
      }
    })
    state.carts.items = newItems
  },
  DECREASE_QTY_BY_INDEX (state, index) {
    _.each(state.carts.items, item => {
      if (item.index === index && item.qty > 1) {
        item.qty --
      }
    })
  },
  INCREASE_QTY_BY_INDEX (state, index) {
    _.each(state.carts.items, item => {
      if (item.index === index) {
        item.qty ++
      }
    })
  },
  CHECK_ONE_ITEM (state, index) {
    _.each(state.carts.items, item => {
      if (item.index === index) {
        item.checked = !item.checked
      }
      if (item.checked === false) {
        state.allBtn = false
      }
    })
  },
  CHECK_ALL_ITEM (state) {
    state.allBtn = !state.allBtn
    _.each(state.carts.items, item => {
      item.checked = state.allBtn
    })
  },
  CHANGE_ALL_BTN (state, bool) {
    state.allBtn = bool
  },
  SYNC_CART_TO_LOC (state, data) {
    // console.log('carts: ', data)
    // alert(1)
    _.each(data, item => {
      item.checked = false
      item.price = parseFloat(item.price)
      item.qty = parseInt(item.qty)
    })
    // data.items && data.items.forEach(item => {
    //   item.checked = false
    // })
    if (!_.isArray(data)) {
      data = _.toArray(data)
    }
    console.log('SYNC_CART_TO_LOC', data)
    state.carts = data
  },
  COMMIT_RESET_ORDER (state, order) { // 重置订单的页面的购物车
    state.order = order
    console.log("进了CART，重制订单")
  },
  COMMIT_RESET_CART_FROM_CLOUD (state, carts) { // 从云端重置购物车
    // console.log('COMMIT_RESET_CART_FROM_CLOUD', carts)
    state.carts = carts
  },
  DELETE_ITEM_IN_CART (state, index) {
    // state.carts.items.splice(index, 1)
    state.carts.items = _.filter(state.carts.items, item => item.index !== index)
  },
  SET_PRODUCT: (state, product) => { // 设置商品详情的id
    state.product = product
  },
  SET_LOWEST_PRICE_PRODUCT (state, result) {
    state.lowestProduct = result
  },
  RESET_LOWEST_PRODUCT (state) {
    state.lowestProduct = null
  },
  PUSH_PRODUCT_TO_CART (state, {product, attributes}) {
    // let quantity = 1
    // let subtotal = posAPI.CALCULATE_PRODUCT_SUBTOTAL(product, attributes, quantity)
    // state.carts.push({
    //   product,
    //   id: product.id,
    //   categoryIds: product.product_in_category,
    //   attributes,
    //   subtotal: subtotal,
    //   qty: quantity,
    //   subtotalFormat: subtotal.toFixed(2)
    // })
    // console.log('PUSH_PRODUCT_TO_CART', product)
    state.carts.push(product)
  },
  COMMIT_REFRESH_CART (state, row) {
    const cartItem = state.carts[row]
    let attributes = (cartItem.attributes !== undefined) ? cartItem.attributes : []
    let subtotal = posAPI.CALCULATE_PRODUCT_SUBTOTAL(cartItem.product, attributes, cartItem.qty)
    cartItem.subtotal = subtotal
    cartItem.subtotalFormat = subtotal.toFixed(2)
  },
  COMMIT_RESET_CART (state) {
    state.carts = []
    state.chooseAttributes = {}
    state.checkoutStatus = null
    state.lowestProduct = null
  },
  COMMIT_RESET_CHOOSE_ATTRIBUTES (state) {
    state.chooseAttributes = {}
  },
  PUSH_ATTRIBUTE_TO_PRODUCT (state, { productId, attributeType, attribute }) {
    let price = parseFloat(attribute.price)
    let currencyPrice = parseFloat(attribute.currencyPrice)
    let attributeContent = {
      id: attribute.id,
      type: attributeType.name,
      name: attribute.name,
      productId,
      price: (price > 0) ? price : 0,
      currencyPrice: (currencyPrice > 0) ? currencyPrice : 0,
      qty: 1
    }
    if (attributeType.allow_multiple) {
      if (!_.isArray(state.chooseAttributes[attributeType.id])) {
        state.chooseAttributes[attributeType.id] = []
      }
      state.chooseAttributes[attributeType.id].push(attributeContent)
    } else {
      state.chooseAttributes[attributeType.id] = attributeContent
    }
  },
  COMMIT_UPDATE_PRODUCT_ATTRIBUTE_IN_CART (state, {row, attributes}) {
    state.carts[row].attributes = attributes
  },
  INCREMENT_ITEM_QUANTITY (state, cartItem) {
    cartItem.qty++
    cartItem.subtotal = cartItem.product.price * cartItem.qty
    cartItem.subtotalFormat = cartItem.subtotal.toFixed(2)
  },
  UPDATE_ITEM_QUANTITY (state, { row, quantity }) {
    state.carts[row].qty = quantity
  },
  COMMIT_REMOVE_PRODUCT_TO_CART (state, row) {
    if (state.carts[row] !== undefined) {
      state.carts.splice(row, 1)
    }
  },
  SET_CART_ITEMS (state, { items }) {
    state.added = items
  },
  SET_CHECKOUT_STATUS (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
