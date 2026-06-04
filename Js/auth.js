function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch (e) {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

/* 🔥 登出（穩定路徑版） */
function logout() {
    localStorage.removeItem("currentUser");

    const path = window.location.pathname;

    // 根據目前位置決定跳轉
    if (path.includes("/system/")) {
        window.location.href = "login.html";
    } else {
        window.location.href = "html/system/login.html";
    }
}