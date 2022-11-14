// todo/backend/controllers/api/order_controller.js

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
client.connect();


exports.index = async function (req, res, next) {
    let productList = []
    let productQuery = "SELECT * FROM \"Purchasing\".\"Production_Product\" limit 100 ALLOW FILTERING";
    let product = await client.execute(productQuery); 

    for (var row of product){
      let productInfo = {"ProductId": "","ProductName":""};

      productInfo["ProductName"] = row['Name'];
      productInfo["ProductId"] = row['ProductID'];
      productList.push(productInfo);
    }
    res.json({productList: productList})
  }