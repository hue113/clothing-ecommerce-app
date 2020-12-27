const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');       // native module inside node_modules
// const dotenv = require('dotenv');

if(process.env.NODE_ENV !== 'production') require('dotenv').config({ path: './config.env'})
// require('stripe') return a function require key --> we can pass it right next
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();          // instantiate express application
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())      // parse any requests to server to json() so we can do that again everytime
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', function(req, res) {       // * means every url that user hits 
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port' + port)
})

app.post('/payment', (req, res) => {
    console.log('Payment route hit')
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd',
        description: 'Learning React'
    }
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).send({ error: stripeErr })
        } else {
            res.status(200).send({ success: stripeRes })
        }
    })
})