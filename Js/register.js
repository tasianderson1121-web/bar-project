function register(){

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if(!name || !email || !password){
        alert("請輸入完整資料");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email === email);

    if(exists){
        alert("此帳號已存在！");
        return;
    }

    // 🟢 建立完整 user
    let newUser = createUser(name, email, password);

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // 🟢 直接登入（重點）
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("註冊成功！");
    window.location.href = "member.html";
}