// todo/backend/controllers/api/order_controller.js

const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
client.connect();


exports.index = function (req, res, next) {
    var employeeId = req.params.employeeId
    console.log("employeeId: " + employeeId)


    res.json({message: "order",})
  }