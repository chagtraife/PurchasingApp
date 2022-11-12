const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
// client.connect();

// let a = client.execute("SELECT * FROM \"Purchasing\".\"Purchasing_ShipMethod\"").then(result => {
//     const row = result.first();
    
//     // The row is an Object with column names as property keys. 
//     console.log('ShipMethodID is %s and Name is %s', row['ShipMethodID'], row['Name']);
// });

module.exports = function(){
    const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1' });
    client.connect();

}

