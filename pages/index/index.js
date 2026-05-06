const mock = [
  { id: 1, name: '招牌牛肉饭', sold: 322, price: 26, desc: '谷饲牛肉+溏心蛋', image: 'https://picsum.photos/300/200?food=1' },
  { id: 2, name: '芝士鸡排饭', sold: 198, price: 23, desc: '现炸鸡排+秘制酱', image: 'https://picsum.photos/300/200?food=2' },
  { id: 3, name: '杨枝甘露', sold: 499, price: 16, desc: '芒果西米椰奶', image: 'https://picsum.photos/300/200?food=3' },
  { id: 4, name: '茉莉奶绿', sold: 433, price: 14, desc: '低糖可选', image: 'https://picsum.photos/300/200?food=4' }
]

Page({
  data: {
    recommendList: mock.slice(0, 3),
    menuList: mock,
    cartCount: 0,
    totalPrice: '0.00'
  },
  addToCart(e) {
    const id = e.currentTarget.dataset.id
    const item = mock.find(v => v.id === id)
    const app = getApp()
    app.globalData.cart.push(item)
    const cartCount = app.globalData.cart.length
    const totalPrice = app.globalData.cart.reduce((sum, it) => sum + it.price, 0).toFixed(2)
    this.setData({ cartCount, totalPrice })
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },
  goOrders() {
    wx.navigateTo({ url: '/pages/orders/index' })
  }
})
