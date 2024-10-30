import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function OrderPage({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("/api/orders/user/${userId");
      setOrders(response.data);
    };
    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h1>Your Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order.is}>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            <Link to={`/orders/${order._id}`}>View Orders Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
OrderPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default OrderPage;
