const { User } = require("../models/index")
const { comparePass } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
const axios = require("axios")
require("dotenv").config()


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();


class userCtrl {

  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  };

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email Empty" };
      if (!password) throw { name: "Password Empty" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "Invalid Login" };

      const passCompared = comparePass(password, user.password);
      if (!passCompared) throw { name: "Invalid Login" }

      res.status(200).json({ token: createToken({ id: user.id }), role: user.role });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      // console.log(google_token, process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()

      const [user, isCreated] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          fullName: payload.name,
          email: payload.email,
          password: String(Math.random() * 10000),

        }
      })
      const token = createToken({ id: user.id, email: user.email })
      res.status(200).json({ token })

    } catch (error) {
      next(error)
    }
  }

  static async upgradeAccount(req, res, next) {
    try {

      const { orderId } = req.body


      // if(!order) {
      //   return res.status(404).json({message: "Order not found"})
      // }


      // const order = await Order.findOne({where: {orderId}})

      const serverKey = process.env.SERVER_KEY_MIDTRANS
      const base64ServerKey = Buffer.from(serverKey + `:`).toString(`base64`);

      const response = await axios.get(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
        headers: {
          Authorization: `Basic ${base64ServerKey}`
        }
      })


      res.status({ message: "Upgrade success" })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = { userCtrl }