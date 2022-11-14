import axios from 'axios';
import React from 'react';

class OrderManagement extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        orderListTable : null,
        employeeId : ''
    }

    updateInput(event){
        this.setState({employeeId : event.target.value})
    }

    findOrderAction(){
        console.log("findOrderAction");
        if (this.state.employeeId === '') return;
        axios.get('http://localhost:4000/api/order/' + this.state.employeeId)
        .then(res => {
          let orderList = res.data.orderList;
          console.log(orderList);
          let orderListData = orderList.map(
            (order)=>{
                return (
                    <tr>
                        <td>{order["PurchaseOrderID"]}</td>
                        <td>{order["ProductName"]}</td>
                        <td>{order["VendorName"]}</td>
                        <td>{order["ShipMethod"]}</td>
                        <td>{order["ShipDate"]}</td>
                        <td>{order["Status"]}</td>
                    </tr>
                )
            }
          );
          let orderListTable_ = (
            <table className="table">
                <thead>
                    <tr>
                    <th>Purchase Order ID</th>
                    <th>Product Name</th>
                    <th>Vendor Name</th>
                    <th>Ship Method</th>
                    <th>Ship Date</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orderListData}
                </tbody>
            </table>
        );
        this.setState(
            {orderListTable: orderListTable_}
        )
        }, err => {
          console.log(err);
        });
    }
    
    render() {
        let body = (<div className='orderManagement-body'></div>)
        if (this.state.orderListTable){
            body = (                
            <div className='orderManagement-body'>
                <hr></hr>
                <h2>Order List</h2> 
                {this.state.orderListTable}
            </div>
        )
        }
        return (
            <div className='orderManagement'> 
                <div className='orderManagement-header'>
                    <div>
                        <b> Employee Id </b> 
                        <input type="text" id="fname" name="fname" onChange={this.updateInput.bind(this)}></input>
                        <button type="button" className="el_button" onClick={this.findOrderAction.bind(this)}>
                            <span>Find</span>
                        </button>
                    </div>
                    <div className='orderManagement-header-description'>Enter the employee Id you want to find</div> 
                </div>
                {body}
            </div>
        )
    }
}
export default OrderManagement;
