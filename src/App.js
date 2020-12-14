import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'    

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  // 2
  unsubscribeFromAuth = null;
  
  // 1
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot (snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          } )    // must log here to get result, use arrow function: () => console.log(this.state)
        })
        // console.log(this.state)  // CANNOT console.log here bz setState is async --> result: null
      } else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  // 3
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    console.log(this.state.currentUser)
    
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
