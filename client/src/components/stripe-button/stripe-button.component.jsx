import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51HzlQ4FD0x4Cf1q082I8zPeNMLHJAnc0Z9omFu6GVpvNlBvMpqIizld3SBGcUKyKTpNhYRqZxNhmzY3pxEMXf5Qa00hQiaolC5'

    const onToken = token => {        
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token           // short syntax for:     token: token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('Payment error: ', error)
            alert('There was an issue with your payment. Please sure you use the provided credit card')
        })
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="Clothing Ltd."
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton