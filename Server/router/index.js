const express = require("express")
const {userCtrl} = require("../controllers/userCtrl")
const {agentCtrl} = require("../controllers/agentCtrl") 
const {midtransCtrl} = require("../controllers/midtransCtrl")

const openAI = require("../helpers/openai")

const {authentication} = require("../middlewares/authentication")
const {adminOnly} = require("../middlewares/authorization")
const router = express.Router()


router.post("/register", userCtrl.register) //udah
router.post("/login",userCtrl.login) // udah
router.post("/google-login", userCtrl.googleLogin) //udah tp harus nanya
router.use(authentication)

    router.post("/helpMe", async(req,res)=> {
        let{
            agent1, agent2
        } = req.body
    
        let responseOpenAI = await openAI(agent1,agent2)
    
        res.send(responseOpenAI)
    })


router.patch("/users/me/upgrade", userCtrl.upgradeAccount)
router.get("/payment/midtrans/initiate", midtransCtrl.initiateMidtransTrx)

router.get("/agents", agentCtrl.getAgent)
router.get("/agents/:id",agentCtrl.getAgentById)
router.post("/agents", adminOnly,agentCtrl.addAgent) 

router.put("/agents/:id",adminOnly, agentCtrl.updateAgent) 
router.delete("/agents/:id", adminOnly,agentCtrl.deleteAgent) 

module.exports = router