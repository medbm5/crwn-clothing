import React from 'react';
import './App.css';
import Homepage from './pages/HomePage/homepage.component'
import {Switch ,Route} from 'react-router-dom'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPAge from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth , createUSerProfileDocument} from './firebase/firebase.utils'

class App extends React.Component {
  constructor(){
    super()

    this.state={
      currentUser:null
    }
  }
  unsubscribeFromAuth=null
  componentDidMount(){
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef=await createUSerProfileDocument(userAuth)
        
        userRef.onSnapshot(snapshot=>{
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          })
        })
      
      
      }
        this.setState({currentUser:userAuth})
      
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
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
