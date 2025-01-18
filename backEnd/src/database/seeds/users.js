import { hashPassword } from "../../helper/userHelper.js";
import User from "../models/user.js"

const seedUsers = async () => {
    const users = [
        {
            firstName: "Jean Pierre",
            lastName: "AKIMANA",
            username: "AKIMANA",
            email: "akimana.inono@gmail.com",
            phone: "0788888887",
            password: await hashPassword("password123"),
        },
        {
            firstName: "Jane",
            lastName: "Doe",
            username: "jane1",
            email: "jane@example.com",
            phone: "0788888888",
            password: await hashPassword("password123"),
        },
    ];
    await User.deleteMany();
    await User.insertMany(users);
};

export default seedUsers;