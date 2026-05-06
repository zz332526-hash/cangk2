Page({
  viewOrders() {
    wx.navigateTo({ url: '/pages/orders/index' })
  },
  reorder() {
    wx.reLaunch({ url: '/pages/index/index' })
  }
})
