document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("orderForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const tableNumber = document.getElementById("tableNumber").value;
    const orderDetails = document.getElementById("orderDetails").value;
    const orderStatus = document.getElementById("orderStatus").value;

    const order = {
      tableNumber,
      orderDetails,
      orderStatus,
    };

    // Siparişi localStorage'a kaydedin
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Sipariş başarıyla eklendi!");
    form.reset();
  });
});
