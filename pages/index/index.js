const mock = [
  { id: 1, name: '招牌牛肉饭', sold: 322, price: 26, desc: '谷饲牛肉+溏心蛋', image: 'https://picsum.photos/300/200?food=1' },
  { id: 2, name: '芝士鸡排饭', sold: 198, price: 23, desc: '现炸鸡排+秘制酱', image: 'https://picsum.photos/300/200?food=2' },
  { id: 3, name: '杨枝甘露', sold: 499, price: 16, desc: '芒果西米椰奶', image: 'https://picsum.photos/300/200?food=3' },
  { id: 4, name: '茉莉奶绿', sold: 433, price: 14, desc: '低糖可选', image: 'https://picsum.photos/300/200?food=4' }
]

Page({
  data: {
    loading: true,
    categoryList: [
      { id: 1, name: '饮品', icon: '🥤' },
      { id: 2, name: '主食', icon: '🍱' },
      { id: 3, name: '小吃', icon: '🍢' },
      { id: 4, name: '甜品', icon: '🍰' },
      { id: 5, name: '轻食', icon: '🥗' },
      { id: 6, name: '咖啡', icon: '☕' },
      { id: 7, name: '套餐', icon: '🍽️' },
      { id: 8, name: '更多', icon: '🧾' }
    ],
    recommendList: [],
    cartCount: 0,
    totalPrice: '0.00'
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        loading: false,
        recommendList: mock
      })
    }, 450)
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
