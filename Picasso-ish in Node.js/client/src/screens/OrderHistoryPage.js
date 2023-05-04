import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { postOrders } from "../api";
import { Image } from "react-bootstrap";

const OrderHistoryPage = (props) => {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    // function that gets all the orders
    const getOrders = await postOrders(props.Email); 
    setOrders(getOrders);
  }

  useEffect(() => { // get
    getAllOrders();
  }, []);

  const formatDate = (dateString) => {
    // function that formats the date
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container my-5">
      <div className="row">
        {orders.length === 0 ? (
          <div className="col-12 text-center">
            <h3>You have no orders</h3>
          </div>
        ) : (
          orders.map((orderItems, index) => ( 
            <div key={index} className="col-12 mb-5"> {/*maping all the orders*/}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    Order ID: {orderItems[0].id} - Order Date: {formatDate(orderItems[0].orderdate)}
                  </h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Prompt</th>
                        <th>Date Generated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((order, i) => (
                        <tr key={i}> {/*maping all the images inside the orders*/}
                          <td>
                            <Image src={`data:image/png;base64,${order.image}`} alt={order.prompt} />
                          </td>
                          <td style={{ verticalAlign: "middle" }}>{order.prompt}</td>
                          <td style={{ verticalAlign: "middle" }}>{formatDate(order.generateddate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
