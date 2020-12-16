import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'    
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'


class App extends React.Component {
  
  // 2
  unsubscribeFromAuth = null;
  
  // 1
  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot (snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          } )    // must log here to get result, use arrow function: () => console.log(this.state)
        })
        // console.log(this.state)  // CANNOT console.log here bz setState is async --> result: null
      } else {
        // this.setState({ currentUser: userAuth })
        setCurrentUser(userAuth)
      }
    })
  }

  // 3
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }   

  render() {
    // console.log(this.state.currentUser)
    
    return (
      <div className="App">
        <Header />    
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          {/* <Route path='/signin' component={SignInAndSignUpPage}/> */}
          <Route 
              exact path='/signin' 
              render={ () => this.props.currentUser 
                        ? <Redirect to='/' />
                        : <SignInAndSignUpPage /> }/>
          
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// })

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch (setCurrentUser(user))
})

// 1st param: null chinh la mapStateToProps
// currentUser: null 
// export default connect(null, mapDispatchToProps)(App);  

export default connect(mapStateToProps, mapDispatchToProps)(App);  
