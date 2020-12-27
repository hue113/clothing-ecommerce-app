import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'

import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

const CartDropdown = ({ cartItems, history, dispatch }) => {        // no need for mapDispatchToProps, you still have dispatch here
    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length
                    ? cartItems.map(item => <CartItem key={item.id} item={item} /> )
                    : <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={ ()=> {
                    history.push('/checkout')
                    dispatch(toggleCartHidden())
            }} >GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
})

// const mapStateToProps = (state) => ({
//     cartItems: selectCartItems(state)
// })

// BEFORE USING SELECTOR:
// const mapStateToProps = ({ cart: {cartItems} }) => ({
//     cartItems
// })


// if we don't supply mapDispatchToProps as 2nd param, connect() will pass 'dispatch' into props
export default withRouter(connect(mapStateToProps)(CartDropdown))

// BEFORE USING HOC withRouter
// export default connect(mapStateToProps)(CartDropdown)