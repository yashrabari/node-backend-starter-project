const ejs = require('ejs');
const path = require('path')
const transporter = require('../utils/sendMail')
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.sendMail = async function (req, res) {

    var { orderItems, discount } = req.body
    var products = orderItems.map(d => ({
        name: d.product.data.attributes.name,
        qty: d.quantity,
        image: 'https://data.makenbreak.com' + d.product.data.attributes.images.data[0].attributes.url,
        price: d.total
    }))
    // console.log(products)
    // // create reusable transporter object using the default SMTP transport
    const { address1, address2, city, state, zipcode, country } = req.body.shippingAddress.data.attributes
    const totalItems = products.length
    const totalPrice = discount > 0 ? products.reduce((a, b) => parseFloat(a) + parseFloat(b.price), 0) - (products.reduce((a, b) => parseFloat(a) + parseFloat(b.price), 0) * (discount / 100)) : products.reduce((a, b) => parseFloat(a) + parseFloat(b.price), 0)
    // // console.log({ ...req.body, products, totalPrice, totalItems, orderDate: new Date().toDateString(), shippingAddress: address_1 + " " + address_2 + " " + city + " " + state + " " + zipcode + " " + country })
    const templateData = await ejs.renderFile(path.join(__dirname, "../", "views/orderConfirmation.ejs"), {
        order: { ...req.body, products, totalPrice, id: req.body.order_id, totalItems, orderDate: new Date().toDateString(), shippingAddress: address1 + " " + address2 + " " + city + " " + state + " " + zipcode + " " + country }
    });



    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"MakeNBreak Pvt. Ltd" <info@makenbreak.com>', // sender address
        to: [req.body.user.email, "info@makenbreak.com"], // list of receivers
        subject: "Your Order has Been Confirmed", // Subject line

        html: templateData
    });

    console.log("Message sent: %s", info.messageId);
    // // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // // // Preview only available when sending through an Ethereal account
    // // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.send("done")
}


exports.sendConfirmationMail = async function (req, res) {

    console.log(req.body)


    // create reusable transporter object using the default SMTP transport

    const data = await ejs.renderFile(path.join(__dirname, "../", "views/verifyMail.ejs"), {
        user: {
            ...req.body,
            confirmationLink: `https://makenbreak.com/verify-email?id=${req.body.id}&token=${req.body.token}`
        }
    });



    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"MakeNBreak Pvt. Ltd" <info@makenbreak.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Welcome To The Family", // Subject line

        html: data
    });

    console.log("Message sent: %s", info.messageId);

    res.send("done")
}


exports.sendResetPasswordMail = async function (req, res) {

    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }

    console.log(obj); // { title: 'product' }


    // create reusable transporter object using the default SMTP transport

    const data = await ejs.renderFile(path.join(__dirname, "../", "views/resetPassword.ejs"), {
        user: {
            ...obj,
            confirmationLink: `https://makenbreak.com/change_password?id=${obj.id}&token=${obj.token}`
        }
    });



    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"MakeNBreak Pvt. Ltd" <info@makenbreak.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Reset Password Link", // Subject line

        html: data
    });

    console.log("Message sent: %s", info.messageId);

    res.send("done")
}

