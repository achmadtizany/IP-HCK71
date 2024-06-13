const request = require("supertest")
const app = require("../app")
const {User, Agent} = require("../models")

const {sequelize} = require("../models")
const {queryInterface} = sequelize
const {hashPassword} = require("../helpers/bcrypt")
const {createToken} = require("../helpers/jwt")


let access_token_admin

const newAgent = {
    agentName: "SandyMan",
    nickName: "hurtfull",
    description: "Can make ur eyes hurt",
    imgUrl: "https://example.com/Sandy_Man_2024.jpg",
    agentRole: "Duelist",
    agentDescription: "he's gonna find you since everything is everything"

}

const updateAgent = {
    agentName: "SandyMan",
    nickName: "hurtfull",
    description: "Can make ur eyes hurt",
    imgUrl: "https://example.com/Sandy_Man_2024.jpg",
    agentRole: "Duelist",
    agentDescription: "he's gonna find you since everything is everything"
}




describe("POST /agents", ()=> {
    describe("Success",()=> {
        test("Berhasil membuat entitas utama", async ()=> {
            const {status, body} = await request(app)
            .post("/agents")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .send(newAgent)

            expect(status).toBe(201)
            expect(body).toBeInstanceOf(Object)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).toHaveProperty("agentName", newAgent.agentName)
            expect(body).toHaveProperty("nickName", newAgent.nickName)
            expect(body).toHaveProperty("description", newAgent.description)
            expect(body).toHaveProperty("imgUrl", newAgent.imgUrl)
            expect(body).toHaveProperty("agentRole", newAgent.agentRole)
            expect(body).toHaveProperty("agentDescription", newAgent.agentDescription)
        })
    })
    describe("Fail", ()=> {
        test("Gagal Karena belum Login", async()=> {
            const {status, body} = await request(app)
            .post("/agents")
            .send(newAgent)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token")
        })
        test("Gagal Karena token invalid", async()=>{
            const{status, body} = await request(app)
            .post("/agents")
            .set("Authorization", `Bearer 1230123123asdoa`)
            .send(newAgent)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token")
        })
    })
})

describe("PUT /agents/:id", ()=> {
    describe("Success", ()=> {
        test("Berhasil mengupdate data Entitas Utama berdasarkan params id", async()=> {
            const{status,body} = await request(app)
            .put("/agents/1")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .send(updateAgent)

            expect(status).toBe(200)
        })
    })
    describe("Fail", ()=> {
        test("Gagal menjalankan fitur Karena belum Login", async()=>{
            const{status,body} = await request(app)
            .put("/agents/1")
            .send(updateAgent)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token")
        })
        test("Gagal menjalankan karena token invalid", async()=> {
            const{status,body} = await request(app)
            .put("/agents/1")
            .set("Authorization", `Bearer awdaowkd10dkwakodwa`)
            .send(updateAgent)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token")
        })
        test("Gagal menjalankan karena id tidak terdapat di database", async()=> {
            const{status,body} = await request(app)
            .put("/agents/1239")
            .set("Authorization", `Bearer ${access_token_admin}`)
            .send(updateAgent)

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Data Not Found")
        })
    })
})
describe("DELETE /agents/:id", ()=> {
    describe("Success", ()=> {
        test("Berhasil menghapus data Entitas Utama berdasarkan Id", async()=> {
            const{status,body} = await request(app)
            .delete("/agents/1")
            .set("Authorization", `Bearer ${access_token_admin}`)

            expect(status).toBe(200)
        })
    })
    describe("FAIL",()=> {
        test("Gagal menjalankan fitur karena belum login", async ()=> {
            const{status,body}= await request(app)
            .delete("/agents/1")

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token")
        })
        test("Gagal menjalankan fitur karena invalid token", async()=> {
            const{status,body} = await request(app)
            .delete("/agents/1")
            .set("Authorization", `Bearer 1203kdadaowdk`)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message","Invalid Token")
        })
        test("Gagal karena id tidak terdapat di database", async()=> {
            const{status,body} = await request(app)
            .delete("/agents/12312312")
            .set("Authorization", `Bearer ${access_token_admin}`)

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Data Not Found")
        })
        test("Gagal menghapus id karena bukan miliknya", async ()=> {
            const{status,body} = await request(app)
            .delete("/agents/1")
            .set("Authorization", `Bearer`)
        })
    })
})

