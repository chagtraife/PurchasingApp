// todo/backend/controllers/api/order_controller.js

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
client.connect();


exports.index = async function (req, res, next) {
    var employeeId = req.params.employeeId
    console.log("employeeId: " + employeeId)

    let orderList = []
    let orderHeaderQuery = "SELECT * FROM \"Purchasing\".\"Purchasing_PurchaseOrderHeader\" WHERE  \"EmployeeID\"=" + employeeId + " limit 100 ALLOW FILTERING";
    let orderHeader = await client.execute(orderHeaderQuery); 

    for (var row of orderHeader){
      let order = {"PurchaseOrderID":"", "ProductName":"", "VendorName":"", "ShipMethod":"", "ShipDate":"", "Status":""};

      let queryVendorInfo = "SELECT * FROM \"Purchasing\".\"Purchasing_Vendor\" WHERE  \"BusinessEntityID\"=" + row['VendorID']; + " limit 1000 ALLOW FILTERING";
      let vendorInfor = await client.execute(queryVendorInfo);

      let orderDetailQuery = "SELECT * FROM \"Purchasing\".\"Purchasing_PurchaseOrderDetail\" WHERE  \"PurchaseOrderID\"=" + row['PurchaseOrderID'] + " limit 1000 ALLOW FILTERING";
      let orderDetail = await client.execute(orderDetailQuery);
      let productId = orderDetail.first()["ProductID"];

      let productQuery = "SELECT * FROM \"Purchasing\".\"Production_Product\" WHERE  \"ProductID\"=" + productId + " limit 1000 ALLOW FILTERING";
      let product = await client.execute(productQuery);
      let productName = product.first()["Name"];

      let shipMethodQuery = "SELECT * FROM \"Purchasing\".\"Purchasing_ShipMethod\" WHERE  \"ShipMethodID\"=" + row['ShipMethodID'] + " limit 1000 ALLOW FILTERING";
      let shipMethod = await client.execute(shipMethodQuery);
      let ShipMethodName = shipMethod.first()["Name"];

      order["PurchaseOrderID"] = String(row['PurchaseOrderID']);
      order["ProductName"] = productName;
      order["VendorName"] = vendorInfor.first()["Name"];
      order["ShipMethod"] = ShipMethodName;
      order["ShipDate"] = String(row['ShipDate']);
      order["Status"] = String(row['Status']);
      orderList.push(order);
    }
    res.json({orderList: orderList})
  }