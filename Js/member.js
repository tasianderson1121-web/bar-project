/***********************
 * MEMBER PAGE - STABLE
***********************/

function checkMemberPage() {

    const user = getCurrentUser(); // ⭐統一用 auth.js

    if (!user) {
        window.location.href = "../system/login.html";
        return;
    }

    user.orders = user.orders || [];

    // VIP 判斷（不改 localStorage，只顯示用）
    let level = user.level || "Bronze";
    let status = user.status || "Active";

    if (user.orders.length > 5) {
        level = "Gold";
        status = "VIP";
    }

    const emailEl = document.getElementById("user-email");
    const email = document.getElementById("email");
    const levelEl = document.getElementById("level");
    const createdAt = document.getElementById("createdAt");
    const statusEl = document.getElementById("status");

    if (emailEl) emailEl.innerText = "Hi, " + user.name;
    if (email) email.innerText = user.email;
    if (levelEl) levelEl.innerText = level;
    if (createdAt) createdAt.innerText = user.createdAt || "";
    if (statusEl) statusEl.innerText = status;

    renderMyReviews();
}

/* =========================
   評論區
========================= */
function renderMyReviews() {

    const container = document.getElementById("myReviews");
    if (!container) return;

    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const reviews = getReviews();
    if (!reviews) return;

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

/* =========================
   刪除評論
========================= */
function deleteReview(index) {

    let reviews = getReviews() || [];

    reviews.splice(index, 1);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    renderMyReviews();
}