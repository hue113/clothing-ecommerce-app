import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles'
import { signOutStart } from '../../redux/user/user.actions'


const Header = ({ currentUser, hidden, signOutStart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to="/shop"> SHOP </OptionLink>

                <OptionLink to="/contact"> CONTACT </OptionLink>
                
                { currentUser           // is an object -> true; null -> false
                    // ? <OptionLink as='div' onClick={() => auth.signOut()}> SIGN OUT </OptionLink>
                    ? <OptionLink as='div' onClick={signOutStart}> SIGN OUT </OptionLink>
                    : <OptionLink to="/signin"> SIGN IN </OptionLink>
                }

                <CartIcon />
            </OptionsContainer>
            
            { hidden ? null : <CartDropdown /> }

        </HeaderContainer>
    )
}


const mapStateToProps = createStructuredSelector({  // using selectors
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)