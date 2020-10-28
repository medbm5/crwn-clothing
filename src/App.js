import React from 'react';
import './App.css';
import Homepage from './pages/HomePage/homepage.component'
import {Switch ,Route} from 'react-router-dom'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPAge from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth , createUSerProfileDocument} from './firebase/firebase.utils'
import {connect} from 'react-redux'
import {setCurrentUser} from  './redux/user/user.action'

class App extends React.Component {
 
  unsubscribeFromAuth=null
  componentDidMount(){

    const {setCurrentUser}=this.props

    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef=await createUSerProfileDocument(userAuth)
        
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
          
          })
        })
      
      
      }
        setCurrentUser({userAuth})
      
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInAndSignUpPAge}/>
  
      </Switch>
      </div>
    );
  }
}
const mapDispatcToProps=dispatch=>({
   setCurrentUser: user=>dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatcToProps)(App);
