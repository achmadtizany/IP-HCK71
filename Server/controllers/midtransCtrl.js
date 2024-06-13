const midtransClient = require("midtrans-client")
// const {Order} = require("../models")
require("dotenv").config()

class midtransCtrl {

    static async initiateMidtransTrx(req, res, next) {
        try {
            // Create Snap API instance
            const snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.SERVER_KEY_MIDTRANS,
            });

            const orderId = Math.random().toString()
            const amount = 10000

            let parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": amount
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": req.user.name,
                    "email": req.user.email,
                }
            };
            const transaction = await snap.createTransaction(parameter)
            let transactionToken = transaction.token;

            // await Order.create({
            //     orderId,
            //     amount,
            //     userId: req.user.id
            // })
            res.json({ message: "Order created", transactionToken, orderId })
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

}

module.exports = { midtransCtrl }