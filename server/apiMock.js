const NAMING_CONVENTION = 'camelCase'

const errorCodes = {
  STOCK_INSUFFICIENT: { code: 'STOCK_INSUFFICIENT', message: '库存不足' },
  PRODUCT_OFFLINE: { code: 'PRODUCT_OFFLINE', message: '商品已下架' },
  OUT_OF_DELIVERY_RANGE: { code: 'OUT_OF_DELIVERY_RANGE', message: '配送范围外' },
  STORE_NOT_FOUND: { code: 'STORE_NOT_FOUND', message: '门店不存在' },
  ORDER_NOT_FOUND: { code: 'ORDER_NOT_FOUND', message: '订单不存在' },
  INVALID_PARAMS: { code: 'INVALID_PARAMS', message: '参数不合法' }
}

const stores = [
  {
    id: 'store_1',
    name: '示例门店',
    deliveryFee: 4,
    inDeliveryRange: true,
    menu: {
      categories: [
        {
          categoryId: 'c1',
          categoryName: '招牌主食',
          products: [
            {
              productId: 'p1',
              productName: '招牌牛肉饭',
              price: 26,
              stock: 20,
              status: 'onSale',
              specs: [
                { specId: 's1', specName: '标准', extraPrice: 0 },
                { specId: 's2', specName: '加肉', extraPrice: 8 }
              ]
            },
            {
              productId: 'p2',
              productName: '芝士鸡排饭',
              price: 23,
              stock: 10,
              status: 'onSale',
              specs: [{ specId: 's3', specName: '标准', extraPrice: 0 }]
            }
          ]
        },
        {
          categoryId: 'c2',
          categoryName: '饮品',
          products: [
            {
              productId: 'p3',
              productName: '茉莉奶绿',
              price: 14,
              stock: 0,
              status: 'offSale',
              specs: [{ specId: 's4', specName: '少糖', extraPrice: 0 }]
            }
          ]
        }
      ]
    }
  }
]

const orders = []

function success(data) {
  return { code: 0, message: 'ok', data }
}

function failure(error) {
  return { code: error.code, message: error.message, data: null }
}

function getStoreOrFail(storeId) {
  const store = stores.find((s) => s.id === storeId)
  return store || null
}

function flattenProducts(menu) {
  return menu.categories.flatMap((category) => category.products)
}

function findProduct(store, productId) {
  return flattenProducts(store.menu).find((p) => p.productId === productId)
}

function calculateCartPreview(payload) {
  const { storeId, items = [], couponAmount = 0 } = payload || {}
  const store = getStoreOrFail(storeId)
  if (!store) return failure(errorCodes.STORE_NOT_FOUND)
  if (!store.inDeliveryRange) return failure(errorCodes.OUT_OF_DELIVERY_RANGE)

  let itemsTotal = 0
  for (const item of items) {
    const product = findProduct(store, item.productId)
    if (!product) return failure(errorCodes.INVALID_PARAMS)
    if (product.status !== 'onSale') return failure(errorCodes.PRODUCT_OFFLINE)
    if (product.stock < item.quantity) return failure(errorCodes.STOCK_INSUFFICIENT)
    const spec = product.specs.find((s) => s.specId === item.specId) || { extraPrice: 0 }
    itemsTotal += (product.price + spec.extraPrice) * item.quantity
  }

  const deliveryFee = store.deliveryFee
  const discount = Math.max(0, couponAmount)
  const payableAmount = Math.max(0, itemsTotal + deliveryFee - discount)

  return success({
    itemsTotal,
    deliveryFee,
    discount,
    payableAmount,
    currency: 'CNY'
  })
}

function createOrder(payload) {
  const preview = calculateCartPreview(payload)
  if (preview.code !== 0) return preview

  const orderId = `o_${Date.now()}_${orders.length + 1}`
  const order = {
    orderId,
    storeId: payload.storeId,
    items: payload.items,
    priceSummary: preview.data,
    status: 'created',
    createdAt: new Date().toISOString()
  }
  orders.unshift(order)

  for (const item of payload.items) {
    const store = getStoreOrFail(payload.storeId)
    const product = findProduct(store, item.productId)
    product.stock -= item.quantity
  }

  return success(order)
}

function listOrders(query = {}) {
  const { page = 1, pageSize = 10 } = query
  const start = (page - 1) * pageSize
  const list = orders.slice(start, start + pageSize)
  return success({ list, page, pageSize, total: orders.length })
}

function getOrderDetail(orderId) {
  const order = orders.find((item) => item.orderId === orderId)
  if (!order) return failure(errorCodes.ORDER_NOT_FOUND)
  return success(order)
}

function getStoreMenu(storeId) {
  const store = getStoreOrFail(storeId)
  if (!store) return failure(errorCodes.STORE_NOT_FOUND)
  return success(store.menu)
}

function handleRequest(method, path, payload = {}, query = {}) {
  if (method === 'GET' && /^\/stores\/[^/]+\/menu$/.test(path)) {
    const storeId = path.split('/')[2]
    return getStoreMenu(storeId)
  }

  if (method === 'POST' && path === '/cart/preview') {
    return calculateCartPreview(payload)
  }

  if (method === 'POST' && path === '/orders') {
    return createOrder(payload)
  }

  if (method === 'GET' && path === '/orders') {
    return listOrders(query)
  }

  if (method === 'GET' && /^\/orders\/[^/]+$/.test(path)) {
    const orderId = path.split('/')[2]
    return getOrderDetail(orderId)
  }

  return failure(errorCodes.INVALID_PARAMS)
}

module.exports = {
  NAMING_CONVENTION,
  errorCodes,
  handleRequest,
  getStoreMenu,
  calculateCartPreview,
  createOrder,
  listOrders,
  getOrderDetail
}
