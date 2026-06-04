function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function getBasePath() {
    const path = window.location.pathname;

    if (path.includes("/html/system/")) {
        return "";
    }

    if (path.includes("/html/pages/")) {
        return "../system/";
    }

    return "html/system/";
}

function updateNavbar() {

    const user = getCurrentUser();
    const btn = document.querySelector(".member-btn");

    if (!btn) return;

    const base = getBasePath();

    if (user) {
    btn.innerText = "會員中心";
    btn.href = "/html/system/member.html";
    } else {
        btn.innerText = "會員登入";
        btn.href = "/html/system/login.html";
    }
}

document.addEventListener("DOMContentLoaded", updateNavbar);