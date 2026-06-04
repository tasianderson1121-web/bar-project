function login(){

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u =>
        u.email === email && u.password === password
    );

    if(user){

        // 🟢 確保資料完整（很重要）
        let safeUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            level: user.level || "Bronze",
            status: user.status || "Active",   // ⭐補這裡
            createdAt: user.createdAt || new Date().toLocaleDateString(),
            orders: user.orders || [],
            reviews: user.reviews || []
        };

        localStorage.setItem("currentUser", JSON.stringify(safeUser));

        alert("登入成功！");
        window.location.href = "member.html";

    } else {
        alert("帳號或密碼錯誤");
    }
}