// components/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array
    }
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
    goto(e){
      console.log(e)
      let id=e.currentTarget.dataset.id
      this.triggerEvent("click",id)
    },
  }
})