document.addEventListener("DOMContentLoaded", function () {
  const orderList = document.getElementById("orderList");

  function displayOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orderList.innerHTML = "";

    orders.forEach((order, index) => {
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");
      orderItem.innerHTML = `
        <p><strong>Masa Numarası:</strong> ${order.tableNumber}</p>
        <p><strong>Sipariş Detayları:</strong> ${order.orderDetails}</p>
        <p><strong>Sipariş Durumu:</strong> ${order.orderStatus}</p>
      `;
      orderList.appendChild(orderItem);
    });
  }

  // Sayfa yüklendiğinde mevcut siparişleri görüntüle
  displayOrders();
});
    