function checkMemberPage() {

    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    user.orders = user.orders || [];

    if (user.orders.length > 5) {
        user.level = "Gold";
        user.status = "VIP";
    }

    const emailEl = document.getElementById("user-email");
    const email = document.getElementById("email");
    const level = document.getElementById("level");
    const createdAt = document.getElementById("createdAt");
    const status = document.getElementById("status");

    if (emailEl) emailEl.innerText = "Hi, " + user.name;
    if (email) email.innerText = user.email;
    if (level) level.innerText = user.level;
    if (createdAt) createdAt.innerText = user.createdAt;
    if (status) status.innerText = user.status;

    renderMyReviews(); // ⭐ 載入評論紀錄
}
function renderMyReviews() {

  const container = document.getElementById("myReviews");
  if (!container) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  const reviews = getReviews();

  const myReviews = reviews
    .map((r, index) => ({ ...r, index }))
    .filter(r => r.email === currentUser.email);

  if (myReviews.length === 0) {
    container.innerHTML = `
      <div class="empty-review">
        尚未有任何評論
      </div>
    `;
    return;
  }

  container.innerHTML = myReviews.map(r => `
    <div class="review-card">

      <div class="review-top">
        <div>
          <div class="product">${r.product}</div>
          <div class="stars">${"⭐".repeat(r.star || 0)}</div>
        </div>

        <button class="delete-btn" onclick="deleteReview(${r.index})">
          刪除
        </button>
      </div>

      <div class="review-body">
        ${r.text}
      </div>

      <div class="review-date">
        ${r.date || "無日期"}
      </div>

    </div>
  `).join("");
}
function deleteReview(index) {

  let reviews = getReviews();

  reviews.splice(index, 1);

  localStorage.setItem("reviews", JSON.stringify(reviews));

  renderMyReviews();
}