// todo/backend/controllers/api/purchasing_controller.js

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
client.connect();

exports.index = function (req, res, next) {
    var productId = req.params.productId
    console.log("productId: " + productId)

    let a = client.execute("SELECT * FROM \"Purchasing\".\"Purchasing_ShipMethod\"").then(result => {
    const row = result.first();
    
    // The row is an Object with column names as property keys. 
    console.log('ShipMethodID is %s and Name is %s', row['ShipMethodID'], row['Name']);
    });

    let listVendor = [
      {"VendorName" : "Trey Research", "prefered": "OK", "Average Lead Time": "17", "MaxOrderQty": "1000", "MinOrderQty":"500", "StandardPrice": "25.77", "Last Receipt Cost": "27.0585"},
      {"VendorName" : "Litware, Inc.", "prefered": "OK", "Average Lead Time": "19", "MaxOrderQty": "1000", "MinOrderQty":"100", "StandardPrice": "28.17", "Last Receipt Cost": "29.5785"},
      {"VendorName" : "Consumer Cycles", "prefered": "OK", "Average Lead Time": "17", "MaxOrderQty": "1000", "MinOrderQty":"10", "StandardPrice": "25.70", "Last Receipt Cost": "27.0605"}
    ];

    let purchaseHistory = [
      {"VendorName": "Trey Research", "OrderQty": "550", "ReceivedQty": "550", "RejectedQty": "0", "StockedQty": "550", "UnitPrice": "29.5785"},
      {"VendorName": "Litware, Inc.", "OrderQty": "550", "ReceivedQty": "480", "RejectedQty": "0", "StockedQty": "480", "UnitPrice": "27.0585"},
      {"VendorName": "Trey Research", "OrderQty": "550", "ReceivedQty": "550", "RejectedQty": "82", "StockedQty": "468", "UnitPrice": "29.5785"},
    ]

    res.json({
      listVendor: listVendor,
      purchaseHistory: purchaseHistory
  })
  }