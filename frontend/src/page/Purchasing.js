import axios from 'axios';
import React from 'react';

class Purchasing extends React.Component {
    constructor(props) {
        super(props);
      }
    state = {
        listVendorTable : null,
        purchaseHistoryTable : null,
        productId : ''
    }

    updateInput(event){
        this.setState({productId : event.target.value})
        }

    findPurchasingAction(){
        console.log("findAction");
        if (this.state.productId == '') return;
        axios.get('http://localhost:4000/api/purchasing/' + this.state.productId)
        .then(res => {
        let listVendor = res.data.listVendor;
        console.log(listVendor);
        let purchaseHistory = res.data.purchaseHistory;
        console.log(purchaseHistory);
        let listVendorData= listVendor.map(
            (vendor)=>{
                return(
                    <tr>
                        <td>{vendor["VendorName"]}</td>
                        <td>{vendor["prefered"]}</td>
                        <td>{vendor["Average Lead Time"]}</td>
                        <td>{vendor["MaxOrderQty"]}</td>
                        <td>{vendor["MinOrderQty"]}</td>
                        <td>{vendor["StandardPrice"]}</td>
                        <td>{vendor["Last Receipt Cost"]}</td>
                    </tr>
                )
            }
        );
        let listVendorTable_ = (
            <table className="table">
                <thead>
                    <tr>
                    <th>Vendor Name</th>
                    <th>prefered</th>
                    <th>Average Lead Time</th>
                    <th>MaxOrderQty</th>
                    <th>MinOrderQty</th>
                    <th>StandardPrice</th>
                    <th>Last Receipt Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {listVendorData}
                </tbody>
            </table>
        );

        let purchaseHistoryData = purchaseHistory.map(
            (order)=>{
                return(
                    <tr>
                        <td>{order["VendorName"]}</td>
                        <td>{order["OrderQty"]}</td>
                        <td>{order["ReceivedQty"]}</td>
                        <td>{order["RejectedQty"]}</td>
                        <td>{order["StockedQty"]}</td>
                        <td>{order["UnitPrice"]}</td>
                    </tr>
                )
            }
        );
        let purchaseHistoryTable_ = (
            <table className="table">
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>OrderQty</th>
                        <th>ReceivedQty</th>
                        <th>RejectedQty</th>
                        <th>StockedQty</th>
                        <th>UnitPrice</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseHistoryData}
                </tbody>
            </table>
        );
        this.setState(
            {listVendorTable : listVendorTable_}
            );
        this.setState(
            {purchaseHistoryTable : purchaseHistoryTable_}
            );

        }, err => {
        console.log(err);
        });
    }

    render() {
        return (
            <div> 
                <div>Enter the product you want to purchase</div> 
                <div>
                    <b> Product Id </b> 
                    <input type="text" id="fname" name="fname"  onChange={this.updateInput.bind(this)}></input>
                    <button type="button" className="el_button" onClick={this.findPurchasingAction.bind(this)}>
                        <span>Find</span>
                    </button>
                </div>

                <div>
                    <div>List Vendor</div> 
                    {this.state.listVendorTable}

                    <div>Product Purchase History</div> 
                    {this.state.purchaseHistoryTable}
                </div>

            </div>
        )
    }
}
export default Purchasing;