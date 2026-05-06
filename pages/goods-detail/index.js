const goods = {
  id: 101,
  name: '茉莉奶绿',
  image: 'https://picsum.photos/800/560?tea=1',
  basePrice: 14,
  desc: '高山茉莉茶底，现萃更清香。',
  tags: ['茶香清爽', '可自定义糖冰', '本周热销'],
  detailImages: [
    'https://picsum.photos/800/400?drink=1',
    'https://picsum.photos/800/400?drink=2'
  ],
  reviewSummary: {
    score: 4.8,
    goodRate: '98%',
    keywords: ['清爽不腻', '奶香刚好', '甜度可控']
  }
}

Page({
  data: {
    goods,
    showSpecPopup: false,
    specGroups: [
      { name: '温度', type: 'single', options: [{ name: '热' , price: 0}, { name: '少冰', price: 0 }, { name: '去冰', price: 0 }] },
      { name: '甜度', type: 'single', options: [{ name: '全糖', price: 0 }, { name: '半糖', price: 0 }, { name: '无糖', price: 0 }] },
      { name: '加料', type: 'multi', options: [{ name: '珍珠', price: 2 }, { name: '椰果', price: 2 }, { name: '奶盖', price: 3 }] }
    ]
  },
  openSpec() {
    this.setData({ showSpecPopup: true })
  },
  closeSpec() {
    this.setData({ showSpecPopup: false })
  },
  onSpecConfirm(e) {
    const { selectedText, totalPrice, selectedMap } = e.detail
    const app = getApp()
    app.globalData.cart.push({
      id: `${goods.id}-${Date.now()}`,
      name: goods.name,
      price: totalPrice,
      specText: selectedText,
      specMap: selectedMap
    })
    this.setData({ showSpecPopup: false })
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },
  goOrders() {
    wx.navigateTo({ url: '/pages/orders/index' })
  }
})
