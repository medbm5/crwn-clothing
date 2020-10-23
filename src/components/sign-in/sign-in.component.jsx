import React from 'react'
import { Component } from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth ,signInWithGoogle} from '../../firebase/firebase.utils'

class SignIn extends Component{

    constructor(props){
        super(props)

        this.state={
            email:'',
            password:''
        }

    }

    handleSubmit=async (e)=>{
        e.preventDefault()

        const {email,password} =this.state;
        try {
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({email:'',password:''})

        } catch (error) {
            console.log(error)
            
        }


    }

    handleChange=(e)=>{
        const {value, name} = e.target
        this.setState({[name]:value})

    }

    render(){

        return(
        <div className='sign-in'>
        <h2>I Already have an account</h2>
        <span>Sign In with your email and password</span>

        <form onSubmit={this.handleSubmit} >

            <FormInput 
            type="email" 
            onChange={this.handleChange}
            name="email"
            handleChange={this.state.email}
            value={this.state.email}
            label='email'
            required/>

          
            <FormInput 
            type="password"
            onChange={this.handleChange} 
            name="password" 
            handleChange={this.state.password}
            value={this.state.password}
            label='password'
            required
            />

            <div className='buttons'>
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign in with google</CustomButton>
            </div>

        </form>

        </div>


        )
        


    }
}

export default SignIn;