import React from 'react';
import './App.css';
import Homepage from './pages/HomePage/homepage.component'
import {Switch ,Route} from 'react-router-dom'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPAge from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth} from './firebase/firebase.utils'

class App extends React.Component {
  constructor(){
    super()

    this.state={
      currentUSer:null
    }
  }
  unsubscribeFromAuth=null
  componentDidMount(){
    this.unsubscribeFromAuth=auth.onAuthStateChanged(user=>{
      this.setState({currentUSer:user})
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUSer}/>
        <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInAndSignUpPAge}/>
  
      </Switch>
      </div>
    );
  }
}

export default App;