describe("GET /agents", ()=> {
    describe("Success", ()=> {
        test("Berhasil mendapatkan Entitas Utama", async ()=> {
            const {status,body} = await request(app)
            .get("/agents")
            .set("Authorization", `Bearer ${access_token_admin}`)

            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            // expect(body).toHaveProperty("page", expect.any(Number))
            // expect(body).toHaveProperty("data", expect.any(Array))
        })
        test("Berhasil mendapatkan Entitas Utama dengan 1 query filter", async()=> {
            const{status,body} = await request(app)
            .get("/agents?filter=Duelist")
            .set("Authorization", `Bearer ${access_token_admin}`)


            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            // expect(body).toHaveProperty("page", expect.any(Number))
            // expect(body).toHaveProperty("data", expect.any(Array))
        })
        test("Berhasil mendapatkan Entitas Utama serta panjang yang sesuai ketika memberikan page tertentu", async()=>{
            const{status,body} = await request(app)
            .get("/agents?page=1")
            .set("Authorization", `Bearer ${access_token_admin}`)

            
            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            // expect(body).toHaveProperty("page", expect.any(Number))
            // expect(body).toHaveProperty("data", expect.any(Array))
        })
    })
})

describe("GET /agents/:id", ()=> {
    describe("Success", ()=> {
        test("Berhasil mendapatkan 1 Entitas Utama sesuai id", async()=> {
            const {status, body} = await request(app)
            .get("/agents/2")
            .set("Authorization", `Bearer ${access_token_admin}`)

            expect(status).toBe(200)
            expect(body).toBeInstanceOf(Object)
            // expect(body).toHaveProperty("agentName", expect.any(String));
            // expect(body).toHaveProperty("nickName", expect.any(String));
            // expect(body).toHaveProperty("description", expect.any(String));
            // expect(body).toHaveProperty("imgUrl", expect.any(String));
            // expect(body).toHaveProperty("agentRole", expect.any(String));
            // expect(body).toHaveProperty("agentDescription", expect.any(String));
        })
    })
    describe("Fail", ()=> {
        test("Gagal mendapatkan Entitas Utama karena id invalid", async()=> {
            const {status, body} = await request(app)
            .get("/agents/291239123")
            .set("Authorization", `Bearer ${access_token_admin}`)

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Data Not Found")
        })
        test("Gagal mendapatkan Entitas Utama karena Token Invalid", async ()=> {
            const{status, body} = await request(app)
            .get("/agents/1")
            .set("Authorization", `Bearer 1231321321`)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Token")
        })
    })
})


beforeAll(async () => {
    const admins = require("../data/admin.json").map((el) => {
        el.createdAt = new Date()
        el.updatedAt = new Date()

        el.password = hashPassword(el.password)

        return el
    })

    await queryInterface.bulkInsert("Users", admins)

    const user = await User.findOne({
        where: {
            email: admins[0].email
        }
    })
    access_token_admin = createToken({ id: user.id })
    
    const agents = require("../data/agent.json").map((agent) => {
        let { displayName, description, developerName, bustPortrait, role, abilities } = agent
        let roleName = role ? role.displayName : null;
        let roleDesc = role ? role.description : null;
  
        let agentAbilities = []
        abilities.forEach((ability) => {
          // const { displayName, description } = ability
  
  
          agentAbilities.push({
            abilityName: ability.displayName,
            abilityDescription: ability.description,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        })
        return {
          agentName: displayName,
          nickName: developerName,
          imgUrl: bustPortrait,
          description: description,
          agentDescription: roleDesc,
          agentRole: roleName,
          abilities: JSON.stringify(agentAbilities),
  
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

    await queryInterface.bulkInsert("Agents", agents)
})

afterAll(async ()=> {
    await queryInterface.bulkDelete("Agents", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    await queryInterface.bulkDelete("Users", null,{
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})
