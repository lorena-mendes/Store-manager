const sales = [
  {
    "id": 1,
    "date":"2022-11-22 22:13:02",
  },
  {
    "id": 2,
    "date": "2022-11-22 22:13:02",
  }
]

const salesProducts = [
  {
    "sale_id": 1,
    "product_id": 1,
    "quantity": 5,
  },
  {
    "sale_id": 1,
    "product_id": 2,
    "quantity": 10,
  },
  {
    "sale_id": 2,
    "product_id": 3,
    "quantity": 15,
  },
]

const newSales = [
  {
    "id": 3,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
  }
]

module.exports = {
  sales,
  salesProducts,
  newSales,
}