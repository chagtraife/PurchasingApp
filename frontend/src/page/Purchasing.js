import axios from 'axios';
import React from 'react';

class Purchasing extends React.Component {
    constructor(props) {
        super(props);
        axios.get('http://localhost:4000/api/product/')
        .then(res => {
            let productList = res.data.productList;
            this.setState({productList : productList});

            let values = productList.map(
                (product) => {
                    return(<option value= {product["ProductName"]}></option>)
                }
            )

            let productData =(
                <datalist id="productNames">
                    {values}
                </datalist>
            )
            this.setState({productData: productData})

        }
        )
    }
    state = {
        listVendorTable : null,
        purchaseHistoryTable : null,
        productId : '',
        productList: null,
        productData: null
    }

    updateInput(event){
        let productName = event.target.value;
        let products = this.state.productList;
        let productId
        for (var i = 0; i < products.length; i++){
            // look for the entry with a matching `code` value
            if (products[i]["ProductName"] === productName){
                productId = products[i]["ProductId"]
            }
          }
        this.setState({productId : productId})
    }

    getProdctNameList(){
        console.log("getProdctNameList");
        axios.get('http://localhost:4000/api/product/')
        .then(res => {
            let productList = res.data.productList;
            this.setState({productList : productList})
        }
        )
    }

    findPurchasingAction(){
        console.log("findAction");
        if (this.state.productId === undefined) return;
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
        let body = (<div className='purchasing-body'></div>)
        if (this.state.listVendorTable || this.state.purchaseHistoryTable){
            body = (                
            <div className='purchasing-body'>
                <hr></hr>
                <h2>List Vendor</h2> 
                {this.state.listVendorTable}
                <hr></hr>
                <h2>Product Purchase History</h2> 
                {this.state.purchaseHistoryTable}
            </div>
        )
        }
        return (
            <div className='purchasing'> 
                <div className='purchasing-header'>
                    <div>
                        <b> Product Name </b> 
                        <input list="productNames" id="productName" name="productName" onChange={this.updateInput.bind(this)}></input>
                        {this.state.productData}

                        <button type="button" className="el_button" onClick={this.findPurchasingAction.bind(this)}>
                            <span>Find</span>
                        </button>
                    </div>
                    <div className='purchasing-header-description'>Enter the product you want to purchase</div> 
                </div>
                {body}
            </div>
        )
    }
}
export default Purchasing;