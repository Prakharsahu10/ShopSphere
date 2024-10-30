import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const generatePDF = async () => {
    const pdfContent = document.getElementById("pdfContent");
    if (!pdfContent) return;

    const canvas = await html2canvas(pdfContent);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
    pdf.save("OrderReceipt.pdf");
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order Details</h1>
      <div
        id="pdfContent"
        style={{
          width: "300px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
        <p>Total Amount: ${order.totalAmount}</p>
        <p>Payment Status: {order.paymentStatus}</p>

        <h2>Items</h2>
        <ul>
          {order.items.map((item) => (
            <li key={item.product._id}>
              {item.product.name} - Quantity: {item.quantity} - Price: $
              {item.product.price}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={generatePDF}>Download Receipt as PDF</button>
    </div>
  );
}

export default OrderDetailsPage;
