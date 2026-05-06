const TABS = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待支付' },
  { key: 'processing', label: '进行中' },
  { key: 'done', label: '已完成' }
]

const STATUS_MAP = { pending: '待支付', processing: '进行中', done: '已完成' }

Page({
  data: {
    tabs: TABS,
    activeTab: 'all',
    orderList: []
  },
  onShow() {
    this.syncOrders()
  },
  syncOrders() {
    const orders = getApp().globalData.orders || []
    const activeTab = this.data.activeTab
    const list = activeTab === 'all' ? orders : orders.filter(order => order.status === activeTab)
    const orderList = list.map(order => ({
      ...order,
      statusLabel: STATUS_MAP[order.status] || '未知状态',
      summary: order.items.length > 1 ? `${order.items[0].name} 等${order.items.length}件商品` : order.items[0].name
    }))
    this.setData({ orderList })
  },
  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.key }, () => this.syncOrders())
  },
  openDetail(e) {
    wx.navigateTo({ url: `/pages/order-detail/index?id=${e.currentTarget.dataset.id}` })
  }
})
