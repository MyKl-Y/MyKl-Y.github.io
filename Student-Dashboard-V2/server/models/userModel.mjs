const users = []; // This could be an array or your preferred data store

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Optional: Add methods for interacting with users
    static findByEmail(email) {
        return users.find((user) => user.email === email);
    }

    save() {
        users.push(this);
    }
}

export default User;
