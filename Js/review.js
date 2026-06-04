/***********************
 * REVIEW SYSTEM CORE
 *（可直接整包替換）
***********************/

let selectedRating = 5;

/* =====================
   localStorage
===================== */
function getReviews() {
  return JSON.parse(localStorage.getItem("reviews")) || [];
}

/* =====================
   初始化（不用改 HTML）
===================== */
document.addEventListener("DOMContentLoaded", () => {

  initStars();
  renderProductReviews();
  renderMyReviews();

});

/* =====================
   ⭐ 星星系統（有就綁，沒有就跳過）
===================== */
function initStars() {

  const stars = document.querySelectorAll("#reviewStars span");

  if (!stars || stars.length === 0) return;

  stars.forEach((star, index) => {

    star.addEventListener("click", () => {

      selectedRating = index + 1;

      stars.forEach((s, i) => {
        s.classList.toggle("active", i < selectedRating);
      });

    });

  });

  // 初始化顯示
  stars.forEach((s, i) => {
    s.classList.toggle("active", i < selectedRating);
  });
}

/* =====================
   ⭐ 送出評論（兼容 HTML onclick）
===================== */
window.addComment = function () {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("請先登入才能評論！");
    window.location.href = "../system/login.html";
    return;
  }

  const nameInput = document.getElementById("nameInput");
  const commentInput = document.getElementById("commentInput");

  const name = nameInput ? nameInput.value.trim() : "";
  const text = commentInput ? commentInput.value.trim() : "";

  if (!text) {
    alert("請輸入評論");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  const productImg =
    document.querySelector(".product-section #product-img")?.getAttribute("src")
    || "../../img/Logo (2).jpg";

  const newReview = {
    name: name || currentUser.name,
    email: currentUser.email,
    product: document.title,
    productImg: productImg,
    star: selectedRating || 5,
    text: text,
    date: new Date().toLocaleString("zh-TW")
  };

  reviews.push(newReview);

  localStorage.setItem("reviews", JSON.stringify(reviews));

  if (typeof renderProductReviews === "function") {
    renderProductReviews();
  }

  if (typeof renderMyReviews === "function") {
    renderMyReviews();
  }

  if (nameInput) nameInput.value = "";
  if (commentInput) commentInput.value = "";
};
/* =====================
   商品頁評論顯示
===================== */
function renderProductReviews() {

  const container = document.getElementById("comments");
  if (!container) return;

  const reviews = getReviews();
  const productName = document.title;

  const list = reviews.filter(r => r.product === productName);

  if (list.length === 0) return;

  container.innerHTML = list.map(r => `
    <div class="comment-card">
      <div class="comment-header">
        <strong>${r.name}</strong>
        <span>${"⭐".repeat(r.star || 0)}</span>
      </div>
      <p>${r.text}</p>
    </div>
  `).join("");
}

/* =====================
   會員中心評論顯示
===================== */
function renderMyReviews() {

  const container = document.getElementById("myReviews");

  if (!container) return;

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) return;

  const reviews = getReviews();

  const myReviews = reviews.filter(
    r => r.email === currentUser.email
  );

  if (myReviews.length === 0) {

    container.innerHTML = `
      <div class="empty-review">
        尚未有任何評論
      </div>
    `;

    return;
  }

  container.innerHTML = myReviews.map(r => `

    <div class="my-review-item">

      <img
        src="${r.productImg || '../../img/default-product.jpg'}"
        alt="${r.product}"
        class="review-product-img">

      <div class="my-review-info">

        <h4>${r.product}</h4>

        <div class="review-stars">
          ${"★".repeat(r.star || 0)}
        </div>

        <p class="review-text">
          ${r.text}
        </p>

        <span class="review-date">
          ${r.date || ""}
        </span>

      </div>

    </div>

  `).join("");
}