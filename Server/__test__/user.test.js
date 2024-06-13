const request = require("supertest")
const app = require("../app")

const { sequelize } = require("../models")
const { hashPassword } = require("../helpers/bcrypt")
const { queryInterface } = sequelize


const admin = {
    fullName: "Achmad Tizany",
    email: "mada@gmail.com",
    password: "12345",
    role: "Admin"
}
const failLogin1 = {
    password: "111111"
}
const failLogin2 = {
    email: "mada12@gmail.com"
}
const failLogin3 = {
    email: "mada@gmail.com",
    password: "adadada"
}
const failLogin4 = {
    email: "madaaa@gmail.com",
    password: "12345"
}
const register = {
    fullName: "MadaDomba",
    email: "domba@gmail.com",
    password: "123456",
    role: "User"
}
const failRegister1 = {
    email: "domba@gmail.com",
    password: "123456",
    role: "User"
}
const failRegister2 = {
    fullName: "madamada",
    password: "123456",
    role: "User"
}
const failRegister3 = {
    fullName: "madamada",
    email: "madamada@gmail.com",
    role: "User"
}

describe("POST /register", () => {
    describe("Success", () => {
        test("Berhasil Register", async () => {
            const { status, body } = await request(app)
                .post("/register")
                .send(register)

            expect(status).toBe(201)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("email", register.email)
        })
    })
    describe("Fail", () => {
        test("Gagal Register karena tidak memasukkan FullName", async () => {
            const { status, body } = await request(app)
                .post("/register")
                .send(failRegister1)

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Full name is required!")
        })
        test("Gagal Register karena tidak memasukkan email", async () => {
            const { status, body } = await request(app)
                .post("/register")
                .send(failRegister2)

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email is required!")
        })
        test("Gagal Register karena tidak memasukkan password", async () => {
            const { status, body } = await request(app)
                .post("/register")
                .send(failRegister3)

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Password is required!")
        })

    })
})

describe("POST /login", () => {
    describe("Success", () => {
        test("Berhasil login dan mengirim token", async () => {
            const { status, body } = await request(app)
                .post("/login")
                .send(admin)


            expect(status).toBe(200)
            expect(body).toHaveProperty("token", expect.any(String))
        })
    })
    describe("Fail", () => {
        test("Email tidak diberikan", async () => {
            const { status, body } = await request(app)
                .post("/login")
                .send(failLogin1)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Email cannot be empty")
        })

        test("Password tidak diberikan", async () => {
            const { status, body } = await request(app)
                .post("/login")
                .send(failLogin2)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Password cannot be empty")
        })
        test("Email diberikan invalid", async () => {
            const { status, body } = await request(app)
                .post("/login")
                .send(failLogin3)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Email or Password invalid")
        })
        test("Password diberikan invalid", async () => {
            const { status, body } = await request(app)
                .post("/login")
                .send(failLogin4)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Email or Password invalid")
        })
    })
})

beforeAll(async () => {

    await queryInterface.bulkInsert(
        "Users",
        [
            {
                ...admin,
                password: hashPassword(admin.password),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        {}
    )

})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})