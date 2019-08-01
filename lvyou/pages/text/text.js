Page({
  data: {
    url: ''
  },

  onLoad: function (options) {
    let url = options.url
    console.log(url)
    this.setData({
      url: url
    })
  }
})