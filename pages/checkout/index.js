const PACK_FEE = 2
const DELIVERY_FEE = 4
const DISCOUNT = 5

Page({
  data: {
    mode: 'delivery',
    remark: '',
    tableware: 1,
    couponText: '满30减5',
    cart: [],
    goodsAmount: '0.00',
    payableAmount: '0.00',
    submitLoading: false,
    lastSubmitTime: 0
  },
  onShow() {
    const cart = getApp().globalData.cart || []
    const goodsAmount = cart.reduce((s, i) => s + i.price * i.quantity, 0)
    const payableAmount = Math.max(0, goodsAmount + PACK_FEE + DELIVERY_FEE - DISCOUNT)
    this.setData({
      cart,
      goodsAmount: goodsAmount.toFixed(2),
      payableAmount: payableAmount.toFixed(2)
    })
  },
  switchMode(e) {
    this.setData({ mode: e.currentTarget.dataset.mode })
  },
  inputRemark(e) {
    this.setData({ remark: e.detail.value })
  },
  changeTableware(e) {
    const step = Number(e.currentTarget.dataset.step)
    const next = Math.max(0, this.data.tableware + step)
    this.setData({ tableware: next })
  },
  submitOrder() {
    const now = Date.now()
    if (this.data.submitLoading || now - this.data.lastSubmitTime < 1500) return
    this.setData({ submitLoading: true, lastSubmitTime: now })

    setTimeout(() => {
      getApp().globalData.cart = []
      this.setData({ submitLoading: false })
      wx.redirectTo({ url: '/pages/order-success/index' })
    }, 800)
  }
})
