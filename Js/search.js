const input = document.getElementById("searchInput");
const suggestBox = document.getElementById("suggestBox");

/* =========================
   🔥 安全 products（避免 undefined）
========================= */
function safeProducts() {
  return Array.isArray(products) ? products : [];
}

/* =========================
   🔥 normalize（防空值 + 去空白 + 小寫）
========================= */
function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

/* =========================
   🔥 路徑（保留你原本邏輯，但穩定）
========================= */
function getPath(url) {
  const path = window.location.pathname;

  if (
    path.includes("/html/pages/") ||
    path.includes("/html/system/")
  ) {
    return "../" + url;
  }

  if (
    path.includes("/html/softdrink/") ||
    path.includes("/html/beer/") ||
    path.includes("/html/spirit/") ||
    path.includes("/html/liquor/") ||
    path.includes("/html/cocktail/")
  ) {
    return "../" + url;
  }

  return "html/" + url;
}

/* =========================
   🔍 主搜尋（模糊搜尋）
========================= */
window.searchProduct = function () {

  const value = normalize(input.value);

  if (!value) {
    alert("請輸入搜尋內容");
    return;
  }

  const match = safeProducts().find(p => {
    return normalize(p.key).includes(value) ||
           normalize(p.title).includes(value);
  });

  if (match) {
    window.location.href = getPath(match.url);
  } else {
    alert("找不到商品：" + input.value);
  }
};

/* =========================
   ✨ autocomplete（穩定版）
========================= */
input.addEventListener("input", () => {

  const value = normalize(input.value);

  if (!value) {
    if (suggestBox) suggestBox.style.display = "none";
    return;
  }

  const result = safeProducts().filter(p => {
    return normalize(p.key).includes(value) ||
           normalize(p.title).includes(value);
  });

  if (!suggestBox) return;

  if (result.length === 0) {
    suggestBox.style.display = "none";
    return;
  }

  suggestBox.style.display = "block";

  suggestBox.innerHTML = result.slice(0, 6).map(p => `
    <div class="suggest-item" onclick="go('${p.url}')">
      ${p.title}
    </div>
  `).join("");
});

/* =========================
   🔗 點擊跳轉
========================= */
window.go = function (url) {
  window.location.href = getPath(url);
};

/* =========================
   🧹 點外關閉
========================= */
document.addEventListener("click", (e) => {
  if (suggestBox && !e.target.closest(".search-container")) {
    suggestBox.style.display = "none";
  }
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchProduct();
  }
});