// components/classify/index.js
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
    getMessage(event){
      const mes=this.properties.list[event.currentTarget.dataset.index]
      // return;
      this.triggerEvent("clickThis",mes,{})
    },
    gogo(event){

    },
    closeTo(){
      this.triggerEvent("close","")
    }
  },
})
