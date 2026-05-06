Page({
  data: { cart: [], total: '0.00' },
  onShow() {
    const cart = getApp().globalData.cart || []
    const total = cart.reduce((s, it) => s + it.price, 0).toFixed(2)
    this.setData({ cart, total })
  }
})
