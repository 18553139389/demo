// components/daijinquan/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:[Object,Array]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    gouse(event){
      let index=event.currentTarget.dataset.ind;
      let cid=event.currentTarget.dataset.cid;
      this.triggerEvent("gouse",{index,cid})
    }
  }
})
