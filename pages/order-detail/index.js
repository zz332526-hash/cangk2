Page({
  data: { order: null },
  onLoad(query) {
    const id = query.id
    const orders = getApp().globalData.orders || []
    const order = orders.find(item => item.id === id)
    this.setData({ order })
  },
  reorder() {
    const app = getApp()
    const { order } = this.data
    if (!order) return
    const outOfStock = []
    order.items.forEach((item) => {
      const stock = app.globalData.stockMap[item.id] || 0
      if (stock > 0) {
        for (let i = 0; i < item.qty; i++) {
          app.globalData.cart.push({ id: item.id, name: item.name, price: item.price })
        }
      } else {
        outOfStock.push(item.name)
      }
    })
    if (outOfStock.length) {
      wx.showModal({
        title: '部分商品缺货',
        content: `${outOfStock.join('、')} 当前缺货，已为你加入其余商品。`,
        showCancel: false
      })
    } else {
      wx.showToast({ title: '已回填到购物车', icon: 'success' })
    }
    setTimeout(() => wx.navigateTo({ url: '/pages/orders/index' }), 300)
  }
})
