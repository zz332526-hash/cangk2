# Mock API 定义

全局字段命名规范：`camelCase`。

## 1) GET /stores/:id/menu
返回门店菜单（分类 + 商品 + 规格）。

## 2) POST /cart/preview
请求体示例：

```json
{
  "storeId": "store_1",
  "items": [
    { "productId": "p1", "specId": "s1", "quantity": 2 }
  ],
  "couponAmount": 3
}
```

返回总价、配送费、优惠和应付金额。

## 3) POST /orders
请求体与 `/cart/preview` 一致，校验通过后创建订单并扣减库存。

## 4) GET /orders
支持分页参数：`page`、`pageSize`。

## 5) GET /orders/:id
按 `orderId` 查询订单详情。

## 6) 统一错误码
- `STOCK_INSUFFICIENT`：库存不足
- `PRODUCT_OFFLINE`：商品下架
- `OUT_OF_DELIVERY_RANGE`：配送范围外
- `STORE_NOT_FOUND`：门店不存在
- `ORDER_NOT_FOUND`：订单不存在
- `INVALID_PARAMS`：参数不合法

## 使用方式

```js
const api = require('./apiMock')

api.handleRequest('GET', '/stores/store_1/menu')
api.handleRequest('POST', '/cart/preview', {
  storeId: 'store_1',
  items: [{ productId: 'p1', specId: 's1', quantity: 1 }],
  couponAmount: 2
})
```
