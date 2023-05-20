// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const productRouter = require('./routes/product');
const mailerRouter = require('./routes/sendMail');

const app = express();

// Set up mongoose connection
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/product', productRouter);
app.use('/send-mail', mailerRouter);
app.get("/", (req, res) => {
    res.send("hello world")
})

const port = 3001;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});