import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './header.styles.scss'
import { ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'


const Header = ({ currentUser, hidden }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>

            <div className="options">
                <Link className="option" to="/shop"> SHOP </Link>

                <Link className="option" to="/contact"> CONTACT </Link>
                
                { currentUser           // is an object -> true; null -> false
                    ? <div className="option" onClick={() => auth.signOut()}> SIGN OUT </div>
                    : <Link className="option" to="/signin"> SIGN IN </Link>
                }

                <CartIcon />
            </div>
            
            { hidden ? null : <CartDropdown /> }

        </div>
    )
}


const mapStateToProps = createStructuredSelector({  // using selectors
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

//BEFORE2: 
// const mapStateToProps = ({ user: {currentUser}, cart: { hidden }}) => ({  //advanced destructuring
//     currentUser,        //currentUser: currentUser
//     hidden,             // hidden: hidden
// })

// BEFORE1: const mapStateToProps = state => ({
//     currentUser: state.user.currentUser    
//     hidden: state.cart.hidden
// })

export default connect(mapStateToProps)(Header)