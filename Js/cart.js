
/* =========================
   CART SYSTEM - FINAL (WITH PRODUCT-ID)
   ========================= */

/* 取得購物車 */
function getCart() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return [];

  const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
  return allCarts[user.email] || [];
}

function saveCart(cart) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  const allCarts = JSON.parse(localStorage.getItem("carts")) || {};
  allCarts[user.email] = cart;

  localStorage.setItem("carts", JSON.stringify(allCarts));
}
/* =========================
   數量控制
========================= */
let qty = 1;

function minus() {
  const qtyEl = document.getElementById("qty");

  qty--;
  if (qty < 1) qty = 1;

  if (qtyEl) qtyEl.innerText = qty;
}

function plus() {
  const qtyEl = document.getElementById("qty");

  qty++;
  if (qtyEl) qtyEl.innerText = qty;
}

/* =========================
   🔥 TOAST 提示（新增）
========================= */
function showToast(message) {
  let toast = document.createElement("div");

  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "rgba(0,0,0,0.85)";
  toast.style.color = "#fff";
  toast.style.padding = "10px 18px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1500);
}

/* =========================
   加入購物車（核心）
========================= */

/* =========================
   加入購物車（核心）
========================= */
function addToCart() {

  const section = document.querySelector(".product-section");

  if (!section) {
    console.error("❌ 找不到 product-section");
    return;
  }

  const imgEl = section.querySelector("#product-img");
  const nameEl = section.querySelector("#product-name");
  const idEl = section.querySelector("#product-id");
  const priceEl = section.querySelector(".price");

  if (!imgEl || !nameEl || !idEl || !priceEl) {
    console.error("❌ 商品頁元素缺失");
    return;
  }

  const product = {
    id: idEl.value,
    name: nameEl.innerText.trim(),
    price: parseInt(priceEl.innerText.replace(/[^0-9]/g, "")) || 0,
    img: imgEl.src,
    qty: qty || 1,
    date: new Date().toLocaleString("zh-TW")
  };

  console.log("🧾 ADD PRODUCT:", product);

  addToCartSystem(product);

  showToast("已加入購物車");
}
/* =========================
   cart 核心邏輯
========================= */
function addToCartSystem(product) {

  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    alert("請先登入會員後再加入購物車！");
    window.location.href = "../system/login.html";
    return;
  }

  let cart = getCart();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {

    existing.qty += product.qty;

  } else {

    cart.push(product);

  }

  saveCart(cart);

  renderCart();

  alert("商品已加入購物車！");
}

/* =========================
   移除商品
========================= */
function removeFromCart(id) {
  let cart = getCart();

  cart = cart.filter(item => item.id !== id);

  saveCart(cart);
  renderCart();
}

/* =========================
   更新數量
========================= */
function updateQty(id, qtyVal) {
  let cart = getCart();

  cart = cart.map(item => {
    if (item.id === id) {
      item.qty = qtyVal > 0 ? qtyVal : 1;
    }
    return item;
  });

  saveCart(cart);
  renderCart();
}

/* =========================
   計算總價
========================= */
function getTotalPrice() {
  let cart = getCart();

  return cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);
}

/* =========================
   渲染購物車
========================= */
function renderCart() {

  const cartList = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  if (!cartList) return;

  const cart = getCart();

  cartList.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {

    cartList.innerHTML = `
      <div class="empty-cart">
        尚未加入任何商品
      </div>
    `;

    if (subtotalEl) subtotalEl.innerText = "$0";
    if (totalEl) totalEl.innerText = "$0";

    return;
  }

  cart.forEach(item => {

    const itemTotal = item.price * item.qty;

    total += itemTotal;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">

      <div class="cart-info">

        <h4>${item.name}</h4>

        <p class="cart-date">
          ${item.date || ""}
        </p>

        <p class="cart-price">
          單價 $${item.price}
        </p>

      </div>

      <div class="cart-actions">

        <button onclick="updateQty('${item.id}', ${item.qty - 1})">
          −
        </button>

        <span>${item.qty}</span>

        <button onclick="updateQty('${item.id}', ${item.qty + 1})">
          +
        </button>

      </div>

      <div class="item-total">
        $${itemTotal}
      </div>

    <button
        class="remove-btn"
        title="移除商品"
        onclick="removeFromCart('${item.id}')">

         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">

            <polyline points="3 6 5 6 21 6"></polyline>

            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>

            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>

            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>

        </svg>

    </button>
    `;

    cartList.appendChild(div);
  });

  if (subtotalEl) subtotalEl.innerText = `$${total}`;
  if (totalEl) totalEl.innerText = `$${total}`;
}
/* =========================
   初始化
========================= */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function checkout() {

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("請先登入");
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    alert("購物車是空的");
    return;
  }

  const orders = JSON.parse(localStorage.getItem("orders")) || {};

  const order = {
    id: "OD-" + Date.now().toString(36).toUpperCase(),
    items: cart,
    total: cart.reduce((t, i) => t + i.price * i.qty, 0),
    time: new Date().toLocaleString("zh-TW"),
    status: "已完成"
  };

  if (!orders[user.email]) {
    orders[user.email] = [];
  }

  orders[user.email].unshift(order);

  localStorage.setItem("orders", JSON.stringify(orders));

  // 清空購物車
  saveCart([]);
  renderCart();

  alert("結帳成功！");

  // ⭐⭐關鍵：導去訂單頁
  window.location.href = "../system/member-order.html";
}
function renderOrders() {

  const container = document.getElementById("orderList");
  if (!container) return;

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  const ordersDB = JSON.parse(localStorage.getItem("orders")) || {};
  const myOrders = ordersDB[user.email] || [];

  if (myOrders.length === 0) {
    container.innerHTML = `<div class="empty-order">尚未有訂單</div>`;
    return;
  }

  container.innerHTML = myOrders.map(order => `

    <div class="order-card">

      <!-- HEADER -->
      <div class="order-top">
        <div>
          <div class="order-id">${order.id}</div>
          <div class="order-time">${order.time}</div>
        </div>

        <div class="order-status">
          已完成
        </div>
      </div>

      <!-- ITEMS -->
      <div class="order-items">

        ${order.items.map(i => `
          <div class="order-item">

            <img src="${i.img}" />

            <div class="order-info">
              <div class="name">${i.name}</div>
              <div class="qty">數量 × ${i.qty}</div>
            </div>

            <div class="price">
              $${i.price * i.qty}
            </div>

          </div>
        `).join("")}

      </div>

      <!-- FOOTER -->
      <div class="order-bottom">
        <span>訂單總金額</span>
        <b>$${order.total}</b>
      </div>

    </div>

  `).join("");
}