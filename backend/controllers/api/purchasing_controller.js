// todo/backend/controllers/api/purchasing_controller.js
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
client.connect();

exports.index = async function (req, res, next) {
    var productId = req.params.productId
    console.log("productId: " + productId)
    
    let listVendor= []
    let productVendorQuery = "SELECT * FROM \"Purchasing\".\"Purchasing_ProductVendor\" WHERE  \"ProductID\"=" + productId + " limit 1000 ALLOW FILTERING";
    let productVendor = await client.execute(productVendorQuery);

    for (var row of productVendor){
      let vendor = {"VendorName":"", "prefered":"", "Average Lead Time":"", "MaxOrderQty":"", "MinOrderQty":"", "StandardPrice":"", "Last Receipt Cost":""};

      let queryVendorInfo = "SELECT * FROM \"Purchasing\".\"Purchasing_Vendor\" WHERE  \"BusinessEntityID\"=" + row['BusinessEntityID'] + " limit 1000 ALLOW FILTERING";
      let vendorInfor = await client.execute(queryVendorInfo);
      vendor["VendorName"] = vendorInfor.first()["Name"];
      vendor["prefered"] = vendorInfor.first()["PreferredVendorStatus"] ? "OK": "NOK";
      vendor["Average Lead Time"] = String(row['AverageLeadTime']);
      vendor["MaxOrderQty"] = String(row['MaxOrderQty']);
      vendor["MinOrderQty"] = String(row['MinOrderQty']);
      vendor["StandardPrice"] = String(row['StandardPrice']);
      vendor["Last Receipt Cost"] = String(row['LastReceiptCost']);
      listVendor.push(vendor);
    }

    // listVendor = [
    //   {"VendorName" : "Trey Research", "prefered": "OK", "Average Lead Time": "17", "MaxOrderQty": "1000", "MinOrderQty":"500", "StandardPrice": "25.77", "Last Receipt Cost": "27.0585"},
    //   {"VendorName" : "Litware, Inc.", "prefered": "OK", "Average Lead Time": "19", "MaxOrderQty": "1000", "MinOrderQty":"100", "StandardPrice": "28.17", "Last Receipt Cost": "29.5785"},
    //   {"VendorName" : "Consumer Cycles", "prefered": "OK", "Average Lead Time": "17", "MaxOrderQty": "1000", "MinOrderQty":"10", "StandardPrice": "25.70", "Last Receipt Cost": "27.0605"}
    // ];


    let purchaseHistory = []
    let productOrderHistoryQuery = "SELECT * FROM \"Purchasing\".\"Purchasing_PurchaseOrderDetail\" WHERE  \"ProductID\"=" + productId + " limit 1000 ALLOW FILTERING";
    let productOrders = await client.execute(productOrderHistoryQuery);

    for (var row of productOrders){
      let order = {"VendorName":"", "OrderQty":"", "ReceivedQty":"", "RejectedQty":"", "StockedQty":"", "UnitPrice":""};

      let orderHeaderQuery = "SELECT * FROM \"Purchasing\".\"Purchasing_PurchaseOrderHeader\" WHERE  \"PurchaseOrderID\"=" + row['PurchaseOrderID'] + " limit 1000 ALLOW FILTERING";
      let orderHeader = await client.execute(orderHeaderQuery);

      let queryVendorInfo = "SELECT * FROM \"Purchasing\".\"Purchasing_Vendor\" WHERE  \"BusinessEntityID\"=" + orderHeader.first()['VendorID'] + " limit 1000 ALLOW FILTERING";
      let vendorInfor = await client.execute(queryVendorInfo);

      order["VendorName"] = vendorInfor.first()["Name"];
      order["OrderQty"] = String(row['OrderQty']);
      order["ReceivedQty"] = String(row['ReceivedQty']);
      order["RejectedQty"] = String(row['RejectedQty']);
      order["StockedQty"] = String(row['StockedQty']);
      order["UnitPrice"] = String(row['UnitPrice']);
      purchaseHistory.push(order);
    }

    // purchaseHistory = [
    //   {"VendorName": "Trey Research", "OrderQty": "550", "ReceivedQty": "550", "RejectedQty": "0", "StockedQty": "550", "UnitPrice": "29.5785"},
    //   {"VendorName": "Litware, Inc.", "OrderQty": "550", "ReceivedQty": "480", "RejectedQty": "0", "StockedQty": "480", "UnitPrice": "27.0585"},
    //   {"VendorName": "Trey Research", "OrderQty": "550", "ReceivedQty": "550", "RejectedQty": "82", "StockedQty": "468", "UnitPrice": "29.5785"},
    // ]

    res.json({
      listVendor: listVendor,
      purchaseHistory: purchaseHistory
  })
}

