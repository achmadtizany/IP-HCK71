if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()

const cors = require("cors")
const bodyParser = require("body-parser")

const router = require("./router/index")
const errHandlers = require("./middlewares/errHandlers")

app.use(express.urlencoded({extended:false}))
app.use(express.json()) 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))


app.use("/", require("./router"))

app.use(errHandlers)


module.exports = app
// app.listen(3000)
