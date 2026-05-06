function groupCartItems(cart = []) {
  const groupMap = {}
  cart.forEach(item => {
    const groupName = item.category || '其他'
    if (!groupMap[groupName]) groupMap[groupName] = []
    groupMap[groupName].push(item)
  })

  return Object.keys(groupMap).map(key => ({
    groupName: key,
    items: groupMap[key]
  }))
}

function getCartTotal(cart = []) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
}

Page({
  data: {
    cart: [],
    groupCart: [],
    total: '0.00'
  },
  onShow() {
    this.refreshCart()
  },
  refreshCart() {
    const cart = getApp().globalData.cart || []
    this.setData({
      cart,
      groupCart: groupCartItems(cart),
      total: getCartTotal(cart)
    })
  },
  clearCart() {
    wx.showModal({
      title: '清空购物车',
      content: '确认清空已选商品吗？',
      success: ({ confirm }) => {
        if (!confirm) return
        getApp().globalData.cart = []
        this.refreshCart()
      }
    })
  },
  changeQty(e) {
    const { id, step } = e.currentTarget.dataset
    const cart = getApp().globalData.cart || []
    const idx = cart.findIndex(item => item.id === id)
    if (idx < 0) return

    cart[idx].quantity += Number(step)
    if (cart[idx].quantity <= 0) {
      cart.splice(idx, 1)
    }
    getApp().globalData.cart = cart
    this.refreshCart()
  },
  deleteItem(e) {
    const { id } = e.currentTarget.dataset
    const cart = (getApp().globalData.cart || []).filter(item => item.id !== id)
    getApp().globalData.cart = cart
    this.refreshCart()
  },
  goShop() {
    wx.navigateBack()
  },
  goCheckout() {
    if (!this.data.cart.length) return
    wx.navigateTo({ url: '/pages/checkout/index' })
  }
})
