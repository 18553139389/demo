import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//first
const First = () => import('@/components/first')
const Classify = () => import("@/components/classify")
const NearShop = () => import("@/components/near_shop")
const Person = () => import("@/components/person")
const kong = () => import("@/components/component/kong")
const DiscountDetail = () => import('@/components/discount_detail')
const Search = () => import('@/components/search')
const SearchProduct = () => import('@/components/search_product')
const SearchShop = () => import('@/components/search_shop')
const ClassifySearch = () => import("@/components/classify_search")
const ClassifySearchone = () => import("@/components/classify_searchone")
const Comment = () => import("@/components/comment")
const CommentDetail = () => import("@/components/comment_detail")
const DiscountList = () => import("@/components/discountList")
//Login
const Login = () => import("@/components/Login/login")
const Binded = () => import("@/components/Login/binded")
const fenghao = () => import("@/components/Login/fenghao")
const Forget = () => import("@/components/Login/forget")
const Register = () => import("@/components/Login/register")
//Fuwen
const Fuwen = () => import("@/components/Fuwen/fuwen")
const Fei = () => import("@/components/Fuwen/fei")
//Person
const PersonMsg = () => import("@/components/Person/person_msg")
const Modify = () => import("@/components/Person/modify")
const Cancel = () => import("@/components/Person/cancel")
const Tenants = () => import("@/components/Person/tenants")
const Logistic = () => import("@/components/Person/logistic")
const SetUp = () => import("@/components/Person/SetUp")
const Service = () => import("@/components/Person/service")
const Store = () => import("@/components/Person/store")
const Evaluation = () => import("@/components/Person/evaluation")
const Message = () => import("@/components/Person/message")
const MessageDetail = () => import("@/components/Person/message_detail")
//SetUP
const Xiulogin = () => import("@/components/SetUP/xiulogin")
const Provisions = () => import("@/components/SetUP/provisions")
const Problem = () => import("@/components/SetUP/problem")
const ProblemDetails = () => import("@/components/SetUP/problemDetails")
const Feedback = () => import("@/components/SetUP/feedback")
const ProvisionsDetail = () => import("@/components/SetUP/provisionsDetail")
//Shop
const ShopDetail = () => import("@/components/Shop/shop_detail")
const ShopDetailfirst = () => import('@/components/Shop/shop_detailfirst')
const ShopDetailcart = () => import('@/components/Shop/shop_detailcart')
const ShopDetails = () => import('@/components/Shop/shop_details')
const ShopDetailsx = () => import('@/components/Shop/shop_detailsx')
const ShopDetailshang = () => import('@/components/Shop/shop_detailshang')
const ShopDetailfen = () => import("@/components/Shop/shop_detailfen")
const ShopDetailshou = () => import('@/components/Shop/shop_detailshou')
const ShopDetailshuo = () => import("@/components/Shop/shop_detailshuo")
const ShopDetailzhe = () => import("@/components/Shop/shop_detailzhe")
//Coupon
const Coupon = () => import('@/components/Coupon/coupon')
const Couponsx = () => import('@/components/Coupon/couponsx')
const Couponzhe = () => import('@/components/Coupon/couponzhe')
const Couponshou = () => import('@/components/Coupon/couponshou')
const Couponlin = () => import("@/components/Coupon/couponlin")
const Couponlin1 = () => import("@/components/Coupon/couponlin1")
const Couponlin3 = () => import("@/components/Coupon/couponlin3")
//Goods
const GoodsDetail = () => import("@/components/Goods/goodsDetail")
const Goodsxiang = () => import("@/components/Goods/goodsxiang")
const GoodsDetails = () => import("@/components/Goods/goodsDetails")
const GoodsDetails1 = () => import("@/components/Goods/goodsDetails1")
const GoodsDetailsx = () => import("@/components/Goods/goodsDetailsx")
const GoodsDetailshang = () => import("@/components/Goods/goodsDetailshang")
const GoodsDetailsx1 = () => import("@/components/Goods/goodsDetailsx1")
const GoodsDetailfen = () => import("@/components/Goods/goodsDetailfen")
const GoodsDetailshou = () => import("@/components/Goods/goodsDetailshou")
const GoodsDetailshou1 = () => import("@/components/Goods/goodsDetailshou1")
const GoodsDetailshop = () => import("@/components/Goods/goodsDetailshop")
const GoodsDetailzhe = () => import("@/components/Goods/goodsDetailzhe")
const GoodsDetailzhe1 = () => import("@/components/Goods/goodsDetailzhe1")
const GoodsDetailnear = () => import("@/components/Goods/goodsDetailnear")
const Goodsfirshop = () => import("@/components/Goods/goodsfirshop")
//Order
const Order = () => import("@/components/Order/order")
const Orders = () => import("@/components/Order/orders")
const Pay = () => import("@/components/Order/pay")
const PayResult = () => import("@/components/Order/pay_result")
const OrderCenter = () => import("@/components/Order/order_center")
const TuiShop = () => import("@/components/Order/tui_shop")
const OrderDetail = () => import("@/components/Order/order_detail")
const Bill = () => import("@/components/Order/bill")
//Cart
const Cart = () => import("@/components/Cart/cart")
const Carts = () => import("@/components/Cart/carts")
//Address
const Address = () => import("@/components/Address/address")
const Addresser = () => import("@/components/Address/addresser")
const Addressyi = () => import("@/components/Address/addressyi")
const MvpMap = () => import("@/components/Address/mvp_map")
//IncreaseAdd
const Add = () => import("@/components/IncreaseAdd/add")
const Adder = () => import("@/components/IncreaseAdd/adder")
const Addyi = () => import("@/components/IncreaseAdd/addyi")
//EditorAdd
const Adds = () => import("@/components/EditorAdd/adds")
const Addser = () => import("@/components/EditorAdd/addser")
const Addsyi = () => import("@/components/EditorAdd/addsyi")

