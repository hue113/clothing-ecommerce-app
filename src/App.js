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
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils'    
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'
import { selectCollectionForPreview } from './redux/shop/shop.selectors'

class App extends React.Component {
  
  // 2
  unsubscribeFromAuth = null;
  
  // 1
  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props

    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth)
        
    //     userRef.onSnapshot (snapShot => {
    //       setCurrentUser({
    //         currentUser: {
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         }
    //       } )    // must log here to get result, use arrow function: () => console.log(this.state)
    //     })
    //     // console.log(this.state)  // CANNOT console.log here bz setState is async --> result: null
    //   } 
    //     // this.setState({ currentUser: userAuth })
    //   setCurrentUser(userAuth)
    //   // addCollectionAndDocuments('collections', collectionsArray)   // passing full array of SHOP_DATA --> we don't need this because there is some redundant info
    //   addCollectionAndDocuments('collections', collectionsArray.map( ({title, items}) => ({title, items}) ))  // destructure & passing only title & items of SHOP_DATA (which we need)
      
    // })
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
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionForPreview
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
