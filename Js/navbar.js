function getCurrentUser() {
    try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        return user && user.email ? user : null;
    } catch {
        return null;
    }
}

/* =========================
   🔥 自動判斷路徑（核心）
========================= */
function getBasePath() {

    const path = window.location.pathname;

    // VS Code / Live Server / file:// 都兼容
    if (path.includes("/html/")) {

        const depth = path.split("/html/")[1];

        if (!depth) return "html/system/";

        if (depth.includes("system")) return "";

        return "../system/";
    }

    return "html/system/";
}

/* =========================
   Navbar 更新
========================= */
function updateNavbar() {

    const user = getCurrentUser();
    const btn = document.querySelector(".member-btn");

    if (!btn) return;

    const base = getBasePath();

    if (user) {
        btn.innerText = "會員中心";
        btn.href = base + "member.html";
    } else {
        btn.innerText = "會員登入";
        btn.href = base + "login.html";
    }
}

/* =========================
   🔥 保證永遠同步
========================= */
document.addEventListener("DOMContentLoaded", updateNavbar);
window.addEventListener("pageshow", updateNavbar);
window.addEventListener("focus", updateNavbar);
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateNavbar();
});