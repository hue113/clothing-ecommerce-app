import React from 'react'
import { connect } from 'react-redux'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { toogleCartHidden } from '../../redux/cart/cart.actions'

const CartIcon = ({ toogleCartHidden }) => {
    // console.log(toogleCartHidden)
    return (
        <div className='cart-icon' onClick={toogleCartHidden} >
            <ShoppingIcon className='shopping-icon' />
            <span className="item-count">0</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    toogleCartHidden: () => dispatch(toogleCartHidden())
})

export default connect(
    null,
    mapDispatchToProps
)(CartIcon)