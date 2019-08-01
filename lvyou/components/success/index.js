// components/success/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnText:{
      type:String,
      value:""
    },
    title:{
      type:String,
      value:""
    }
  },
  
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    evn(){
      this.triggerEvent("goto",{})
    }
  }
})
