import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { toogleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemCount } from '../../redux/cart/cart.selectors'

const CartIcon = ({ toogleCartHidden, itemCount }) => {
    // console.log(toogleCartHidden)
    return (
        <div className='cart-icon' onClick={toogleCartHidden} >
            <ShoppingIcon className='shopping-icon' />
            <span className="item-count">{itemCount}</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toogleCartHidden: () => dispatch(toogleCartHidden())
})

const mapStateToProps = createStructuredSelector ({
    itemCount: selectCartItemCount
})

// BEFORE USING createStructuredSelector:
// const mapStateToProps = (state) => ({
//     itemCount: selectCartItemCount(state)
// })

// BEFORE USING SELECTOR:
// const mapStateToProps = ({ cart: { cartItems }}) => {
//     console.log('I am being called')
//     return {
//         itemCount: cartItems.reduce(            // reduce always get called and return a new object (even if items are the same) --> not good for performance
//         (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity
//     , 0)
//     }
// }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon)