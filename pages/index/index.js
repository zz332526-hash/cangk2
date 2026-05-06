const mock = [
  { id: 1, name: '招牌牛肉饭', sold: 322, price: 26, desc: '谷饲牛肉+溏心蛋', image: 'https://picsum.photos/300/200?food=1', category: '热销主食' },
  { id: 2, name: '芝士鸡排饭', sold: 198, price: 23, desc: '现炸鸡排+秘制酱', image: 'https://picsum.photos/300/200?food=2', category: '热销主食' },
  { id: 3, name: '杨枝甘露', sold: 499, price: 16, desc: '芒果西米椰奶', image: 'https://picsum.photos/300/200?food=3', category: '人气饮品' },
  { id: 4, name: '茉莉奶绿', sold: 433, price: 14, desc: '低糖可选', image: 'https://picsum.photos/300/200?food=4', category: '人气饮品' }
]

function getCartSummary(cart = []) {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  return { cartCount, totalPrice }
}

Page({
  data: {
    recommendList: mock.slice(0, 3),
    menuList: mock,
    cartCount: 0,
    totalPrice: '0.00'
  },
  onShow() {
    const { cartCount, totalPrice } = getCartSummary(getApp().globalData.cart || [])
    this.setData({ cartCount, totalPrice })
  },
  addToCart(e) {
    const id = e.currentTarget.dataset.id
    const item = mock.find(v => v.id === id)
    const app = getApp()
    const cart = app.globalData.cart || []
    const found = cart.find(v => v.id === id)

    if (found) {
      found.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }

    app.globalData.cart = cart
    const { cartCount, totalPrice } = getCartSummary(cart)
    this.setData({ cartCount, totalPrice })
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },
  goOrders() {
    wx.navigateTo({ url: '/pages/cart/index' })
  }
})
