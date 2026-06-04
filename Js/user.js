function createUser(name, email, password){

    return {
        name,
        email,
        password,

        level: "Bronze",
        status: "Active",   // ⭐一定要加

        createdAt: new Date().toLocaleDateString(),

        orders: [],
        reviews: []
    };
}