App({
  globalData: {
    cart: [],
    stockMap: {
      1: 99,
      2: 0,
      3: 50,
      4: 99
    },
    orders: [
      {
        id: 'OD202605010001',
        status: 'pending',
        storeName: '小满轻食茶饮（软件园店）',
        payAmount: 42,
        orderTime: '2026-05-01 12:10',
        delivery: {
          receiver: '张三 138****1234',
          address: '厦门市思明区软件园二期望海路 88 号'
        },
        items: [
          { id: 1, name: '招牌牛肉饭', price: 26, qty: 1 },
          { id: 3, name: '杨枝甘露', price: 16, qty: 1 }
        ],
        fees: { goodsTotal: 42, packFee: 2, deliveryFee: 4, discount: 6, actualPay: 42 },
        timeline: [
          { title: '订单提交成功', time: '2026-05-01 12:10' },
          { title: '等待支付', time: '2026-05-01 12:10' }
        ]
      },
      {
        id: 'OD202604280126',
        status: 'processing',
        storeName: '小满轻食茶饮（软件园店）',
        payAmount: 63,
        orderTime: '2026-04-28 18:42',
        delivery: {
          receiver: '张三 138****1234',
          address: '厦门市思明区软件园二期望海路 88 号'
        },
        items: [
          { id: 2, name: '芝士鸡排饭', price: 23, qty: 1 },
          { id: 1, name: '招牌牛肉饭', price: 26, qty: 1 },
          { id: 4, name: '茉莉奶绿', price: 14, qty: 1 }
        ],
        fees: { goodsTotal: 63, packFee: 3, deliveryFee: 5, discount: 8, actualPay: 63 },
        timeline: [
          { title: '骑手已接单', time: '2026-04-28 19:03' },
          { title: '商家备餐中', time: '2026-04-28 18:52' },
          { title: '已支付', time: '2026-04-28 18:44' },
          { title: '订单提交成功', time: '2026-04-28 18:42' }
        ]
      },
      {
        id: 'OD202604200088',
        status: 'done',
        storeName: '小满轻食茶饮（软件园店）',
        payAmount: 30,
        orderTime: '2026-04-20 11:25',
        delivery: {
          receiver: '张三 138****1234',
          address: '厦门市思明区软件园二期望海路 88 号'
        },
        items: [
          { id: 2, name: '芝士鸡排饭', price: 23, qty: 1 },
          { id: 4, name: '茉莉奶绿', price: 14, qty: 1 }
        ],
        fees: { goodsTotal: 37, packFee: 2, deliveryFee: 4, discount: 13, actualPay: 30 },
        timeline: [
          { title: '订单已完成', time: '2026-04-20 12:03' },
          { title: '骑手已送达', time: '2026-04-20 11:58' },
          { title: '骑手已取餐', time: '2026-04-20 11:45' },
          { title: '已支付', time: '2026-04-20 11:25' }
        ]
      }
    ]
  }
})
