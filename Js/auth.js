function getCurrentUser() {
    try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        return user && user.email ? user : null;
    } catch (e) {
        return null;
    }
}

/* ⭐ 強制同步用（關鍵） */
function setCurrentUser(user) {
    if (!user || !user.email) return;
    localStorage.setItem("currentUser", JSON.stringify(user));
}

/* ⭐ 防止「假登出」 */
function ensureAuth() {
    const user = getCurrentUser();
    if (!user) {
        localStorage.removeItem("currentUser");
        return false;
    }
    return true;
}
function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
}