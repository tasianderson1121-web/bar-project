function resetPassword(){

    let email = document.getElementById("email").value.trim();
    let newPassword = document.getElementById("newPassword").value.trim();

    if(!email || !newPassword){
        alert("請輸入完整資料");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email);

    if(!user){
        alert("找不到此帳號");
        return;
    }

    user.password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    alert("密碼更新成功！請重新登入");

    window.location.href = "login.html";
}