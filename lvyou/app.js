
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    // 用户信息
    userInfo: null,
    // 用户code
    code:"",
    // 用户id
    userId:"",
    // 客服电话
    kfphone:"",
    // 当前地址信息
    address:"",
    // 点击订单信息
    orederMes:[],
    // 类别一级列表
    icon:"",
    // 个人中心信息
    myMessage:"",
    // 是否使用优惠券
    isQuan:false,
    // 记录支付成功与否来刷新数据
    ispay:false,
    // 记录是否评价
    ispj:false,
    // 是否选取新的取票人
    qupiao:null,
    // 城市信息
    city:"三亚",
    // 旅游套餐票
    tao:"",
    // 记录取票人
    piao:"",
    // 选票时间
    time:"",
    //记录切换状态
    state: null,
    //记录订单角标
    num: null,
    //选择开始日期
    startDate: '',
    //选择结束日期
    endDate: '',
    //入住的总天数
    total: 0,
    //记录菜单栏
    items: 0,
    status: 0,
    couponId: '',
    amount: 0,
    notice: 0
  }
})