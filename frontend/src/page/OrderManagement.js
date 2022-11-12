
import axios from 'axios';


function findOrderAction(){
    console.log("findOrderAction");
    axios.get('http://localhost:4000/api/order/2')
    .then(res => {
      let message = res.data.message;
      console.log(message);
    }, err => {
      console.log(err);
    });
}

export default function OrderManagement() {
    return (
        <div> 
            <div>Enter the employee you want to find</div> 
            <div>
                <b> Employee </b> 
                <input type="text" id="fname" name="fname"></input>
                <button type="button" className="el_button" onClick={findOrderAction}>
                    <span>Find</span>
                </button>
            </div>
        </div>
    )
}