export default new Router({
  routes: [{
      path: '/',
      redirect: '/first',
    },
    //first
    {
      path: '/first',
      component: First
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/near_shop',
      component: NearShop
    },
    {
      path: '/person',
      component: Person
    },
    {
      path: '/kong',
      component: kong
    },
    {
      path: '/discount_detail',
      component: DiscountDetail
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/search_product',
      name: 'search_product',
      component: SearchProduct
    },
    {
      path: '/search_shop',
      name: 'search_shop',
      component: SearchShop
    },
    {
      path: '/classify_search/:id',
      name: 'ClassifySearch',
      component: ClassifySearch
    },
    {
      path: '/classify_searchone/:id',
      name: 'ClassifySearchone',
      component: ClassifySearchone
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: Comment
    },
    {
      path: '/comment_detail',
      name: 'CommentDetail',
      component: CommentDetail
    },
    {
      path: '/discountList',
      name: 'discountList',
      component: DiscountList
    },
    //Login
    {
      path: '/login',
      component: Login
    },
    {
      path: '/Binded',
      name: 'binded',
      component: Binded
    },
    {
      path: '/fenghao',
      component: fenghao
    },
    {
      path: '/forget',
      component: Forget
    },
    {
      path: '/register',
      component: Register
    },
    //Fuwen
    {
      path: '/fuwen',
      name: 'Fuwen',
      component: Fuwen
    },
    {
      path: '/fei',
      component: Fei
    },
    //Person
    {
      path: '/person_msg',
      meta: {
        requireAuth: true,
      },
      component: PersonMsg
    },
    {
      path: '/modify',
      component: Modify
    },
    {
      path: '/cancel',
      name: 'cancel',
      component: Cancel
    },
    {
      path: '/tenants',
      meta: {
        requireAuth: true,
      },
      component: Tenants
    },
    {
      path: '/logistic',
      component: Logistic
    },
    {
      path: '/SetUp',
      meta: {
        requireAuth: true,
      },
      component: SetUp
    },
    {
      path: '/service',
      meta: {
        requireAuth: true,
      },
      component: Service
    },
    {
      path: '/store',
      name: 'store',
      meta: {
        requireAuth: true,
      },
      component: Store
    },
    {
      path: '/evaluation',
      meta: {
        requireAuth: true,
      },
      component: Evaluation
    },
    {
      path: '/message',
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Message
    },
    {
      path: '/message_detail',
      name: 'message_detail',
      component: MessageDetail
    },
    //SetUP
    {
      path: '/xiulogin',
      component: Xiulogin
    },
    {
      path: '/provisions',
      component: Provisions
    },
    {
      path: '/problem',
      component: Problem
    },
    {
      path: '/problemDetails',
      component: ProblemDetails
    },
    {
      path: '/feedback',
      component: Feedback
    },
    //Shop
    {
      path: '/shop_detail',
      name: 'shop_detail',
      component: ShopDetail
    },
    {
      path: '/shop_detailfirst',
      name: 'shop_detailfirst',
      component: ShopDetailfirst
    },
    {
      path: '/shop_detailcart',
      name: 'shop_detailcart',
      component: ShopDetailcart
    },
    {
      path: '/shop_details',
      name: 'shopdetails',
      component: ShopDetails
    },
    {
      path: '/shop_detailsx',
      name: 'shopdetailsx',
      component: ShopDetailsx
    },
    {
      path: '/shop_detailshang',
      name: 'ShopDetailshang',
      component: ShopDetailshang
    },
    {
      path: '/shop_detailfen',
      name: 'shopdetailfen',
      component: ShopDetailfen
    },
    {
      path: '/shop_detailshou',
      name: 'shopdetailshou',
      component: ShopDetailshou
    },
    {
      path: '/shop_detailshuo',
      name: 'shopdetailshuo',
      component: ShopDetailshuo
    },
    {
      path: '/shop_detailzhe',
      name: 'shopdetailzhe',
      component: ShopDetailzhe
    },
    //Coupon
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon
    },
    {
      path: '/couponsx',
      name: 'couponsx',
      component: Couponsx
    },
    {
      path: '/couponzhe',
      name: 'couponzhe',
      component: Couponzhe
    },
    {
      path: '/couponshou',
      name: 'couponshou',
      component: Couponshou
    },
    {
      path: '/couponlin',
      name: 'couponlin',
      component: Couponlin
    },
    {
      path: '/couponlin1',
      name: 'couponlin1',
      component: Couponlin1
    },
    {
      path: '/couponlin3',
      name: 'couponlin3',
      component: Couponlin3
    },
    //Goods
    {
      path: '/goods_detail',
      name: 'goods_detail',
      component: GoodsDetail
    },
    {
      path: '/goods_details',
      name: 'goods_details',
      component: GoodsDetails
    },
    {
      path: '/goods_details1',
      name: 'goods_details1',
      component: GoodsDetails1
    },
    {
      path: '/goods_detailsx',
      name: 'goods_detailsx',
      component: GoodsDetailsx
    },
    {
      path: '/goods_Detailshang',
      name: 'goods_Detailshang',
      component: GoodsDetailshang
    },
    {
      path: '/goods_detailsx1',
      name: 'goods_detailsx1',
      component: GoodsDetailsx1
    },
    {
      path: '/goods_detailnear',
      name: 'goods_detailnear',
      component: GoodsDetailnear
    },
    {
      path: '/goods_detailfen',
      name: 'goods_detailfen',
      component: GoodsDetailfen
    },
    {
      path: '/goods_detailshou',
      name: 'goods_detailshou',
      component: GoodsDetailshou
    },
    {
      path: '/goods_detailshou1',
      name: 'goods_detailshou1',
      component: GoodsDetailshou1
    },
    {
      path: '/goods_detailshop',
      name: 'goods_detailshop',
      component: GoodsDetailshop
    },
    {
      path: '/goods_detailzhe',
      name: 'goods_detailzhe',
      component: GoodsDetailzhe
    },
    {
      path: '/goodsxiang',
      name: 'goodsxiang',
      component: Goodsxiang
    },
    {
      path: '/goods_detailzhe1',
      name: 'goods_detailzhe1',
      component: GoodsDetailzhe1
    },
    {
      path: '/Goodsfirshop',
      name: 'Goodsfirshop',
      component: Goodsfirshop
    },
    //Order
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/orders',
			name: 'orders',
      component: Orders
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/pay_result',
      component: PayResult
    },
    {
      path: '/order_center/:id',
      meta: {
        requireAuth: true,
      },
      component: OrderCenter
    },
    {
      path: '/TuiShop/:id',
      component: TuiShop
    },
    {
      path: '/order_detail',
      component: OrderDetail
    },
    {
      path: '/bill',
      component: Bill
    },
    //Cart
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/carts',
      component: Carts
    },
    //Address
    {
      path: '/address',
      meta: {
        requireAuth: true,
      },
      component: Address
    },
    {
      path: '/addresser',
      component: Addresser
    },
    {
      path: '/addressyi',
      component: Addressyi
    },
    {
      path: '/MvpMap',
      component: MvpMap
    },
    //IncreaseAdd
    {
      path: '/add',
      component: Add
    },
    {
      path: '/adder',
      component: Adder
    },
    {
      path: '/addyi',
      component: Addyi
    },
    //EditorAdd
    {
      path: '/adds',
      component: Adds
    },
    {
      path: '/addser',
      component: Addser
    },
    {
      path: '/addsyi',
      component: Addsyi
    },
		{
		  path: '/provisionsDetail',
		  component: ProvisionsDetail
		}
  ]
})
