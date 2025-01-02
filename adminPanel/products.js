// Üst navbar butonları ve dikey navbar içerikleri
const panelData = {
    masa: [
      { name: "Masaları Düzenle", content: "Buradan masa düzeni yapılabilecek" },
      { name: "Aktif Siparişler", content: "Burayı aklıma bir şey gelmedi diye ekledim daha güzel bir menü eklenebilir ya da direk silinebilir." },
      { name: "Menüyü Düzenle", content: "Menü güncelleme bölümü buradan yapılabilecek" },
    ],
    calisan: [
      { name: "Personel Yönetimi", content: "Personel rolleri buradan belirlenecek ve işe alım işten çıkarım buradan yapılacak. Gerekirse personel şifresi burada oluşturulacak." },
      { name: "Maaş Hesabı", content: "Personellerin maaş hesabı buradan yapılabilecek. Çok gerekli değil ama geliştirilmesi kolay ve hoca karşısında içerik olur." },
      { name: "Vardiya Yönetimi", content: "Kafenin çift vardiya çalışma durumu için. Yine gerekli değil ama kolay eklenebilir içerik." },
    ],
    rapor: [
      { name: "Günlük Raporlar", content: "Bu kısım zamanı gelince geliştirilecek" },
      { name: "Aylık Raporlar", content: "Bu kısım zamanı gelince geliştirilecek." },
      { name: "Gelir/Gider Analizi", content: "Bu kısım zamanı gelince geliştirilecek" },
    ],
  };
  
  // Sol sidebar'ı ve içerik alanını güncelleme
  function updateSidebar(panel) {
    const sidebarMenu = document.getElementById("sidebar-menu");
    const contentBoard = document.querySelector(".content-board");
  
    // Sidebar temizle ve yeni içerik ekle
    sidebarMenu.innerHTML = "";
    panelData[panel].forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      li.dataset.index = index;
      sidebarMenu.appendChild(li);
  
      // Sidebar butonuna tıklama olayı
      li.addEventListener("click", () => {
        // Seçili durumu güncelle
        document.querySelectorAll(".sidebar li").forEach(el => el.classList.remove("active"));
        li.classList.add("active");
  
        // İçerik tahtasını güncelle
        contentBoard.innerHTML = `<h2>${item.name}</h2><p>${item.content}</p>`;
      });
    });
  
    // Varsayılan olarak ilk elemanı göster
    if (panelData[panel].length > 0) {
      sidebarMenu.querySelector("li").click();
    } else {
      contentBoard.innerHTML = `<h2>No Items</h2><p>No data available for this section.</p>`;
    }
  }
  
  // Üst navbar butonlarına tıklama
  document.querySelectorAll(".top-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // Tıklanan butona göre sidebar güncelle
      const panel = btn.dataset.panel;
      updateSidebar(panel);
  
      // Üst navbar'da seçili durumu göstermek için
      document.querySelectorAll(".top-nav-btn").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  
  // Varsayılan olarak ilk paneli yükle
  document.querySelector(".top-nav-btn").click();
  
  // Masaları düzenle kısmının içeriğini oluşturma
  function renderTables() {
    const contentBoard = document.querySelector(".content-board");
  
    // İçeriği temizle
    contentBoard.innerHTML = `
      <h2>Masaları Düzenle</h2>
      <div id="table-container"></div>
      <form class="add-table-form">
        <label for="table-number">Masa Numarası:</label>
        <input type="number" id="table-number" placeholder="Masa Numarası" required>
        <label for="table-capacity">Kapasite (kişi sayısı):</label>
        <input type="number" id="table-capacity" placeholder="Kapasite" required>
        <button type="button" id="add-table-btn">Masa Ekle</button>
      </form>
    `;
  
    const tableContainer = document.getElementById("table-container");
    const addTableBtn = document.getElementById("add-table-btn");
  
    // Masaları ekranda göster
    tables.forEach((table, index) => {
      const tableCard = document.createElement("div");
      tableCard.classList.add("table-card");
      tableCard.innerHTML = `
        <h4>Masa ${table.number}</h4>
        <p>${table.capacity} kişilik</p>
        <button data-index="${index}">X</button>
      `;
      tableContainer.appendChild(tableCard);
    });
  
    addTableBtn.addEventListener("click", () => {
      const tableNumber = document.getElementById("table-number").value;
      const tableCapacity = document.getElementById("table-capacity").value;
  
      if (tableNumber && tableCapacity) {
        // Yeni masa ekle
        tables.push({ number: tableNumber, capacity: tableCapacity });
        renderTables(); // Ekranı güncelle
      } else {
        alert("Lütfen tüm alanları doldurun!");
      }
    });
  
    // Masa silme
    tableContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const index = e.target.dataset.index;
        tables.splice(index, 1); // Masayı listeden kaldır
        renderTables(); // Ekranı güncelle
      }
    });
  }
  
  // Menü Düzenleme Fonksiyonu
  function loadMenuManagement() {
    const contentBoard = document.querySelector(".content-board");
  
    // Menü Düzenleme İçeriği
    const menuHTML = `
      <div class="menu-board">
        <div class="menu-table">
          <h2>Menüyü Düzenle</h2>
          <table>
            <thead>
              <tr>
                <th>Sıcak İçecekler</th>
                <th>Soğuk İçecekler</th>
                <th>Yemekler</th>
                <th>Atıştırmalıklar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="hot-drinks"></td>
                <td id="cold-drinks"></td>
                <td id="meals"></td>
                <td id="snacks"></td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="menu-form">
          <h3>Ürün Ekle</h3>
          <form id="add-item-form">
            <label for="product-name">Ürün Adı:</label>
            <input type="text" id="product-name" placeholder="Ürün Adı" required>
  
            <label for="product-price">Ürün Fiyatı:</label>
            <input type="number" id="product-price" placeholder="Ürün Fiyatı (₺)" required>
  
            <label for="product-category">Kategori:</label>
            <select id="product-category" required>
              <option value="" disabled selected>Kategori Seç</option>
              <option value="hot-drinks">Sıcak İçecekler</option>
              <option value="cold-drinks">Soğuk İçecekler</option>
              <option value="meals">Yemekler</option>
              <option value="snacks">Atıştırmalıklar</option>
            </select>
  
            <label for="product-description">Açıklama (isteğe bağlı):</label>
            <textarea id="product-description" placeholder="Ürün Açıklaması"></textarea>
  
            <label for="product-image">Ürün Fotoğrafı:</label>
            <input type="file" id="product-image" accept="image/*">
  
            <button type="button" id="add-product-btn">Ürünü Ekle</button>
          </form>
        </div>
      </div>
    `;
  
    // İçeriği content-board'a yerleştir
    contentBoard.innerHTML = menuHTML;
  
    // Ürünü ekle butonuna tıklama olayı
    document.getElementById("add-product-btn").addEventListener("click", () => {
      const productName = document.getElementById("product-name").value;
      const productPrice = document.getElementById("product-price").value;
      const productCategory = document.getElementById("product-category").value;
      const productDescription = document.getElementById("product-description").value;
  
      if (productName && productPrice && productCategory) {
        const product = {
          name: productName,
          price: productPrice,
          category: productCategory,
          description: productDescription,
        };
  
        // Ürünleri localStorage'da sakla
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
  
        alert("Ürün başarıyla eklendi!");
        window.location.href = "products.html"; // Başka sayfaya yönlendir
      } else {
        alert("Lütfen gerekli tüm alanları doldurun!");
      }
    });
  }
  
  // Sidebar'da Menüyü Düzenle'ye tıklandığında
  document.getElementById("sidebar-menu").addEventListener("click", (e) => {
    if (e.target.textContent === "Menüyü Düzenle") {
      loadMenuManagement();
    }
  });
  